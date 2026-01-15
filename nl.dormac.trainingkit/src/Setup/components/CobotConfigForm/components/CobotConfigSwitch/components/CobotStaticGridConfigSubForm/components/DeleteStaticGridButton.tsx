import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useState } from 'react';
import {
  Button,
  ConfirmModal,
  HtmlParagraphs,
} from '../../../../../../../../components';
import { useT } from '../../../../../../../../hooks/useT';

type Props = {
  name: string;
  onRemove: () => void;
};

export function DeleteStaticGridButton({ name, onRemove }: Props) {
  const t = useT();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <>
      {showConfirmModal ? (
        <ConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={onRemove}
          variant="destructive"
        >
          <HtmlParagraphs
            text={t('STATIC_GRID_DELETE_CONFIRMATION', {
              name,
            })}
          />
        </ConfirmModal>
      ) : null}

      <Button
        icon={DeleteForeverIcon}
        onClick={() => setShowConfirmModal(true)}
        variant="destructive"
        full
      >
        {t('DELETE_STATIC_GRID')}
      </Button>
    </>
  );
}
