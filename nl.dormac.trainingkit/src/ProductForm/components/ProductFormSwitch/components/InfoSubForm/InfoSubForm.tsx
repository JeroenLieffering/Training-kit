import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  InputField,
  Separator,
  TextareaField,
  Title,
} from '../../../../../components';
import { HalfWidthCenter } from '../../../../../components/HalfWidthCenter';
import { Product } from '../../../../../core/models/product-types';
import { useValidateOnMount } from '../../../../../hooks/useValidateOnMount';
import { ProductFormMode } from '../../../../types';
import { ActiveSwitch } from './components/ActiveSwitch';
import { ColorSelection } from './components/ColorSelection';
import { CopyProductButton } from './components/CopyProductButton';
import { IconSelection } from './components/IconSelection';
import { DeleteProductButton } from './components/DeleteProductButton';
import { useT } from '../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
  mode: ProductFormMode;
};

// All fields that are part of this sub form, used to show warning icon.
export const INFO_SUB_FORM_FIELDS: Path<Product>[] = [
  'name',
  'description',
  'color',
  'icon',
  'state',
];

export function InfoSubForm({ form, mode }: Props) {
  const t = useT();

  useValidateOnMount(form);

  return (
    <Container>
      <Title center>{t('INFO')}</Title>

      <HalfWidthCenter>
        <InputField
          register={() => form.register('name')}
          type="text"
          label={t('PRODUCT_NAME')}
        />

        <TextareaField
          register={() => form.register('description')}
          label={t('PRODUCT_DESCRIPTION')}
        />

        {form.getValues().state !== 'invalidated' ? (
          <ActiveSwitch form={form} />
        ) : null}

        <IconSelection form={form} />

        <ColorSelection form={form} />

        {mode === 'EDIT' ? (
          <>
            <Separator orientation="horizontal" />
            <CopyProductButton form={form} />
            <DeleteProductButton form={form} />{' '}
          </>
        ) : null}
      </HalfWidthCenter>
    </Container>
  );
}
