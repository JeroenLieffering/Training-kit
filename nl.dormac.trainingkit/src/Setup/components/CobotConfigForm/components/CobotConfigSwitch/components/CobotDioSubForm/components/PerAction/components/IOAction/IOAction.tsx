import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  CobotConfig,
  DigitalInputName,
  DigitalOutputName,
} from '../../../../../../../../../../../core/models/cobot-config-types';
import {
  getValidationErrorsWithInfo,
  makeHasError,
} from '../../../../../../../../../../../utils/form';
import { PortSelect } from './components/PortSelect';
import { Card } from '../../../../../../../../../../../components';
import { useT } from '../../../../../../../../../../../hooks/useT';

type Props = {
  kind: 'input' | 'output';
  name: DigitalInputName | DigitalOutputName;
  form: UseFormReturn<CobotConfig, any, undefined>;
};

export function IOAction({ kind, form, name }: Props) {
  const t = useT();

  const cobotConfig = form.getValues();

  const digitalInput = cobotConfig.config[name];

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const hasError = makeHasError<CobotConfig>(errors);

  const ioError = hasError([`config.${name}`]);

  return (
    <Card className="tw-p-2 tw-flex tw-justify-between tw-items-center tw-h-14">
      <b className={ioError ? 'tw-text-destructive' : undefined}>{t(name)}</b>{' '}
      <PortSelect kind={kind} name={name} io={digitalInput} form={form} />
    </Card>
  );
}
