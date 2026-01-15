import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { ProgramState } from 'dart-api';
import React from 'react';
import DrlUtils from '../../../../../DrlUtils';
import { FabricationState, Timer } from '../../../../types';
import { FabricationStatus } from './components/FabricationStatus/FabricationStatus';
import { AmountInput } from './components/AmountInput';
import { BigIconButton } from './components/BigIconButton';
import { SubTitle } from '../../../../../components';
import { useT } from '../../../../../hooks/useT';

type Props = {
  showPlayButton: boolean;
  fabricationState: FabricationState;
  programState: ProgramState;
  maxAmount: number;
  productTimer: Timer;
  fabricationTimer: Timer;
  onPlay: () => void;
};

export function FabricateSection({
  onPlay,
  showPlayButton,
  fabricationState,
  maxAmount,
  programState,
  productTimer,
  fabricationTimer,
}: Props) {
  const t = useT();

  function onAmountChanged(value: number) {
    fabricationState.userChangedAmount(value);
  }

  return (
    <div
      className="tw-flex-grow-0 tw-flex-shrink-0 tw-grid tw-gap-4"
      style={{ flexBasis: '350px' }}
    >
      <SubTitle>{t('FABRICATE')}</SubTitle>

      {showPlayButton ? (
        <div className="tw-flex tw-gap-4 tw-items-center tw-h-24">
          <BigIconButton onClick={onPlay} icon={PlayIcon} />

          <AmountInput
            value={fabricationState.amount}
            onChange={onAmountChanged}
            max={maxAmount}
          />
        </div>
      ) : (
        <div className="tw-flex tw-gap-8 tw-items-center tw-h-24">
          <div className="tw-flex tw-gap-4">
            {programState === ProgramState.HOLD ? (
              <BigIconButton
                onClick={() => DrlUtils.getInstance().resume()}
                icon={PlayIcon}
              />
            ) : (
              <BigIconButton
                onClick={() => DrlUtils.getInstance().pause()}
                icon={PauseIcon}
              />
            )}

            <BigIconButton
              onClick={() => DrlUtils.getInstance().stop()}
              icon={StopIcon}
            />
          </div>

          <FabricationStatus
            fabricationState={fabricationState}
            productTimer={productTimer}
            fabricationTimer={fabricationTimer}
          />
        </div>
      )}
    </div>
  );
}
