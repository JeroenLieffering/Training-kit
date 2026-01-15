import BlockIcon from '@mui/icons-material/Block';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import React from 'react';
import {
  Button,
  HtmlParagraphs,
  Modal,
  Spinner,
} from '../../../../../../../../../components';
import { useT } from '../../../../../../../../../hooks/useT';
import { useRestore } from './hooks/useRestore';

export function RestoreButton() {
  const t = useT();

  const {
    doImport,
    isImporting,
    currentProduct,
    totalProducts,
    showModal,
    closeModal,
    openModal,
  } = useRestore();

  return (
    <>
      {showModal ? (
        <Modal title={t('RESTORE_BACKUP')} onClose={closeModal}>
          <HtmlParagraphs text={t('RESTORE_BACKUP_EXPLANATION')} />

          {isImporting ? (
            <div className="tw-flex tw-justify-center tw-gap-2">
              <Spinner />{' '}
              <span>
                {t('RESTORING')} {currentProduct} / {totalProducts}{' '}
                {t('PRODUCTS')}
              </span>
            </div>
          ) : (
            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
              <Button
                variant="secondary"
                icon={BlockIcon}
                onClick={closeModal}
                full
              >
                {t('CANCEL')}
              </Button>
              <Button
                icon={WarningOutlinedIcon}
                onClick={doImport}
                variant="destructive"
                full
              >
                {t('RESTORE_BACKUP')}
              </Button>
            </div>
          )}
        </Modal>
      ) : null}

      <Button
        icon={FileUploadIcon}
        onClick={openModal}
        loading={isImporting}
        variant="destructive"
      >
        {t('RESTORE_BACKUP')}
      </Button>
    </>
  );
}
