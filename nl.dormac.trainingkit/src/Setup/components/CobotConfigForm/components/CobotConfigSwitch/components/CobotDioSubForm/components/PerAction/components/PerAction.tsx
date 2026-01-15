import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import { CobotConfig } from '../../../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../../../hooks/useT';
import { relevantDigitalInputs, relevantDigitalOutputs } from '../../utils';
import { IOAction } from './components/IOAction/IOAction';
import { SubTitle } from '../../../../../../../../../components';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
};

export const PER_ACTION_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.DO_GRIPPER1_OPEN',
  'config.DO_GRIPPER1_CLOSE',
  'config.DO_GRIPPER2_OPEN',
  'config.DO_GRIPPER2_CLOSE',
  'config.DO_AIRPURGE',
  'config.DO_MAIN_SPINDLE_OPEN',
  'config.DO_MAIN_SPINDLE_CLOSE',
  'config.DO_SUB_SPINDLE_OPEN',
  'config.DO_SUB_SPINDLE_CLOSE',
  'config.DO_REQUEST_NEW_DRAWER',
  'config.DO_RUN_MACHINE',
  'config.DO_SEND_ALERT',

  'config.DI_GRIPPER1_IS_OPENED',
  'config.DI_GRIPPER1_IS_CLOSED',
  'config.DI_GRIPPER2_IS_OPENED',
  'config.DI_GRIPPER2_IS_CLOSED',
  'config.DI_DOOR_IS_OPENED',
  'config.DI_MAIN_SPINDLE_IS_OPENED',
  'config.DI_MAIN_SPINDLE_IS_CLOSED',
  'config.DI_SUB_SPINDLE_IS_OPENED',
  'config.DI_SUB_SPINDLE_IS_CLOSED',
  'config.DI_NEW_DRAWER_IS_REQUESTED',
  'config.DI_COBOT_IS_CALLED',
  'config.DI_COBOT_CAN_CONTROL_MACHINE',
];

export function PerAction({ form }: Props) {
  const t = useT();

  const cobotConfig = form.getValues();

  return (
    <div className="tw-grid tw-grid-cols-2 tw-gap-4">
      <div className="tw-grid tw-gap-2 tw-items-start">
        <SubTitle>{t('INPUT')}</SubTitle>
        {relevantDigitalInputs(cobotConfig).map((name) => (
          <IOAction key={name} kind="input" name={name} form={form} />
        ))}
      </div>

      <div className="tw-grid tw-gap-2 tw-items-start">
        <SubTitle>{t('OUTPUT')}</SubTitle>
        {relevantDigitalOutputs(cobotConfig).map((name) => (
          <IOAction key={name} kind="output" name={name} form={form} />
        ))}
      </div>
    </div>
  );
}
