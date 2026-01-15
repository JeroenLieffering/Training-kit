import React from 'react';
import { CobotConfig } from '../../../../../../../core/models/cobot-config-types';
import { Product } from '../../../../../../../core/models/product-types';
import { HintMode } from '../../types';
import { RawDiameterHint } from '../RawDiameterHint';
import { RawHeightHint } from '../RawHeightHint';
import { RawLengthHint } from '../RawLengthHint';
import { RawWeightHint } from '../RawWeightHint';
import { RawWidthHint } from '../RawWidthHint';
import { CobotInfo } from '../../../../../../../types';

type Props = {
  hintMode: HintMode;
  cobotConfig: CobotConfig;
  cobotInfo: CobotInfo;
  product: Product;
};

export function RawHint({ hintMode, cobotConfig, cobotInfo, product }: Props) {
  if (hintMode === 'DIAMETER') {
    return <RawDiameterHint cobotConfig={cobotConfig} product={product} />;
  } else if (hintMode === 'HEIGHT') {
    return <RawHeightHint cobotConfig={cobotConfig} />;
  } else if (hintMode === 'LENGTH') {
    return <RawLengthHint cobotConfig={cobotConfig} product={product} />;
  } else if (hintMode === 'WEIGHT') {
    return <RawWeightHint cobotConfig={cobotConfig} cobotInfo={cobotInfo} />;
  } else {
    return <RawWidthHint cobotConfig={cobotConfig} product={product} />;
  }
}
