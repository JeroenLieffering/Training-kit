import React from 'react';
import { CobotConfig } from '../../../../../../core/models/cobot-config-types';
import { Product } from '../../../../../../core/models/product-types';
import { getBoundsRawMaterialLength } from '../../../../../../core/services/product-service';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  cobotConfig: CobotConfig;
  product: Product;
};

export function RawLengthHint({ cobotConfig, product }: Props) {
  const t = useT();

  const { min, max, minReason, maxReason } = getBoundsRawMaterialLength(
    cobotConfig,
    product,
  );

  return (
    <dl className="tw-grid tw-gap-2">
      <div className="tw-grid tw-gap-1">
        <dt>
          <b>{t('MIN_LENGTH_RAW_MATERIAL')}</b>: {min}
          {t('mm')}
        </dt>
        <dd>
          {t(`MIN_LENGTH_RAW_MATERIAL_REASON_${minReason}`, { value: min })}
        </dd>
      </div>

      <div className="tw-grid tw-gap-1">
        <dt>
          <b>{t('MAX_LENGTH_RAW_MATERIAL')}</b>: {max}
          {t('mm')}
        </dt>
        <dd>
          {t(`MAX_LENGTH_RAW_MATERIAL_REASON_${maxReason}`, { value: max })}
        </dd>
      </div>
    </dl>
  );
}
