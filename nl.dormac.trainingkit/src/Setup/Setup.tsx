import React, { useRef, useState } from 'react';
import { CobotConfig } from '../core/models/cobot-config-types';
import { Product } from '../core/models/product-types';
import { updateConfig } from '../core/services/cobot-config-service';
import {
  syncProductReachTestWithCobotConfig,
  syncProductWithCobotConfig,
  updateProduct,
} from '../core/services/product-service';
import { useCobotConfig } from '../hooks/useCobotConfig';
import { useCobotInfo } from '../hooks/useCobotInfo';
import { useDatabase } from '../hooks/useDatabase';
import { useNavigate } from '../hooks/useNavigate';
import { useProducts } from '../hooks/useProducts';
import { useT } from '../hooks/useT';
import { genericErrorToast, successToast } from '../utils/toast';
import { CobotConfigForm } from './components/CobotConfigForm/CobotConfigForm';
import { SetupConfirmation } from './components/SetupConfirmation/SetupConfirmation';
import { SetupSubPage } from './types';
import { useToolWeight } from '../hooks/useToolWeight';
import { logger } from 'dart-api';

type Props = {
  initialSubPage: SetupSubPage;
};

export function Setup({ initialSubPage }: Props) {
  const t = useT();

  const nextCobotConfigRef = useRef<CobotConfig | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigateTo = useNavigate();

  const database = useDatabase();
  const [prevCobotConfig] = useCobotConfig();
  const [products, loadingProducts] = useProducts();
  const cobotInfo = useCobotInfo();
  logger.info('products = ' + JSON.stringify(products));

  const toolWeightStr = useToolWeight() ?? '0';
  const toolWeight = parseFloat(toolWeightStr);

  async function onSubmit(nextCobotConfig: CobotConfig) {
    if (!prevCobotConfig || loadingProducts) {
      return;
    }

    // If nothing has changed do nothing
    if (JSON.stringify(prevCobotConfig) === JSON.stringify(nextCobotConfig)) {
      saveSuccess();
      return;
    }

    nextCobotConfigRef.current = nextCobotConfig;
    if (products.length === 0) {
      save([], []);
    } else {
      setShowConfirmationModal(true);
    }
  }

  async function save(
    productsToInvalidate: Product[],
    productsToActivate: Product[],
  ) {
    if (!prevCobotConfig || !nextCobotConfigRef.current) {
      return;
    }

    try {
      const nextCobotConfig = nextCobotConfigRef.current;

      const result = await updateConfig(database, {
        prev: prevCobotConfig,
        next: nextCobotConfig,
      });

      if (result) {
        const productsToInvalidateIds = productsToInvalidate.map(
          (product) => product.id,
        );
        const productsToActivateIds = productsToActivate.map(
          (product) => product.id,
        );

        for (const product of products) {
          const nextProduct = structuredClone(product);

          syncProductWithCobotConfig(nextProduct, nextCobotConfig);
          syncProductReachTestWithCobotConfig({
            product: nextProduct,
            nextCobotConfig,
            prevCobotConfig,
          });

          if (productsToActivateIds.includes(nextProduct.id)) {
            nextProduct.state = 'active';
          } else if (productsToInvalidateIds.includes(nextProduct.id)) {
            nextProduct.state = 'invalidated';
          }

          await updateProduct(database, {
            prev: product,
            next: nextProduct,
          });
        }

        saveSuccess();
      } else {
        genericErrorToast(t);
      }
    } catch {
      genericErrorToast(t);
    }
  }

  function saveSuccess() {
    successToast(t, t('CONFIG_UPDATED'));

    navigateTo({
      page: 'PRODUCTS',
    });
  }

  return (
    <>
      {prevCobotConfig ? (
        <CobotConfigForm
          cobotConfig={prevCobotConfig}
          onSubmit={onSubmit}
          initialSubPage={initialSubPage}
        />
      ) : null}

      {showConfirmationModal &&
      prevCobotConfig &&
      nextCobotConfigRef.current &&
      cobotInfo ? (
        <SetupConfirmation
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={save}
          products={products}
          prevCobotConfig={prevCobotConfig}
          nextCobotConfig={nextCobotConfigRef.current}
          cobotInfo={cobotInfo}
          toolWeight={toolWeight}
        />
      ) : null}
    </>
  );
}
