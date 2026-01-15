import { t } from 'i18next';
import React from 'react';
import {
  getBoundsRawMaterialDiameter,
  getBoundsRawMaterialHeight,
  getBoundsRawMaterialLength,
  getBoundsRawMaterialWidth,
} from '../../../../../../../core/services/product-service';
import { MinMaxHint } from './components/MinMaxHint';
import { Product } from '../../../../../../../core/models/product-types';
import { CobotConfig } from '../../../../../../../core/models/cobot-config-types';
import rectImage from './images/rect.png';
import roundImage from './images/round.png';

type Props = {
  cobotConfig: CobotConfig;
  product: Product;
};

export function RoundRectHint({ cobotConfig, product }: Props) {
  return (
    <>
      {product.config.ROUND_PRODUCT ? (
        <div className="tw-grid tw-gap-2 tw-place-items-center">
          <div>
            <div>
              A. {t('DIAMETER')} -{' '}
              <MinMaxHint
                {...getBoundsRawMaterialDiameter(cobotConfig, product)}
              />
              {t('MM')}
            </div>
            <div>
              B. {t('HEIGHT')} -{' '}
              <MinMaxHint {...getBoundsRawMaterialHeight(cobotConfig)} />
              {t('MM')}
            </div>
          </div>
          <img src={roundImage} width={600 / 1.5} height={280 / 1.5} />
        </div>
      ) : (
        <div className="tw-grid tw-gap-2 tw-place-items-center">
          <div>
            <div>
              A. {t('LENGTH')} -{' '}
              <MinMaxHint
                {...getBoundsRawMaterialLength(cobotConfig, product)}
              />
              {t('MM')}
            </div>
            <div>
              B. {t('WIDTH')} -{' '}
              <MinMaxHint
                {...getBoundsRawMaterialWidth(cobotConfig, product)}
              />
              {t('MM')}
            </div>
            <div>
              C. {t('HEIGHT')} -{' '}
              <MinMaxHint {...getBoundsRawMaterialHeight(cobotConfig)} />
              {t('MM')}
            </div>
          </div>
          <img src={rectImage} width={600 / 1.5} height={280 / 1.5} />
        </div>
      )}
    </>
  );
}
