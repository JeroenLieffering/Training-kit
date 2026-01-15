import React from 'react';
import { Product, ProductState } from '../../core/models/product-types';
import { BaseSelect } from '../../shadcn';
import { useT } from '../../hooks/useT';

type Props = {
  value: ProductState;
  onChange: (value: ProductState) => void;
  products: Product[];
};

type Option = {
  value: ProductState;
  label: string;
  show: boolean;
};

export function ProductSelectFilter({ products, value, onChange }: Props) {
  const t = useT();

  if (products.length === 0) {
    return null;
  }

  const hasDeactivatedProducts = products.some(
    (product) => product.state === 'deactivated',
  );

  const hasInvalidatedProducts = products.some(
    (product) => product.state === 'invalidated',
  );

  if (!hasDeactivatedProducts && !hasInvalidatedProducts) {
    return null;
  }

  const options: Option[] = [
    {
      value: 'active',
      label: t('SHOW_ONLY_ACTIVE_PRODUCTS'),
      show: true,
    },
    {
      value: 'deactivated',
      label: t('SHOW_ONLY_DEACTIVATED_PRODUCTS'),
      show: hasDeactivatedProducts,
    },
    {
      value: 'invalidated',
      label: t('SHOW_ONLY_INVALIDATED_PRODUCTS'),
      show: hasInvalidatedProducts,
    },
  ];

  return (
    <BaseSelect
      id="state-filter"
      value={value}
      onChange={(e) => onChange(e.target.value as ProductState)}
    >
      {options.map((option) =>
        option.show ? (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ) : null,
      )}
    </BaseSelect>
  );
}
