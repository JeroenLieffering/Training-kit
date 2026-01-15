import React from 'react';
import { Product, ProductState } from '../core/models/product-types';
import { updateProduct } from '../core/services/product-service';
import { useCobotConfig } from '../hooks/useCobotConfig';
import { useCobotInfo } from '../hooks/useCobotInfo';
import { useDatabase } from '../hooks/useDatabase';
import { useNavigate } from '../hooks/useNavigate';
import { useProduct } from '../hooks/useProduct';
import { genericErrorToast, successToast } from '../utils/toast';
import { UnknownCobot } from './components/UnknownCobot';
import { ProductFormSubPage } from '../ProductForm/types';
import { ProductForm } from '../ProductForm/ProductForm';
import { useT } from '../hooks/useT';
import { truncate } from '../utils/string';
import { useToolWeight } from '../hooks/useToolWeight';

type Props = {
  productID: string;
  initialSubPage: ProductFormSubPage;
};

export function ProductEdit({ productID, initialSubPage }: Props) {
  const t = useT();

  const navigateTo = useNavigate();

  const [product] = useProduct(productID);
  const [cobotConfig] = useCobotConfig();
  const cobotInfo = useCobotInfo();

  const database = useDatabase();

  const toolWeightStr = useToolWeight() ?? '0';
  const toolWeight = parseFloat(toolWeightStr);

  async function onSubmit(updatedProduct: Product) {
    if (!product) {
      return;
    }

    // When onSubmit is called the Product is valid at this point.
    // So we always update the state to 'active', except when the
    // state is explicitly deactivated at this point. This means that
    // the user fixed a Product back to valid, but kept it deactivated
    // deliberately.
    const nextState: ProductState =
      updatedProduct.state === 'deactivated' ? 'deactivated' : 'active';

    const result = await updateProduct(database, {
      prev: product,
      next: { ...updatedProduct, state: nextState },
    });

    if (result) {
      const name = truncate(updatedProduct.name, 15);
      successToast(t, t('PRODUCT_UPDATED', { name }));

      navigateTo({ page: 'PRODUCT_DETAIL', productID });
    } else {
      genericErrorToast(t);
    }
  }

  if (!product || !cobotConfig) {
    return null;
  }

  if (!cobotInfo) {
    return <UnknownCobot />;
  }

  return (
    <ProductForm
      onSubmit={onSubmit}
      product={product}
      cobotConfig={cobotConfig}
      cobotInfo={cobotInfo}
      initialSubPage={initialSubPage}
      mode="EDIT"
      toolWeight={toolWeight}
    />
  );
}
