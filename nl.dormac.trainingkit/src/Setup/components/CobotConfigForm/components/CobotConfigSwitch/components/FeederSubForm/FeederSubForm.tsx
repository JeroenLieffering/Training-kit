import React, { useEffect } from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  HalfWidthCenter,
  RadioField,
  Title,
} from '../../../../../../../components';
import {
  EASY_LOADER_TYPES,
  META_LOADER_TYPES,
  PRO_FEEDER_TYPES,
} from '../../../../../../../config';
import {
  CobotConfig,
  FeederType,
} from '../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../hooks/useT';
import { MetaLoaderForm } from './components/MetaLoaderForm';
import { ProFeederForm } from './components/ProFeederForm';
import { EasyLoaderForm } from './components/EasyLoaderForm';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
};

// All fields that are part of this sub form, used to show warning icon.
export const FEEDER_SUB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.FEEDER',
  'config.META_LOADER.NUMBER_OF_DRAWERS',
  'config.PRO_FEEDER.NUMBER_OF_DRAWERS',
];

export function FeederSubForm({ form }: Props) {
  const t = useT();

  const feeder = form.watch('config.FEEDER');

  useEffect(() => {
    if (feeder === 'EASY_LOADER') {
      form.setValue('config.EASY_LOADER.TYPE', EASY_LOADER_TYPES[0].id);
    } else if (feeder === 'META_LOADER') {
      form.setValue('config.META_LOADER.TYPE', META_LOADER_TYPES[0].id);
    } else if (feeder === 'PRO_FEEDER') {
      form.setValue('config.PRO_FEEDER.TYPE', PRO_FEEDER_TYPES[0].id);
    }
    form.trigger();
  }, [feeder]);

  return (
    <Container>
      <Title center>{t('FEEDER')}</Title>

      <div className="tw-grid tw-gap-4">
        <HalfWidthCenter>
          <RadioField<FeederType>
            register={() => form.register('config.FEEDER')}
            label={t('FEEDER')}
            options={[
              {
                id: 'EASY_LOADER',
                value: 'EASY_LOADER',
                label: 'EasyLoader',
              },
              {
                id: 'PRO_FEEDER',
                value: 'PRO_FEEDER',
                label: 'ProFeeder',
              },
              {
                id: 'META_LOADER',
                value: 'META_LOADER',
                label: 'MetaLoader',
              },
            ]}
          />
        </HalfWidthCenter>

        {feeder === 'EASY_LOADER' ? (
          <EasyLoaderForm form={form} />
        ) : feeder === 'META_LOADER' ? (
          <MetaLoaderForm form={form} />
        ) : (
          <ProFeederForm form={form} />
        )}
      </div>
    </Container>
  );
}
