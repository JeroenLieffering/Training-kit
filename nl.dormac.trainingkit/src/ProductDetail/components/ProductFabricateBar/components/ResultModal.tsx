import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import React from 'react';
import { Button, Modal } from '../../../../components';
import { FabricationState, Timer } from '../../../types';
import { useT } from '../../../../hooks/useT';
import { TimerView } from './TimerView';

type Props = {
  onClose: () => void;
  fabricationState: FabricationState;
  productTimer: Timer;
  fabricationTimer: Timer;
};

export function ResultModal({
  onClose,
  fabricationState,
  fabricationTimer,
}: Props) {
  const t = useT();

  const Icon = fabricationState.pickupFails === 0 ? CheckCircleIcon : ErrorIcon;
  const color =
    fabricationState.pickupFails === 0
      ? 'tw-text-lime-500'
      : 'tw-text-destructive';

  return (
    <Modal
      title={t('RESULTS')}
      onClose={onClose}
      footer={
        <Button full onClick={onClose}>
          {t('CLOSE_RESULTS')}
        </Button>
      }
    >
      <div className={`tw-flex tw-justify-center ${color}`}>
        <Icon className="tw-h-16 tw-w-16 tw-text-su" />
      </div>

      <dl className="tw-grid tw-place-content-center">
        <div className="tw-flex tw-gap-2">
          <dt className="tw-font-semibold">{t('FABRICATED')}:</dt>
          <dd>{fabricationState.totalProductsFabricated}</dd>
        </div>

        <div className="tw-flex tw-gap-2">
          <dt className="tw-font-semibold">{t('ERRORS_TITLE')}:</dt>
          <dd>{fabricationState.pickupFails}</dd>
        </div>

        <div className="tw-flex tw-gap-2">
          <dt className="tw-font-semibold">{t('DURATION')}:</dt>
          <dd>
            <TimerView timer={fabricationTimer} />
          </dd>
        </div>
      </dl>
    </Modal>
  );
}
