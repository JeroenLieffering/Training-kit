import BlockIcon from '@mui/icons-material/Block';
import { SafetyMode } from 'dart-api';
import React, { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Alert, Button, Debug, Modal, Spinner } from '../../../../components';
import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { Product } from '../../../../core/models/product-types';
import { Drawer } from '../../../../core/services/drawer-service';
import { runMain } from '../../../../drl/main/main';
import {
  isMetaSuiteProgramStateMessage,
  parseMetaSuiteProgramJSON,
} from '../../../../drl/main/utils';
import DrlUtils, { CommunicationWatcherArgs } from '../../../../DrlUtils';
import { useIsServoOn } from '../../../../hooks/useIsServoOn';
import { useSafetyMode } from '../../../../hooks/useSafetyMode';
import { useT } from '../../../../hooks/useT';
import {
  BaseFormDescription,
  BaseFormItem,
  BaseFormLabel,
  BaseFormMessage,
} from '../../../../shadcn';
import { successToast } from '../../../../utils/toast';
import { CobotInfo } from '../../../../types';
import { useToolWeight } from '../../../../hooks/useToolWeight';

type Props = {
  drawer: Drawer;
  form: UseFormReturn<Product, any, undefined>;
  cobotConfig: CobotConfig;
  cobotInfo: CobotInfo;
};

export function ReachTestButton({
  cobotConfig,
  form,
  drawer,
  cobotInfo,
}: Props) {
  const t = useT();

  const toolWeightStr = useToolWeight();
  const toolWeight = toolWeightStr ? parseFloat(toolWeightStr) : 0;

  const isServoOn = useIsServoOn();
  const safetyMode = useSafetyMode();

  const [running, setRunning] = useState(false);
  const spotStatusRef = useRef<boolean[]>([]);

  const [progress, setProgress] = useState('');
  const [progressPhase, setProgressPhase] = useState<
    'PICK' | 'PLACE' | 'INITIALIZING'
  >('INITIALIZING');

  async function testReach() {
    const product = form.getValues();

    setRunning(true);
    setProgress('');
    setProgressPhase('INITIALIZING');

    runMain({
      programMode: 'REACH',
      reachDrawer: drawer,
      product,
      cobotConfig,
      cobotInfo,
      productsToFabricate: 0,
      amountAlreadyProduced: 0,
      watchers: {
        communicationWatcher,
        programWatcher,
        programStopCauseWatcher,
      },
      previousPythonState: {},
      toolWeight,
    });

    function communicationWatcher({
      text,
      sendResponse,
    }: CommunicationWatcherArgs) {
      if (text.startsWith('REACHABLE:')) {
        const message = text.split('REACHABLE: ')[1];

        const [indexStr, status] = message.split(' ');

        const index = parseFloat(indexStr);

        spotStatusRef.current[index] = status === 'VALID';
      } else if (text.startsWith('PROGRESS:')) {
        const message = text.split('PROGRESS: ')[1];

        if (message.startsWith('PICK')) {
          setProgressPhase('PICK');

          const progress = text.split('PICK ')[1];
          setProgress(progress);
        } else {
          setProgressPhase('PLACE');

          const progress = text.split('PLACE ')[1];
          setProgress(progress);
        }
      } else if (isMetaSuiteProgramStateMessage(text)) {
        const json = parseMetaSuiteProgramJSON(text);
        const status = json.state;

        if (status === 'REACH_TEST_FINISHED') {
          successToast(t, t('REACH_TEST_FINISHED'));

          if (drawer === 'MAIN') {
            form.setValue('config.REACH_TESTED', true);
            form.setValue('config.SPOT_STATUS', spotStatusRef.current);
          } else {
            form.setValue('config.SECOND_DRAWER_REACH_TESTED', true);
            form.setValue(
              'config.SECOND_DRAWER_SPOT_STATUS',
              spotStatusRef.current,
            );
          }

          form.trigger();

          // Technically not needed since we also do this on
          // `programStopCauseWatcher` but I have a feeling that one
          // sometimes slips by React.
          // setRunning(false);
          setRunning(true);
        }
      }

      sendResponse('OK');
    }

    function programWatcher() {
      // Do nothing intentionally
    }

    function programStopCauseWatcher() {
      setRunning(false);
    }
  }

  function onCancel() {
    setRunning(false);
    DrlUtils.getInstance().stop();
  }

  return (
    <BaseFormItem
      name={
        drawer === 'MAIN'
          ? 'config.REACH_TESTED'
          : 'config.SECOND_DRAWER_REACH_TESTED'
      }
    >
      <BaseFormLabel>{t('REACH_TEST')}</BaseFormLabel>
      {running ? (
        <Modal
          onClose={() => undefined}
          canClose={false}
          title={t('TESTING_REACH')}
        >
          <div className="tw-grid tw-place-items-center tw-gap-2">
            <Spinner size="xl" />

            <p className="tw-w-full tw-text-center">
              {t(progressPhase)} {progress}
            </p>

            <Button variant="secondary" icon={BlockIcon} onClick={onCancel}>
              {t('CANCEL')}
            </Button>
          </div>
        </Modal>
      ) : null}

      {!isServoOn ? (
        <Alert title={t('SERVO_IS_OFF_MESSAGE_REACH')} variant="destructive" />
      ) : safetyMode !== SafetyMode.AUTO ? (
        <Alert
          title={t('ROBOT_MODE_NOT_AUTO_MESSAGE_REACH')}
          variant="destructive"
        />
      ) : (
        <Button onClick={testReach} loading={running}>
          {t('TEST_REACH')}
        </Button>
      )}
      <BaseFormMessage />
      <BaseFormDescription>{t('REACH_TEST_EXPLANATION')}</BaseFormDescription>
      <Debug value={spotStatusRef.current} />
    </BaseFormItem>
  );
}
