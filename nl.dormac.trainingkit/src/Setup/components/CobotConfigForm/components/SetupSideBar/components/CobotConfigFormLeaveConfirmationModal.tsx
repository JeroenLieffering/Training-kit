import React from 'react';
import { ConfirmModal } from '../../../../../../components';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  onConfirm: () => void;
  onClose: () => void;
};

export function CobotConfigFormLeaveConfirmationModal({
  onConfirm,
  onClose,
}: Props) {
  const t = useT();

  return (
    <ConfirmModal onClose={onClose} onConfirm={onConfirm}>
      <p>{t('CONFIG_LEAVE_CONFIRMATION')}</p>
    </ConfirmModal>
  );
}
