import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  HalfWidthCenter,
  InputField,
} from '../../../../../../../../components';
import { CobotConfig } from '../../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
};

export function MetaLoaderForm({ form }: Props) {
  const t = useT();

  return (
    <HalfWidthCenter>
      <InputField
        register={() => form.register('config.META_LOADER.NUMBER_OF_DRAWERS')}
        label={t('NUMBER_OF_DRAWERS')}
      />
    </HalfWidthCenter>
  );
}
