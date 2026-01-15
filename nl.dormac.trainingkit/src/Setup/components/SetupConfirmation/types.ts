import { Product } from '../../../core/models/product-types';
import { ValidationErrorWithInfo } from '../../../core/validators/validators';

export type ProductErrors = {
  product: Product;
  errors: ValidationErrorWithInfo[];
};
