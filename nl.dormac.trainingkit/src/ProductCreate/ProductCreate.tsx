import React from 'react';
import { Product } from '../core/models/product-types';
import {
  insertProductWithHistory,
  makeDefaultProduct,
} from '../core/services/product-service';
import { useCobotConfig } from '../hooks/useCobotConfig';
import { useCobotInfo } from '../hooks/useCobotInfo';
import { useDatabase } from '../hooks/useDatabase';
import { useNavigate } from '../hooks/useNavigate';
import { useT } from '../hooks/useT';
import { ProductForm } from '../ProductForm/ProductForm';
import { ProductFormSubPage } from '../ProductForm/types';
import { truncate } from '../utils/string';
import { genericErrorToast, successToast } from '../utils/toast';
import { useToolWeight } from '../hooks/useToolWeight';

type Props = {
  initialSubPage: ProductFormSubPage;
};

export function ProductCreate({ initialSubPage }: Props) {
  const t = useT();

  const navigateTo = useNavigate();
  const database = useDatabase();
  const [cobotConfig] = useCobotConfig();
  const cobotInfo = useCobotInfo();

  const toolWeightStr = useToolWeight() ?? '0';
  const toolWeight = parseFloat(toolWeightStr);

  async function onSubmit(product: Product) {
    try {
      product.createdAt = new Date().toISOString();
      product.updatedAt = new Date().toISOString();
      const result = await insertProductWithHistory(database, product);

      if (result) {
        const name = truncate(product.name, 15);

        successToast(t, t('PRODUCT_CREATED', { name }));

        navigateTo({
          page: 'PRODUCT_DETAIL',
          productID: product.id,
        });
      } else {
        genericErrorToast(t);
      }
    } catch {
      genericErrorToast(t);
    }
  }

  if (!cobotConfig || !cobotInfo) {
    return null;
  }

  return (
    <ProductForm
      onSubmit={onSubmit}
      cobotConfig={cobotConfig}
      product={makeDefaultProduct(cobotConfig)}
      cobotInfo={cobotInfo}
      initialSubPage={initialSubPage}
      mode="CREATE"
      toolWeight={toolWeight}
    />
  );
}
