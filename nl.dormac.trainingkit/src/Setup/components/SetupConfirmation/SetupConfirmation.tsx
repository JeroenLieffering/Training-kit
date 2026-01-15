import React from 'react';
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  ConfirmModal,
} from '../../../components';
import { CobotConfig } from '../../../core/models/cobot-config-types';
import { Product } from '../../../core/models/product-types';
import { useT } from '../../../hooks/useT';
import { CobotInfo } from '../../../types';
import { truncate } from '../../../utils/string';
import { ProductErrorsCard } from './components/ProductErrorsCard';
import { bucketProducts } from './utils';

type Props = {
  onClose: () => void;
  onConfirm: (
    productsToInvalidate: Product[],
    productsToActivate: Product[],
  ) => void;
  products: Product[];
  prevCobotConfig: CobotConfig;
  nextCobotConfig: CobotConfig;
  cobotInfo: CobotInfo;
  toolWeight: number;
};

export function SetupConfirmation({
  onClose,
  products,
  onConfirm,
  nextCobotConfig,
  prevCobotConfig,
  cobotInfo,
  toolWeight,
}: Props) {
  const t = useT();

  const { productsToActivate, productsToInvalidate, productsWithErrors } =
    bucketProducts({
      products,
      prevCobotConfig,
      nextCobotConfig,
      cobotInfo,
      toolWeight,
    });

  if (productsToActivate.length === 0 && productsToInvalidate.length === 0) {
    onConfirm(productsToActivate, productsToInvalidate);
  }

  return (
    <ConfirmModal
      onClose={onClose}
      onConfirm={() => onConfirm(productsToInvalidate, productsToActivate)}
    >
      <p>{t('CHANGE_SETUP_WARNING')}</p>

      {productsToInvalidate.length > 0 ? (
        <>
          <p>
            <b>
              {t('PRODUCTS_INVALIDATED', {
                count: productsToInvalidate.length,
              })}
            </b>
          </p>
          <div className="tw-flex tw-flex-col tw-gap-4 tw-max-h-96 tw-overflow-y-auto">
            {productsWithErrors.map((productErrors) => (
              <ProductErrorsCard
                key={productErrors.product.id}
                productErrors={productErrors}
              />
            ))}
          </div>
        </>
      ) : null}

      {productsToActivate.length > 0 ? (
        <>
          <p>
            <b>
              {t('PRODUCTS_ACTIVATED', { count: productsToActivate.length })}
            </b>
          </p>
          <div className="tw-flex tw-flex-col tw-gap-4 tw-max-h-96 tw-overflow-y-auto">
            {productsToActivate.map((product) => (
              <Card key={product.id}>
                <CardHeader className="tw-flex-row tw-items-center tw-justify-between">
                  <CardTitle className="tw-text-md">
                    {truncate(product.name, 30)}
                  </CardTitle>
                  <Badge variant="success" className="tw-uppercase">
                    {t('VALID')}
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </>
      ) : null}
    </ConfirmModal>
  );
}
