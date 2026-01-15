import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button, ConfirmModal } from '../../../../../../components';
import { Product } from '../../../../../../core/models/product-types';
import { insertProductWithHistory } from '../../../../../../core/services/product-service';
import { useDatabase } from '../../../../../../hooks/useDatabase';
import { useNavigate } from '../../../../../../hooks/useNavigate';
import { useT } from '../../../../../../hooks/useT';
import { genericErrorToast, successToast } from '../../../../../../utils/toast';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
};

export function CopyProductButton({ form }: Props) {
  const t = useT();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const database = useDatabase();
  const navigateTo = useNavigate();

  if (!form.formState.isValid || form.formState.isValidating) {
    return null;
  }

  const oldProduct = form.getValues();

  async function copy() {
    try {
      const newProduct = structuredClone(oldProduct);
      newProduct.id = crypto.randomUUID();
      newProduct.name = `${oldProduct.name} ${t('COPY')}`;

      newProduct.createdAt = new Date().toISOString();
      newProduct.updatedAt = new Date().toISOString();
      const result = await insertProductWithHistory(database, newProduct);

      if (result) {
        successToast(t, t('PRODUCT_COPIED', { name: oldProduct.name }));

        navigateTo({
          page: 'PRODUCT_EDIT',
          productID: newProduct.id,
          subPage: { page: 'INFO' },
        });
      } else {
        genericErrorToast(t);
      }
    } catch {
      genericErrorToast(t);
    }
  }

  return (
    <>
      {showConfirmModal ? (
        <ConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={copy}
        >
          <p>{t('PRODUCT_COPY_CONFIRMATION', { name: oldProduct.name })}</p>
        </ConfirmModal>
      ) : null}

      <Button
        icon={ContentCopyIcon}
        onClick={() => setShowConfirmModal(true)}
        full
      >
        {t('COPY_PRODUCT')}
      </Button>
    </>
  );
}
