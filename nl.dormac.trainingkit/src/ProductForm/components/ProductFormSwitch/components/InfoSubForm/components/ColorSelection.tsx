import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { UseFormReturn } from 'react-hook-form';
import { Card, Label } from '../../../../../../components';
import {
  Product,
  PRODUCT_COLORS,
} from '../../../../../../core/models/product-types';
import { BaseFormItemWrapper } from '../../../../../../shadcn';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
};

export function ColorSelection({ form }: Props) {
  const t = useT();

  const field = form.register('color');

  const value = form.watch(field.name);

  function onChange(color: string) {
    form.setValue(field.name, color, {
      shouldValidate: true,
      shouldDirty: true,
    });
    form.trigger();
  }

  return (
    <BaseFormItemWrapper>
      <Label>{t('PRODUCT_COLOR')}</Label>

      <div className="tw-grid tw-grid-cols-9 tw-gap-4">
        {PRODUCT_COLORS.map((color: string) => (
          <Option
            key={color}
            color={color}
            selected={value === color}
            onClick={onChange}
          />
        ))}
      </div>
    </BaseFormItemWrapper>
  );
}

function Option({
  selected,
  color,
  onClick,
}: {
  selected: boolean;
  color: string;
  onClick: (color: string) => void;
}) {
  return (
    <button type="button" onClick={() => onClick(color)}>
      <Card
        className="tw-flex tw-justify-end tw-items-end tw-w-12 tw-h-12"
        style={{ backgroundColor: color }}
      >
        {selected ? (
          <CheckCircleOutlineIcon className="tw-h-6 tw-w-6 tw-text-white tw-m-1" />
        ) : undefined}
      </Card>
    </button>
  );
}
