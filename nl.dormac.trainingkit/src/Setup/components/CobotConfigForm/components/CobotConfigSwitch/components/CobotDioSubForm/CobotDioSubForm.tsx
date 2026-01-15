import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import { Container, Tabs, Title } from '../../../../../../../components';
import { CobotConfig } from '../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../hooks/useT';
import {
  getValidationErrorsWithInfo,
  makeHasError,
} from '../../../../../../../utils/form';
import {
  PER_ACTION_TAB_FORM_FIELDS,
  PerAction,
} from './components/PerAction/PerAction';
import { PER_DIO_TAB_FORM_FIELDS, PerDio } from './components/PerDio/PerDio';

export type CobotDioSubFormTab = 'PER_ACTION' | 'PER_DIO';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  tab: CobotDioSubFormTab;
};

// All fields that are part of this sub form, used to show warning icon.
export const COBOT_DIO_SUB_FORM_FIELDS: Path<CobotConfig>[] = [
  ...PER_ACTION_TAB_FORM_FIELDS,
  ...PER_DIO_TAB_FORM_FIELDS,
];

export function CobotDioSubForm({ form, tab }: Props) {
  const t = useT();

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const hasError = makeHasError<CobotConfig>(errors);

  return (
    <Container>
      <Title center>{t('DIGITAL_IO')}</Title>

      <Tabs
        initialTab={tab}
        tabs={[
          {
            id: 'PER_ACTION',
            label: t('PER_ACTION'),
            warning: hasError(PER_ACTION_TAB_FORM_FIELDS),
            content() {
              return <PerAction form={form} />;
            },
          },
          {
            id: 'PER_DIO',
            label: t('PER_DIO'),
            warning: hasError(PER_DIO_TAB_FORM_FIELDS),
            content() {
              return <PerDio form={form} />;
            },
          },
        ]}
      />
    </Container>
  );
}
