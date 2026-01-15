import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  HalfWidthCenter,
  SwitchField,
} from '../../../../../../../../components';
import { CobotConfig } from '../../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
};

export function EasyLoaderForm({ form }: Props) {
  const t = useT();

  return (
    <HalfWidthCenter>
      <SwitchField
        register={() => form.register('config.EASY_LOADER.HAS_SECOND_DRAWER')}
        label={t('HAS_SECOND_DRAWER')}
      />
    </HalfWidthCenter>
  );
}
