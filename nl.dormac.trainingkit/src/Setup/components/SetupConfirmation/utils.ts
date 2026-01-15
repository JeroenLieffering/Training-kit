import { CobotConfig } from '../../../core/models/cobot-config-types';
import { Product } from '../../../core/models/product-types';
import {
  syncProductReachTestWithCobotConfig,
  syncProductWithCobotConfig,
} from '../../../core/services/product-service';
import { productValidator } from '../../../core/validators/product-validator';
import { CobotInfo } from '../../../types';
import { getValidationErrorsWithInfo } from '../../../utils/form';
import { ProductErrors } from './types';

type BucketProductsArgs = {
  products: Product[];
  prevCobotConfig: CobotConfig;
  nextCobotConfig: CobotConfig;
  cobotInfo: CobotInfo;
  toolWeight: number;
};

export function bucketProducts({
  cobotInfo,
  products,
  prevCobotConfig,
  nextCobotConfig,
  toolWeight,
}: BucketProductsArgs) {
  const productsToActivate: Product[] = [];
  const productsToInvalidate: Product[] = [];
  const productsWithErrors: ProductErrors[] = [];

  const clones = products.map((p) => structuredClone(p));

  for (const product of clones) {
    syncProductWithCobotConfig(product, nextCobotConfig);
    syncProductReachTestWithCobotConfig({
      product,
      nextCobotConfig,
      prevCobotConfig,
    });

    const result = productValidator(product, nextCobotConfig, cobotInfo, toolWeight);

    if (result.hasError) {
      productsWithErrors.push({
        product,
        errors: getValidationErrorsWithInfo(result.errors),
      });
    }

    if (product.state === 'invalidated') {
      if (!result.hasError) {
        productsToActivate.push(product);
      }
    } else if (product.state === 'active') {
      if (result.hasError) {
        productsToInvalidate.push(product);
      }
    }
  }

  return { productsToActivate, productsToInvalidate, productsWithErrors };
}
