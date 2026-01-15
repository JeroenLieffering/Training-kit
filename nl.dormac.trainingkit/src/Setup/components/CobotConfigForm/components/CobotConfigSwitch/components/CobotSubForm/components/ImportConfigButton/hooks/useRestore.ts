import { FilePickerErrorCode } from 'dart-api';
import { useState } from 'react';
import {
  isValidBackup,
  restore,
} from '../../../../../../../../../../core/services/backup-restore/restore-service';
import { useDatabase } from '../../../../../../../../../../hooks/useDatabase';
import { useFilepicker } from '../../../../../../../../../../hooks/useFilePicker';
import { useT } from '../../../../../../../../../../hooks/useT';
import {
  errorToast,
  genericErrorToast,
} from '../../../../../../../../../../utils/toast';

export function useRestore() {
  const database = useDatabase();
  const filePicker = useFilepicker();

  const [showModal, setShowModal] = useState(false);

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const [currentProduct, setCurrentProduct] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);

  const [isImporting, setIsImporting] = useState(false);

  const t = useT();

  async function doImport() {
    try {
      const { handlers, errorCode } = await filePicker.showFilePicker({
        multiple: false,
      });

      setIsImporting(true);
      setCurrentProduct(1);

      if (handlers) {
        const handler = handlers[0];

        if (handler) {
          const { data } = await handler.read();

          if (data) {
            let json = null;
            try {
              json = JSON.parse(data);
            } catch {
              errorToast(t, t('INVALID_BACKUP_FORMAT_ERROR'));
              return;
            }

            if (isValidBackup(json)) {
              await restore(database, json, {
                setCurrentProduct,
                setTotalProducts,
              });

              closeModal();
            } else {
              errorToast(t, t('INVALID_BACKUP_FORMAT_ERROR'));
            }
          } else {
            genericErrorToast(t);
          }
        }
      } else if (errorCode === FilePickerErrorCode.CANCELED_BY_USER) {
        closeModal();
      } else {
        genericErrorToast(t);
      }
    } catch {
      genericErrorToast(t);
    } finally {
      setIsImporting(false);
      setCurrentProduct(1);
    }
  }

  return {
    showModal,
    closeModal,
    openModal,
    doImport,
    isImporting,
    totalProducts,
    currentProduct,
  } as const;
}
