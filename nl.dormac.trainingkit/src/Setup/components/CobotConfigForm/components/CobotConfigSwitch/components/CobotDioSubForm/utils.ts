import {
  CobotConfig,
  ControllerIO,
  DIGITAL_INPUTS,
  DIGITAL_OUTPUTS,
  DigitalInput,
  DigitalInputName,
  DigitalOutput,
  DigitalOutputName,
  FlangeIO,
} from '../../../../../../../core/models/cobot-config-types';
import { isConfiguredWithSupportForMultipleDrawers } from '../../../../../../../core/services/cobot-config-service';
import { range } from '../../../../../../../utils/array';
import { DIConfig, DOConfig } from './types';

export function relevantDigitalInputs(cobotConfig: CobotConfig) {
  const ignored: DigitalInputName[] = [];

  if (!cobotConfig.config.MACHINE_HAS_SUB_SPINDLE) {
    ignored.push('DI_SUB_SPINDLE_IS_CLOSED');
    ignored.push('DI_SUB_SPINDLE_IS_OPENED');
  }

  if (!cobotConfig.config.HAS_SECOND_GRIPPER) {
    ignored.push('DI_GRIPPER2_IS_OPENED');
    ignored.push('DI_GRIPPER2_IS_CLOSED');
  }

  if (!isConfiguredWithSupportForMultipleDrawers(cobotConfig)) {
    ignored.push('DI_NEW_DRAWER_IS_REQUESTED');
  }

  return DIGITAL_INPUTS.filter((name) => !ignored.includes(name));
}

export function relevantDigitalOutputs(cobotConfig: CobotConfig) {
  const ignored: DigitalOutputName[] = [];

  if (!cobotConfig.config.MACHINE_HAS_SUB_SPINDLE) {
    ignored.push('DO_SUB_SPINDLE_OPEN');
    ignored.push('DO_SUB_SPINDLE_CLOSE');
  }

  if (!cobotConfig.config.HAS_SECOND_GRIPPER) {
    ignored.push('DO_GRIPPER2_OPEN');
    ignored.push('DO_GRIPPER2_CLOSE');
  }

  if (!isConfiguredWithSupportForMultipleDrawers(cobotConfig)) {
    ignored.push('DO_REQUEST_NEW_DRAWER');
  }

  return DIGITAL_OUTPUTS.filter((name) => !ignored.includes(name));
}

export function getPortsAndValues(cobotConfig: CobotConfig) {
  const cdi: DIConfig[] = range(16).map((port) => ({
    port,
    type: 'controller',
    kind: 'input',
  }));
  const cdo: DOConfig[] = range(16).map((port) => ({
    port,
    type: 'controller',
    kind: 'output',
  }));
  const fdi: DIConfig[] = range(6).map((port) => ({
    port,
    type: 'flange',
    kind: 'input',
  }));
  const fdo: DOConfig[] = range(6).map((port) => ({
    port,
    type: 'flange',
    kind: 'output',
  }));

  for (const name of relevantDigitalInputs(cobotConfig)) {
    const digitalInput = cobotConfig.config[name];

    if (digitalInput.value !== -1) {
      if (digitalInput.type === 'controller') {
        cdi[digitalInput.value - 1].value = name;
      } else {
        fdi[digitalInput.value - 1].value = name;
      }
    }
  }

  for (const name of relevantDigitalOutputs(cobotConfig)) {
    const digitalOutput = cobotConfig.config[name];

    if (digitalOutput.value !== -1) {
      if (digitalOutput.type === 'controller') {
        cdo[digitalOutput.value - 1].value = name;
      } else {
        fdo[digitalOutput.value - 1].value = name;
      }
    }
  }

  return { cdi, cdo, fdi, fdo };
}

export function calcNext(ioConfig: DIConfig | DOConfig) {
  const next = { ...ioConfig };

  if (ioConfig.type === 'controller' && ioConfig.port === 16) {
    next.type = 'flange';
    next.port = 1;
  } else {
    next.port += 1;
  }

  return next;
}

export function calcPrev(ioConfig: DIConfig | DOConfig) {
  const prev = { ...ioConfig };

  if (ioConfig.type === 'flange' && ioConfig.port === 1) {
    prev.type = 'controller';
    prev.port = 16;
  } else {
    prev.port -= 1;
  }

  return prev;
}

export function findCurrentHolder(
  type: 'input' | 'output',
  ioConfig: ControllerIO | FlangeIO,
  cobotConfig: CobotConfig,
) {
  if (type === 'input') {
    for (const name of DIGITAL_INPUTS) {
      const io = cobotConfig.config[name];

      if (ioConfig.value === io.value && ioConfig.type === io.type) {
        return name;
      }
    }
  } else {
    for (const name of DIGITAL_OUTPUTS) {
      const io = cobotConfig.config[name];

      if (ioConfig.value === io.value && ioConfig.type === io.type) {
        return name;
      }
    }
  }
}

export function getInputPorts() {
  const cdi: DigitalInput[] = range(16).map((value) => ({
    value,
    type: 'controller',
  }));
  const fdi: DigitalInput[] = range(6).map((value) => ({
    value,
    type: 'flange',
  }));

  return [...cdi, ...fdi];
}

export function getOutputPorts() {
  const cdo: DigitalOutput[] = range(16).map((value) => ({
    value,
    type: 'controller',
  }));
  const fdo: DigitalOutput[] = range(6).map((value) => ({
    value,
    type: 'flange',
  }));

  return [...cdo, ...fdo];
}
