import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import { Alert, Container, Debug, Title } from '../../../../components';
import { Product } from '../../../../core/models/product-types';
import { ValidationErrorWithInfo } from '../../../../core/validators/validators';
import { getValidationErrorsWithInfo } from '../../../../utils/form';
import { useValidateOnMount } from '../../../../hooks/useValidateOnMount';
import {
  DRAWER_SUB_FORM_FIELDS,
  getDrawerSubFormTabForField,
} from './DrawerSubForm';
import {
  getGripperSubFormTabForField,
  GRIPPER_SUB_FORM_FIELDS,
} from './GripperSubForm/GripperSubForm';
import { INFO_SUB_FORM_FIELDS } from './InfoSubForm/InfoSubForm';
import {
  getMachineSubFormTabForField,
  MACHINE_SUB_FORM_FIELDS,
} from './MachineSubForm/MachineSubForm';
import { PROCESS_FLOW_SUB_FORM_FIELDS } from './ProcessFlowSubForm/ProcessFlowSubForm';
import { PRODUCT_SUB_FORM_FIELDS } from './ProductSubForm/ProductSubForm';
import { ProductFormSubPage } from '../../../types';
import { useT } from '../../../../hooks/useT';
import {
  getSecondDrawerSubFormTabForField,
  SECOND_DRAWER_SUB_FORM_FIELDS,
} from './SecondDrawerSubForm';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
  setSubPage: (subPage: ProductFormSubPage) => void;
};

export function ErrorsOverview({ form, setSubPage }: Props) {
  const t = useT();

  useValidateOnMount(form);

  const errors = getValidationErrorsWithInfo(form.formState.errors);

  function onErrorClicked(error: ValidationErrorWithInfo) {
    const name = error.name as Path<Product>;

    if (INFO_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({ page: 'INFO' });
    } else if (PROCESS_FLOW_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({ page: 'PROCESS_FLOW' });
    } else if (PRODUCT_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({ page: 'PRODUCT' });
    } else if (MACHINE_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({ page: 'MACHINE', tab: getMachineSubFormTabForField(name) });
    } else if (GRIPPER_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({ page: 'GRIPPER', tab: getGripperSubFormTabForField(name) });
    } else if (DRAWER_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({ page: 'DRAWER', 'tab': getDrawerSubFormTabForField(name) });
    } else if (SECOND_DRAWER_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({
        page: 'SECOND_DRAWER',
        'tab': getSecondDrawerSubFormTabForField(name),
      });
    }
  }

  return (
    <Container>
      <Title center>{t('ERRORS_TITLE')}</Title>

      <p>{t('PRODUCT_CONTAINS_ERRORS_MESSAGE')}</p>

      {errors.map((error) => (
        <Alert
          key={error.type}
          variant="destructive"
          title={t(error.type, { ...error, name: t(error.label) })}
          onClick={() => onErrorClicked(error)}
        />
      ))}

      <Debug value={form.formState.errors} />
    </Container>
  );
}
