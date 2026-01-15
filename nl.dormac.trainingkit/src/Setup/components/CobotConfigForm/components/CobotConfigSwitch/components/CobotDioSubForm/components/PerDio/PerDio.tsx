import React from 'react';
import { UseFormReturn, Path } from 'react-hook-form';
import { CobotConfig } from '../../../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../../../hooks/useT';
import { getPortsAndValues } from '../../utils';
import { DigitalCard } from './components/DigitalCard';
import { DigitalIOColumn } from './components/DigitalIOColumn';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
};

export const PER_DIO_TAB_FORM_FIELDS: Path<CobotConfig>[] = [];

export function PerDio({ form }: Props) {
  const t = useT();

  const cobotConfig = form.getValues();

  const { cdi, cdo, fdi, fdo } = getPortsAndValues(cobotConfig);

  return (
    <div className="tw-grid tw-grid-cols-2 tw-gap-4">
      <DigitalIOColumn
        controllerLabel={t('CONTROLLER_DIGITAL_INPUT')}
        controllerList={
          <>
            {cdi.map((ioConfig) => (
              <li key={ioConfig.port}>
                <DigitalCard name="DI" ioConfig={ioConfig} form={form} />
              </li>
            ))}
          </>
        }
        flangeLabel={t('FLANGE_DIGITAL_INPUT')}
        flangeList={
          <>
            {fdi.map((ioConfig) => (
              <li key={ioConfig.port}>
                <DigitalCard name="FDI" ioConfig={ioConfig} form={form} />
              </li>
            ))}
          </>
        }
      />

      <DigitalIOColumn
        controllerLabel={t('CONTROLLER_DIGITAL_OUTPUT')}
        controllerList={
          <>
            {cdo.map((ioConfig) => (
              <li key={ioConfig.port}>
                <DigitalCard name="DO" ioConfig={ioConfig} form={form} />
              </li>
            ))}
          </>
        }
        flangeLabel={t('FLANGE_DIGITAL_OUTPUT')}
        flangeList={
          <>
            {fdo.map((ioConfig) => (
              <li key={ioConfig.port}>
                <DigitalCard name="FDO" ioConfig={ioConfig} form={form} />
              </li>
            ))}
          </>
        }
      />
    </div>
  );
}
