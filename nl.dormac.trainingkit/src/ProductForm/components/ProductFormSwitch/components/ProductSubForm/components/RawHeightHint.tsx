import React from 'react';

import { CobotConfig } from '../../../../../../core/models/cobot-config-types';
import { getBoundsRawMaterialHeight } from '../../../../../../core/services/product-service';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  cobotConfig: CobotConfig;
};

export function RawHeightHint({ cobotConfig }: Props) {
  const t = useT();

  const { min, max, minReason, maxReason } =
    getBoundsRawMaterialHeight(cobotConfig);

  return (
    <dl className="tw-grid tw-gap-2">
      <div className="tw-grid tw-gap-1">
        <dt>
          <b>{t('MIN_HEIGHT_RAW_MATERIAL')}</b>: {min}
          {t('mm')}
        </dt>
        <dd>
          {t(`MIN_HEIGHT_RAW_MATERIAL_REASON_${minReason}`, { value: min })}
        </dd>
      </div>

      <div className="tw-grid tw-gap-1">
        <dt>
          <b>{t('MAX_HEIGHT_RAW_MATERIAL')}</b>: {max}
          {t('mm')}
        </dt>
        <dd>
          {t(`MAX_HEIGHT_RAW_MATERIAL_REASON_${maxReason}`, { value: max })}
        </dd>
      </div>
    </dl>
  );
}
