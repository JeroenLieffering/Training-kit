import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, IconButton } from '../../../../../../../../../../components';
import {
  CobotConfig,
  DigitalInputName,
  DigitalOutputName,
} from '../../../../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../../../../hooks/useT';
import { DIConfig, DOConfig } from '../../../types';
import { calcNext, calcPrev, findCurrentHolder } from '../../../utils';

type Props = {
  name: string;
  ioConfig: DOConfig | DIConfig;
  form: UseFormReturn<CobotConfig, any, undefined>;
};

export function DigitalCard({ name, ioConfig, form }: Props) {
  const t = useT();

  function onDownClicked() {
    if (ioConfig.value) {
      const next = calcNext({ ...ioConfig });

      const current = findCurrentHolder(
        next.kind,
        { type: next.type, value: next.port },
        form.getValues(),
      );

      // If there is already a port with the next value we swap it
      if (current) {
        setFormValue(current, ioConfig);
      }

      setFormValue(ioConfig.value, next);
      form.trigger();
    }
  }

  function onUpClicked() {
    if (ioConfig.value) {
      const prev = calcPrev({ ...ioConfig });

      const current = findCurrentHolder(
        prev.kind,
        { type: prev.type, value: prev.port },
        form.getValues(),
      );

      // If there is already a port with the prev value we swap it.
      if (current) {
        setFormValue(current, ioConfig);
      }

      // Set the new values
      setFormValue(ioConfig.value, prev);
      form.trigger();
    }
  }

  function setFormValue(
    name: DigitalInputName | DigitalOutputName,
    ioConfig: DOConfig | DIConfig,
  ) {
    form.setValue(
      `config.${name}`,
      { type: ioConfig.type, value: ioConfig.port },
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  }

  return (
    <Card className="tw-p-2 tw-flex tw-justify-between tw-items-center tw-h-14">
      <b>
        {name} {ioConfig.port}
      </b>{' '}
      <span className="tw-flex tw-items-center tw-gap-1">
        {ioConfig.value ? t(ioConfig.value) : null}

        {ioConfig.value ? (
          <>
            <IconButton
              icon={ArrowUpwardIcon}
              onClick={onUpClicked}
              disabled={ioConfig.type === 'controller' && ioConfig.port === 1}
              className="tw-px-1"
            />
            <IconButton
              icon={ArrowDownwardIcon}
              onClick={onDownClicked}
              disabled={ioConfig.type === 'flange' && ioConfig.port === 6}
              className="tw-px-1"
            />
          </>
        ) : null}
      </span>
    </Card>
  );
}
