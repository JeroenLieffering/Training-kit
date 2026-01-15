import { useState } from 'react';
import {
  BackupType,
  getBackupData,
  getBackupFilename,
} from '../../../../../../../../../../core/services/backup-restore/backup-service';
import { useDatabase } from '../../../../../../../../../../hooks/useDatabase';
import { useFilepicker } from '../../../../../../../../../../hooks/useFilePicker';
import { genericErrorToast } from '../../../../../../../../../../utils/toast';
import { useT } from '../../../../../../../../../../hooks/useT';
import { FilePickerErrorCode } from 'dart-api';

export function useBackup() {
  const database = useDatabase();
  const filePicker = useFilepicker();

  const [currentProduct, setCurrentProduct] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);

  const [isExporting, setExporting] = useState(false);

  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  const t = useT();

  async function doBackup(exportType: BackupType) {
    setExporting(true);
    setCurrentProduct(1);

    try {
      const data = await getBackupData(database, exportType, {
        setCurrentProduct,
        setTotalProducts,
      });

      const { handler, errorCode } = await filePicker.showSaveFilePicker({
        suggestedName: getBackupFilename(exportType),
      });

      if (handler) {
        handler.write(JSON.stringify(data));
        closeModal();
      } else if (errorCode === FilePickerErrorCode.CANCELED_BY_USER) {
        closeModal();
      } else {
        genericErrorToast(t);
      }
    } catch {
      genericErrorToast(t);
    } finally {
      setExporting(false);
      setCurrentProduct(1);
    }
  }

  return {
    showModal,
    closeModal,
    openModal,
    doBackup,
    isExporting,
    totalProducts,
    currentProduct,
  } as const;
}
