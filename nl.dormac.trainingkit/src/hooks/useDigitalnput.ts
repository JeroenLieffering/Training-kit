import { useEffect, useState } from 'react';
import { DigitalInput } from '../core/models/cobot-config-types';
import { useDigitalInputs, UseDigitalInputsResult } from './useDigitalnputs';

export function useDigitalInput(digitalInput: DigitalInput) {
  const inputs = useDigitalInputs();

  const [value, setValue] = useState(() => getInputValue(digitalInput, inputs));

  useEffect(() => {
    setValue(getInputValue(digitalInput, inputs));
  }, [inputs]);

  return value === 1;
}

function getInputValue(
  digitalInput: DigitalInput,
  inputs: UseDigitalInputsResult,
) {
  const index = digitalInput.value - 1;

  if (digitalInput.type === 'controller') {
    return inputs.controller[index];
  } else {
    return inputs.flange[index];
  }
}
