import { ProgramState, ProgramStopCause } from 'dart-api';
import React, { useRef, useState } from 'react';
import { Debug, SubTitle } from '../../../components';
import { MIGRATION } from '../../../config';
import { CobotConfig } from '../../../core/models/cobot-config-types';
import { Product } from '../../../core/models/product-types';
import { calculateTotalProducts } from '../../../core/services/drawer-service';
import { insertFabrication } from '../../../core/services/fabrication-service';
import {
  updateProductLastFabricationAmount,
  updateProductLastFabricationDuration,
} from '../../../core/services/product-service';
import { runMain } from '../../../drl/main/main';
import { MetaSuiteProgramState } from '../../../drl/main/types';
import {
  isMetaSuiteProgramStateMessage,
  parseMetaSuiteProgramJSON,
} from '../../../drl/main/utils';
import { CommunicationWatcherArgs } from '../../../DrlUtils';
import { useDatabase } from '../../../hooks/useDatabase';
import { useT } from '../../../hooks/useT';
import { errorToast } from '../../../utils/toast';
import { useProgramState } from '../../hooks/useProgramState';
import { FabricationState, ResumeForm } from '../../types';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import { ClearSecondDrawerModal } from './components/ClearSecondDrawerModal';
import { FabricateSection } from './components/FabricateSection/FabricateSection';
import { FabricationGuard } from './components/FabricationGuard';
import { Gripper1CheckFailedModal } from './components/Gripper1CheckFailedModal';
import { Gripper2CheckFailedModal } from './components/Gripper2CheckFailedModal';
import { PickupFinishedFromMachineFailedModal } from './components/PickupFinishedFromMachineFailedModal';
import { ResultModal } from './components/ResultModal';
import { ResumeModal } from './components/ResumeModal';
import { StatusIndicator } from './components/StatusBar/StatusIndicator';
import { useTimer } from './hooks/useTimer';
import { FabricationWarnings } from './components/FabricationWarnings';
import { CobotInfo } from '../../../types';
import { useToolWeight } from '../../../hooks/useToolWeight';

type Props = {
  product: Product;
  cobotConfig: CobotConfig;
  cobotInfo: CobotInfo;
  fabricationState: FabricationState;
};

