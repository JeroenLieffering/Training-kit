import React from 'react';
import { CobotConfig } from '../../../core/models/cobot-config-types';
import { Product } from '../../../core/models/product-types';
import { MetaSuiteProgramState } from '../../../drl/main/types';
import { InputOutputProgressIndicator } from './components/InputOutputProgressIndicator';
import { InputProgressIndicator } from './components/InputProgressIndicator';
import { OutputProgressIndicator } from './components/OutputProgressIndicator';

type Props = {
  product: Product;
  cobotConfig: CobotConfig;
  status: MetaSuiteProgramState;
  isPlaying: boolean;
};

export function ProgressIndicator(props: Props) {
  const mode = props.product.config.IO_MODE;

  if (mode === 'INPUT') {
    return <InputProgressIndicator {...props} />;
  } else if (mode === 'OUTPUT') {
    return <OutputProgressIndicator {...props} />;
  } else {
    return <InputOutputProgressIndicator {...props} />;
  }
}
