import React from 'react';
import { ConfirmModal } from '../../../../components';
import { useT } from '../../../../hooks/useT';

type Props = {
  onConfirm: () => void;
  onClose: () => void;
};

export function ProductFormLeaveConfirmationModal({
  onConfirm,
  onClose,
}: Props) {
  const t = useT();

  return (
    <ConfirmModal onClose={onClose} onConfirm={onConfirm}>
      <p>{t('PRODUCT_LEAVE_CONFIRMATION')}</p>
    </ConfirmModal>
  );
}
