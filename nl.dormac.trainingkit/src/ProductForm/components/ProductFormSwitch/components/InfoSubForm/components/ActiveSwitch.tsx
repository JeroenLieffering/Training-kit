import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label, Switch } from '../../../../../../components';
import {
  Product,
  ProductState,
} from '../../../../../../core/models/product-types';
import {
  BaseFormDescription,
  BaseFormItem,
  BaseFormMessage,
} from '../../../../../../shadcn';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
};

export function ActiveSwitch({ form }: Props) {
  const t = useT();

  const field = form.register('state');

  const value = form.watch(field.name);

  async function toggle() {
    const nextValue: ProductState =
      value === 'active' ? 'deactivated' : 'active';

    form.setValue(field.name, nextValue, {
      shouldValidate: true,
      shouldDirty: true,
    });

    form.trigger();
  }

  return (
    <BaseFormItem name={field.name}>
      <div className="tw-flex tw-gap-2 tw-items-center">
        <Switch value={value === 'active'} onChange={toggle} />
        <Label onClick={toggle}>{t('PRODUCT_ACTIVE')}</Label>
      </div>
      <BaseFormMessage />
      <BaseFormDescription>{t('PRODUCT_ACTIVE_HELP')}</BaseFormDescription>
    </BaseFormItem>
  );
}
