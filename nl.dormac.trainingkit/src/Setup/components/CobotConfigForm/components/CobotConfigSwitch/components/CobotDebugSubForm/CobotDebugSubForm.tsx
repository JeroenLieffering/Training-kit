import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  HalfWidthCenter,
  InputField,
  SubTitle,
  SwitchField,
  Separator,
  Title,
} from '../../../../../../../components';
import { CobotConfig } from '../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
};

// All fields that are part of this sub form, used to show warning icon.
export const COBOT_DEBUG_SUB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.DEBUG_CONSTANTLY_LOOP_PROGRAM',
  'config.DEBUG_WAIT_FOR_MACHINE_CALL',
  'config.DEBUG_WAIT_FOR_MACHINE_DOOR',
];

export function CobotDebugSubForm({ form }: Props) {
  const t = useT();

  return (
    <Container>
      <Title center>{t('DEBUG_FORM')}</Title>

      <HalfWidthCenter>
        <SubTitle>{t('MACHINE_SIGNAL')}</SubTitle>
        <SwitchField
          register={() => form.register('config.DEBUG_WAIT_FOR_MACHINE_CALL')}
          label={t('DEBUG_MACHINE_CALL')}
        />
      </HalfWidthCenter>

      <Separator orientation="horizontal" />

      <HalfWidthCenter>
        <SubTitle>{t('MACHINE_DOOR')}</SubTitle>
        <SwitchField
          register={() => form.register('config.DEBUG_WAIT_FOR_MACHINE_DOOR')}
          label={t('DEBUG_MACHINE_DOOR')}
        />
      </HalfWidthCenter>

      <Separator orientation="horizontal" />

      <HalfWidthCenter>
        <SubTitle>{t('CONTINUOS_LOOP')}</SubTitle>
        <SwitchField
          register={() => form.register('config.DEBUG_CONSTANTLY_LOOP_PROGRAM')}
          label={t('DEBUG_PROGRAM_CONTINUOS_LOOP')}
        />
      </HalfWidthCenter>
    </Container>
  );
}
