import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, Label, ProductIconView } from '../../../../../../components';
import {
  Product,
  PRODUCT_ICONS,
  ProductIcon,
} from '../../../../../../core/models/product-types';
import { BaseFormItemWrapper } from '../../../../../../shadcn';
import { cn } from '../../../../../../shadcn/utils/cn';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
};

export function IconSelection({ form }: Props) {
  const t = useT();

  const field = form.register('icon');

  const value = form.watch(field.name);

  function onChange(icon: ProductIcon) {
    form.setValue(field.name, icon, {
      shouldValidate: true,
      shouldDirty: true,
    });
    form.trigger();
  }

  return (
    <BaseFormItemWrapper>
      <Label>{t('PRODUCT_ICON')}</Label>

      <div className="tw-grid tw-grid-cols-9 tw-gap-4">
        {PRODUCT_ICONS.map((icon) => (
          <Option
            key={icon}
            icon={icon}
            selected={value === icon}
            onClick={onChange}
          />
        ))}
      </div>
    </BaseFormItemWrapper>
  );
}

function Option({
  selected,
  icon,
  onClick,
}: {
  selected: boolean;
  icon: ProductIcon;
  onClick: (icon: ProductIcon) => void;
}) {
  return (
    <button type="button" onClick={() => onClick(icon)}>
      <Card
        className={cn(
          'tw-w-12 tw-h-12 tw-grid tw-gap-1 tw-p-1',
          selected ? 'tw-border-primary tw-border-2' : 'tw-opacity-40',
        )}
      >
        <div className="tw-flex tw-justify-center tw-items-center">
          <ProductIconView icon={icon} size="xs" />
        </div>
      </Card>
    </button>
  );
}
