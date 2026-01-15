import React from 'react';
import { IOButton, Modal } from '../../../../components';
import { useT } from '../../../../hooks/useT';
import { useGripper2 } from '../../../../hooks/useGripper2';
import { CobotConfig } from '../../../../core/models/cobot-config-types';

type Props = {
  cobotConfig: CobotConfig;
  onClose: () => void;
};

export function Gripper2CheckFailedModal({ onClose, cobotConfig }: Props) {
  const t = useT();

  const { open, isOpened } = useGripper2(cobotConfig);

  return (
    <Modal
      title={t('GRIPPER_CHECK_FAILED', { gripper: 2 })}
      onClose={onClose}
      footer={
        <IOButton onClick={open} value={isOpened}>
          {t('OPEN_GRIPPER', { gripper: 2 })}
        </IOButton>
      }
    >
      <p>{t('GRIPPER_CHECK_FAILED_MESSAGE', { gripper: 2 })}</p>
    </Modal>
  );
}
