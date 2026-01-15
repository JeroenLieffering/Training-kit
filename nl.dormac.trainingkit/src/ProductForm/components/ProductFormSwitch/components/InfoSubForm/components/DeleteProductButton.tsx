import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Button,
  ConfirmModal,
  HtmlParagraphs,
} from '../../../../../../components';
import { Product } from '../../../../../../core/models/product-types';
import { deleteProduct } from '../../../../../../core/services/product-service';
import { useDatabase } from '../../../../../../hooks/useDatabase';
import { useNavigate } from '../../../../../../hooks/useNavigate';
import { genericErrorToast, successToast } from '../../../../../../utils/toast';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
};

export function DeleteProductButton({ form }: Props) {
  const t = useT();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const database = useDatabase();
  const navigateTo = useNavigate();

  const product = form.getValues();

  async function remove() {
    try {
      const result = await deleteProduct(database, product);

      if (result) {
        successToast(t, t('PRODUCT_DELETED', { name: product.name }));

        navigateTo({
          page: 'PRODUCTS',
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
          onConfirm={remove}
          variant="destructive"
        >
          <HtmlParagraphs
            text={t('PRODUCT_DELETE_CONFIRMATION', { name: product.name })}
          />
        </ConfirmModal>
      ) : null}

      <Button
        icon={DeleteForeverIcon}
        onClick={() => setShowConfirmModal(true)}
        variant="destructive"
        full
      >
        {t('DELETE_PRODUCT')}
      </Button>
    </>
  );
}
