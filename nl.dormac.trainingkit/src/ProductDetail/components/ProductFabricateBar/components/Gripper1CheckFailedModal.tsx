import React from 'react';
import { IOButton, Modal } from '../../../../components';
import { useT } from '../../../../hooks/useT';
import { useGripper1 } from '../../../../hooks/useGripper1';
import { CobotConfig } from '../../../../core/models/cobot-config-types';

type Props = {
  cobotConfig: CobotConfig;
  onClose: () => void;
};

export function Gripper1CheckFailedModal({ onClose, cobotConfig }: Props) {
  const t = useT();

  const { open, isOpened } = useGripper1(cobotConfig);

  return (
    <Modal
      title={t('GRIPPER_CHECK_FAILED', { gripper: 1 })}
      onClose={onClose}
      footer={
        <IOButton onClick={open} value={isOpened}>
          {t('OPEN_GRIPPER', { gripper: 1 })}
        </IOButton>
      }
    >
      <p>{t('GRIPPER_CHECK_FAILED_MESSAGE', { gripper: 1 })}</p>
    </Modal>
  );
}
