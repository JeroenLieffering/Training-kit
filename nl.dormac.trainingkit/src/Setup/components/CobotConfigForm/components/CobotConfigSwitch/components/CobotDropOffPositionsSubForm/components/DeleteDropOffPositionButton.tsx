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

export function DeleteDropOffPositionButton({ name, onRemove }: Props) {
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
            text={t('DROP_OFF_POSITION_DELETE_CONFIRMATION', {
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
        {t('DELETE_DROP_OFF_POSITION')}
      </Button>
    </>
  );
}
