import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  CobotConfig,
  DigitalInput,
  DigitalInputName,
  DigitalOutput,
  DigitalOutputName,
} from '../../../../../../../../../../../../core/models/cobot-config-types';
import { BaseSelect } from '../../../../../../../../../../../../shadcn';
import { parseAsNumber } from '../../../../../../../../../../../../utils/number';
import {
  findCurrentHolder,
  getInputPorts,
  getOutputPorts,
} from '../../../../../utils';

type Props = {
  kind: 'input' | 'output';
  name: DigitalInputName | DigitalOutputName;
  io: DigitalInput | DigitalOutput;
  form: UseFormReturn<CobotConfig, any, undefined>;
};

export function PortSelect({ kind, io, name, form }: Props) {
  const ports = kind === 'input' ? getInputPorts() : getOutputPorts();

  function onChange(selectedValue: string) {
    const [strType, strValue] = selectedValue.split('-');

    const value = parseAsNumber(strValue, -1);
    const type = strType === 'controller' ? 'controller' : 'flange';

    const io = { type, value } as const;

    const current = findCurrentHolder(kind, io, form.getValues());

    // If there is already a port with the next value we empty it
    if (current) {
      setFormValue(current, { type: 'controller', value: -1 });
    }

    setFormValue(name, io);
    form.trigger();
  }

  function setFormValue(
    name: DigitalInputName | DigitalOutputName,
    io: DigitalInput | DigitalOutput,
  ) {
    form.setValue(`config.${name}`, io, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  return (
    <BaseSelect
      value={`${io.type}-${io.value}`}
      onChange={(e) => onChange(e.target.value)}
      className="tw-w-32"
    >
      <option value="controller--1"></option>
      {ports.map((port) => (
        <option
          key={`${port.type}-${port.value}`}
          value={`${port.type}-${port.value}`}
        >
          {labelForPort(kind, port)}
        </option>
      ))}
    </BaseSelect>
  );
}

function labelForPort(
  kind: 'input' | 'output',
  port: DigitalOutput | DigitalOutput,
) {
  let result = '';

  if (port.type === 'flange') {
    result += 'F';
  }

  if (kind === 'input') {
    result += 'DI';
  } else {
    result += 'DO';
  }

  return (result += ' ' + port.value);
}