export function ProductFabricateBar({
  product,
  cobotConfig,
  cobotInfo,
  fabricationState,
}: Props) {
  const t = useT();

  const sendResponseRef = useRef<(value: string) => void>(() => undefined);

  const [status, setStatus] = useState<MetaSuiteProgramState>('ROBOT_HOME');
  const [previousPythonState, setPreviousPythonState] = useState<unknown>({});

  const programState = useProgramState();

  const [programStopCause, setProgramStopCause] = useState<ProgramStopCause>(
    ProgramStopCause.NORMAL,
  );

  const maxAmount = calculateTotalProducts(cobotConfig, product);

  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showGripper1CheckFailedModal, setShowGripper1CheckFailedModal] =
    useState(false);
  const [showGripper2CheckFailedModal, setShowGripper2CheckFailedModal] =
    useState(false);
  const [
    showPickupFinishedFromMachineFailedModal,
    setShowPickupFinishedFromMachineFailedModal,
  ] = useState(false);
  const [showClearSecondDrawerModal, setShowClearSecondDrawerModal] =
    useState(false);

  const fabricationTimer = useTimer();
  const productTimer = useTimer();
  const database = useDatabase();

  async function play(
    product: Product,
    cobotConfig: CobotConfig,
    cobotInfo: CobotInfo,
    toolWeight: number,
    resumeForm?: ResumeForm,
  ) {
    setShowResumeModal(false);

    if (fabricationState.amount > maxAmount) {
      errorToast(t, t('MAX_NUMBER', { name: t('AMOUNT'), max: maxAmount }));
      return;
    }

    setStatus('HOMING');

    let productsToFabricate = 0;
    let amountAlreadyProduced = 0;

    if (!resumeForm || resumeForm.mode === 'restart') {
      updateProductLastFabricationAmount(
        database,
        product,
        fabricationState.amount,
      );

      productsToFabricate = fabricationState.amount;

      fabricationState.startFabrication(productsToFabricate);

      productTimer.startTimer();
      fabricationTimer.startTimer();
      setPreviousPythonState('{}');
    } else {
      productsToFabricate = fabricationState.productsToFabricate;
      amountAlreadyProduced = fabricationState.amountBeforeStop;

      fabricationState.resumeFabrication(productsToFabricate);

      productTimer.resumeTimer();
      fabricationTimer.resumeTimer();
    }

    runMain({
      programMode: 'MAIN',
      product,
      cobotConfig,
      cobotInfo,
      productsToFabricate,
      amountAlreadyProduced,
      watchers: {
        communicationWatcher,
        programWatcher,
        programStopCauseWatcher,
      },
      resumeForm,
      previousPythonState,
      toolWeight,
    });

    function communicationWatcher({
      text,
      sendResponse,
    }: CommunicationWatcherArgs) {
      sendResponseRef.current = sendResponse;

      if (text === 'CLEAR_SECOND_DRAWER') {
        setShowClearSecondDrawerModal(true);

        return;
      }

      if (!isMetaSuiteProgramStateMessage(text)) {
        sendResponse('OK');
        return;
      }

      const json = parseMetaSuiteProgramJSON(text);
      const status = json.state;

      if (status === 'PRODUCT_FINISHED') {
        const duration = productTimer.getDuration();

        insertFabrication(database, {
          id: crypto.randomUUID(),
          productId: product.id,
          productIteration: product.iteration,
          configurationId: cobotConfig.id,
          data: {
            duration,
            success: true,
            error: '',
          },
          createdAt: new Date().toISOString(),
          migration: MIGRATION,
        });

        updateProductLastFabricationDuration(database, product, duration);

        // Restart productTimer for next product.
        productTimer.startTimer();
      } else if (status === 'PICK_FROM_DRAWER_FAILED') {
        insertFabrication(database, {
          id: crypto.randomUUID(),
          productId: product.id,
          productIteration: product.iteration,
          configurationId: cobotConfig.id,
          data: {
            duration: productTimer.getDuration(),
            success: false,
            error: status,
          },
          createdAt: new Date().toISOString(),
          migration: MIGRATION,
        });

        // Restart productTimer for next product.
        productTimer.startTimer();

        errorToast(t, t('PICK_FROM_DRAWER_FAILED_MESSAGE'));
      } else if (status === 'GRIPPER1_CHECK_FAILED') {
        setShowGripper1CheckFailedModal(true);
        errorToast(t, t('GRIPPER1_CHECK_FAILED'));
      } else if (status === 'GRIPPER2_CHECK_FAILED') {
        setShowGripper2CheckFailedModal(true);
        errorToast(t, t('GRIPPER2_CHECK_FAILED'));
      } else if (status === 'PICK_FROM_MACHINE_FAILED') {
        insertFabrication(database, {
          id: crypto.randomUUID(),
          productId: product.id,
          productIteration: product.iteration,
          configurationId: cobotConfig.id,
          data: {
            duration: productTimer.getDuration(),
            success: false,
            error: status,
          },
          createdAt: new Date().toISOString(),
          migration: MIGRATION,
        });

        fabricationTimer.pauseTimer();
        productTimer.pauseTimer();
        setShowPickupFinishedFromMachineFailedModal(true);

        errorToast(t, t('PICK_FINISHED_PRODUCT_FROM_MACHINE_FAILED'));
      } else if (status === 'TOTAL_FINISHED') {
        fabricationTimer.pauseTimer();
        productTimer.pauseTimer();
        setShowResultsModal(true);
      }

      fabricationState.onStatusReceived(json);

      setPreviousPythonState(json);
      setStatus(status);

      sendResponse(status);
    }

    function programWatcher(state: ProgramState) {
      if (state === ProgramState.HOLD) {
        productTimer.pauseTimer();
        fabricationTimer.pauseTimer();
      } else if (state === ProgramState.PLAY) {
        productTimer.resumeTimer();
        fabricationTimer.resumeTimer();
      }
    }

    function programStopCauseWatcher(state: ProgramStopCause) {
      setProgramStopCause(state);

      if (state === ProgramStopCause.NORMAL) {
        fabricationState.onStop();
      } else {
        // Since we do not have a resume temporarily disable reset
        // whenever the user has stopped
        fabricationState.resetState();

        productTimer.pauseTimer();
        fabricationTimer.pauseTimer();
      }
    }
  }

  function closeResultModal() {
    setShowResultsModal(false);
    fabricationState.resetState();
  }

  const showPlayButton =
    programState === ProgramState.NONE ||
    programState === ProgramState.CANCELLED ||
    programState === ProgramState.STOP;

  const isPlaying = !showPlayButton;

  const toolWeightStr = useToolWeight();
  const toolWeight = toolWeightStr ? parseFloat(toolWeightStr) : 0;

  return (
    <>
      {showClearSecondDrawerModal ? (
        <ClearSecondDrawerModal
          sendResponse={(response: string) => {
            sendResponseRef.current(response);
            setShowClearSecondDrawerModal(false);
          }}
        />
      ) : null}

      {showResumeModal ? (
        <ResumeModal
          onClose={() => setShowResumeModal(false)}
          onSubmit={(resumeForm) =>
            play(product, cobotConfig, cobotInfo, toolWeight, resumeForm)
          }
          programStopCause={programStopCause}
          cobotConfig={cobotConfig}
          amount={fabricationState.amount}
          amountRemaining={fabricationState.productsToFabricate}
        />
      ) : null}

      {showResultsModal ? (
        <ResultModal
          onClose={closeResultModal}
          fabricationState={fabricationState}
          productTimer={productTimer}
          fabricationTimer={fabricationTimer}
        />
      ) : null}

      {showGripper1CheckFailedModal ? (
        <Gripper1CheckFailedModal
          cobotConfig={cobotConfig}
          onClose={() => setShowGripper1CheckFailedModal(false)}
        />
      ) : null}

      {showGripper2CheckFailedModal ? (
        <Gripper2CheckFailedModal
          cobotConfig={cobotConfig}
          onClose={() => setShowGripper2CheckFailedModal(false)}
        />
      ) : null}

      {showPickupFinishedFromMachineFailedModal ? (
        <PickupFinishedFromMachineFailedModal
          cobotConfig={cobotConfig}
          onClose={() => setShowPickupFinishedFromMachineFailedModal(false)}
        />
      ) : null}

      <Debug value={fabricationState} />
      <Debug value={previousPythonState} />

      <FabricationGuard product={product}>
        {() => (
          <>
            <div className="tw-flex tw-place-items-center">
              <FabricateSection
                onPlay={() => {
                  play(product, cobotConfig, cobotInfo, toolWeight);

                  // Disabled the resume modal for the first version
                  // since resume does not work correctly

                  // programStopCause === ProgramStopCause.NORMAL
                  //   ? play(product, cobotConfig)
                  //   : setShowResumeModal(true);
                }}
                showPlayButton={showPlayButton}
                fabricationState={fabricationState}
                programState={programState}
                maxAmount={maxAmount}
                productTimer={productTimer}
                fabricationTimer={fabricationTimer}
              />

              <div className="tw-grid tw-flex-grow tw-gap-4 tw-w-full tw-place-items-end">
                <SubTitle>{t('PROCESS')}</SubTitle>

                <ProgressIndicator
                  isPlaying={isPlaying}
                  product={product}
                  status={status}
                  cobotConfig={cobotConfig}
                />

                <SubTitle>{t('STATUS')}</SubTitle>
                <StatusIndicator
                  isPlaying={isPlaying}
                  product={product}
                  status={status}
                  cobotConfig={cobotConfig}
                  fabricationState={fabricationState}
                />
              </div>
            </div>

            <FabricationWarnings product={product} cobotConfig={cobotConfig} />
          </>
        )}
      </FabricationGuard>
    </>
  );
}
