import React from 'react';
import { Alert } from '../../../../components';
import { Product } from '../../../../core/models/product-types';
import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { shouldShowCobotMayCollideMessage } from '../../../../core/services/product-service';
import { useT } from '../../../../hooks/useT';

type Props = {
  cobotConfig: CobotConfig;
  product: Product;
};

export function FabricationWarnings({ cobotConfig, product }: Props) {
  const t = useT();

  if (shouldShowCobotMayCollideMessage(cobotConfig, product)) {
    return <Alert title={t('COLLISION_WARNING')} variant="warning" />;
  }

  return null;
}
