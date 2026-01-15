import React from 'react';
import { CardDescription, SubTitle } from '../../../components';
import { Product } from '../../../core/models/product-types';
import { useFabrications } from '../../../hooks/useFabrications';
import { InfoCard } from '../InfoCard';
import { FabricationGraph } from './components/FabricationGraph';
import { FabricationStats } from './components/FabricationStats/FabricationStats';
import { ProcessFlowImage } from './components/ProcessFlowImage';
import { useT } from '../../../hooks/useT';

type Props = {
  product: Product;
};

export function ProductDetailInfo({ product }: Props) {
  const t = useT();

  const [fabrications] = useFabrications(product);

  return (
    <>
      <SubTitle>{t('INFO')}</SubTitle>

      {product.description !== '' ? (
        <CardDescription>{product.description}</CardDescription>
      ) : null}

      <FabricationGraph fabrications={fabrications} />

      <div className="tw-grid tw-gap-4 tw-grid-cols-3">
        <FabricationStats fabrications={fabrications} />

        <InfoCard title={t('PROCESS_FLOW')}>
          <ProcessFlowImage mode={product.config.IO_MODE} />
        </InfoCard>

        <InfoCard title={t('INPUT')}>
          {product.config.ROUND_PRODUCT ? (
            <p>
              {product.config.RAW_MAT_DIAMETER}x{product.config.RAW_MAT_HEIGHT}
              {t('MM')}
            </p>
          ) : (
            <p>
              {product.config.RAW_MAT_LENGTH}x{product.config.RAW_MAT_WIDTH}x
              {product.config.RAW_MAT_HEIGHT}
              {t('MM')}
            </p>
          )}
          <p>
            {product.config.RAW_MAT_WEIGHT}
            {t('KG')}
          </p>
        </InfoCard>

        <InfoCard title={t('OUTPUT')}>
          {product.config.ROUND_PRODUCT ? (
            <p>
              {product.config.FIN_PRODUCT_DIAMETER}x
              {product.config.FIN_PRODUCT_HEIGHT}
              {t('MM')}
            </p>
          ) : (
            <p>
              {product.config.FIN_PRODUCT_LENGTH}x
              {product.config.FIN_PRODUCT_WIDTH}x{product.config.RAW_MAT_HEIGHT}
              {t('MM')}
            </p>
          )}
          <p>
            {product.config.FIN_PRODUCT_WEIGHT}
            {t('KG')}
          </p>
        </InfoCard>
      </div>
    </>
  );
}
