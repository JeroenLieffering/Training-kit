import BoltIcon from '@mui/icons-material/Bolt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import React from 'react';
import {
  Button,
  HtmlParagraphs,
  Modal,
  Spinner,
} from '../../../../../../../../../components';
import { useT } from '../../../../../../../../../hooks/useT';
import { useBackup } from './hooks/useBackup';

export function BackupButton() {
  const t = useT();

  const {
    doBackup,
    isExporting,
    currentProduct,
    totalProducts,
    showModal,
    closeModal,
    openModal,
  } = useBackup();

  return (
    <>
      {showModal ? (
        <Modal title={t('BACKUP')} onClose={closeModal}>
          <HtmlParagraphs text={t('BACKUP_EXPLANATION')} />

          {isExporting ? (
            <div className="tw-flex tw-justify-center tw-gap-2">
              <Spinner />{' '}
              <span>
                {t('EXPORTING')} {currentProduct} / {totalProducts}{' '}
                {t('PRODUCTS')}
              </span>
            </div>
          ) : (
            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
              <Button
                variant="secondary"
                icon={BoltIcon}
                onClick={() => doBackup('partial')}
                full
              >
                {t('PARTIAL_BACKUP')}
              </Button>

              <Button
                icon={HourglassEmptyIcon}
                onClick={() => doBackup('full')}
                full
              >
                {t('FULL_BACKUP')}
              </Button>
            </div>
          )}
        </Modal>
      ) : null}

      <Button icon={FileDownloadIcon} onClick={openModal} loading={isExporting}>
        {t('BACKUP')}
      </Button>
    </>
  );
}
