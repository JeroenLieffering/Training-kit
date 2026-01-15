import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import { Alert, Container, Debug, Title } from '../../../../../../components';
import { CobotConfig } from '../../../../../../core/models/cobot-config-types';
import { ValidationErrorWithInfo } from '../../../../../../core/validators/validators';
import { useT } from '../../../../../../hooks/useT';
import { useValidateOnMount } from '../../../../../../hooks/useValidateOnMount';
import { getValidationErrorsWithInfo } from '../../../../../../utils/form';
import { SetupSubPage } from '../../../../../types';
import { COBOT_DIO_SUB_FORM_FIELDS } from './CobotDioSubForm/CobotDioSubForm';
import {
  COBOT_DRAWER_SUB_FORM_FIELDS,
  getCobotDrawerSubFormTabForField,
} from './CobotDrawerSubForm';
import {
  COBOT_GRIPPER_SUB_FORM_FIELDS,
  getCobotGripperSubFormTabForField,
} from './CobotGripperSubForm';
import {
  COBOT_MACHINE_SUB_FORM_FIELDS,
  getCobotMachineSubFormTabForField,
} from './CobotMachineSubForm/CobotMachineSubForm';
import {
  COBOT_SECOND_DRAWER_SUB_FORM_FIELDS,
  getCobotSecondDrawerSubFormTabForField,
} from './CobotSecondDrawerSubForm';
import { COBOT_SUB_FORM_FIELDS } from './CobotSubForm/CobotSubForm';
import { FEEDER_SUB_FORM_FIELDS } from './FeederSubForm/FeederSubForm';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  setSubPage: (subPage: SetupSubPage) => void;
};

export function CobotErrorsOverview({ form, setSubPage }: Props) {
  const t = useT();

  useValidateOnMount(form);

  const errors = getValidationErrorsWithInfo(form.formState.errors);

  function onErrorClicked(error: ValidationErrorWithInfo) {
    const name = error.name as Path<CobotConfig>;

    if (COBOT_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({
        page: 'COBOT',
      });
    } else if (
      COBOT_MACHINE_SUB_FORM_FIELDS.includes(name) ||
      name.startsWith('config.MACHINE_PICK_POSITIONS') ||
      name.startsWith('config.MACHINE_PLACE_POSITIONS')
    ) {
      setSubPage({
        page: 'MACHINE',
        tab: getCobotMachineSubFormTabForField(name),
      });
    } else if (COBOT_GRIPPER_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({
        page: 'GRIPPER',
        tab: getCobotGripperSubFormTabForField(name),
      });
    } else if (FEEDER_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({ page: 'FEEDER' });
    } else if (COBOT_DIO_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({ page: 'DIO', tab: 'PER_ACTION' });
    } else if (COBOT_DRAWER_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({
        page: 'DRAWER',
        tab: getCobotDrawerSubFormTabForField(name),
      });
    } else if (COBOT_SECOND_DRAWER_SUB_FORM_FIELDS.includes(name)) {
      setSubPage({
        page: 'SECOND_DRAWER',
        tab: getCobotSecondDrawerSubFormTabForField(name),
      });
    } else if (name.startsWith('config.DROP_OFF_POSITION')) {
      const index = name.split('.')[2];
      setSubPage({
        page: 'DROP_OFF_POSITIONS',
        index,
      });
    } else if (name.startsWith('config.STATIC_GRID')) {
      const index = name.split('.')[2];

      setSubPage({
        page: 'STATIC_GRIDS',
        index,
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
