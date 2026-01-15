import {
  GpioControlBoxDigitalIndex,
  GpioFlangeDigitalIndex,
  GpioTypeIndex,
} from 'dart-api';
import { useEffect, useState } from 'react';
import { DigitalOutput } from '../core/models/cobot-config-types';
import { useCommunicationManager } from './useCommunicationManager';
import {
  useDigitalOutputs,
  UseDigitalOutputsResult,
} from './useDigitalOutputs';

export function useDigitalOutput(digitalOutput: DigitalOutput) {
  const communicationManager = useCommunicationManager();

  const outputs = useDigitalOutputs();

  const [value, setValue] = useState(() =>
    getOutputValue(digitalOutput, outputs),
  );

  useEffect(() => {
    setValue(getOutputValue(digitalOutput, outputs));
  }, [outputs]);

  function set(signal: boolean) {
    const index = (digitalOutput.value - 1) as
      | GpioControlBoxDigitalIndex
      | GpioFlangeDigitalIndex;

    const type =
      digitalOutput.type === 'controller'
        ? GpioTypeIndex.CONTROLLER
        : GpioTypeIndex.FLANGE;

    return communicationManager.dio.setDigitalOutput(type, index, signal);
  }

  return [value === 1, set] as const;
}

function getOutputValue(
  digitalOutput: DigitalOutput,
  outputs: UseDigitalOutputsResult,
) {
  const index = digitalOutput.value - 1;

  if (digitalOutput.type === 'controller') {
    return outputs.controller[index];
  } else {
    return outputs.flange[index];
  }
}
