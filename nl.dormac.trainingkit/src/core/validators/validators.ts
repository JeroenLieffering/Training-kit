import { SixNumArray } from 'dart-api';
import { isNumber } from '../../utils/number';
import {
  CobotConfig,
  DIGITAL_INPUTS,
  DigitalInputName,
  DIGITAL_OUTPUTS,
  DigitalOutputName,
  DigitalInput,
  DigitalOutput,
  IOType,
} from '../models/cobot-config-types';

type ErrorInfo = {
  name: string;
  label: string;
};

export type ValidationErrorWithInfo = ValidationError & ErrorInfo;

export type ValidationError =
  | RequiredError
  | MaxLengthError
  | MinLengthError
  | MaxNumberError
  | MinNumberError
  | NumberBetweenError
  | IsNumberError
  | InvalidCobotPositionError
  | SecondGripperRequiredError
  | SubSpindleRequiredError
  | ArraySizeError
  | MillCannotHaveSubspindleError
  | PlaceFinishedProductOnSecondDrawerRequiresEasyLoaderAndStaticGridError
  | PlaceFinishedProductCannotGoOnSecondDrawerAndDropOffPositionAtSameTimeError
  | GridTypeMustBeStaticWhenHasSecondDrawerIsOnError
  | GridTypeMustBePinnedWhenUsingProFeederError
  | IOPortNotUniqueError
  | IOPortOutOfRangeError
  | IOPortNotDefinedError
  | UndefinedPickPositionError
  | UndefinedPlacePositionError
  | UndefinedDropOffPositionError
  | LatheRequiresFirstMachinePickPositionError
  | LatheRequiresFirstMachinePlacePositionError
  | UndefinedStaticGridConfigurationError;
  // | ReachTestRequiredError
  // | NoSpotCanBeReachedError;

export type RequiredError = {
  type: 'REQUIRED';
};

export function required(value: string): RequiredError | undefined {
  if (value.trim() === '') {
    return {
      type: 'REQUIRED',
    };
  }

  return undefined;
}

export function isKnownValue<T>(
  value: T,
  knownValues: ReadonlyArray<T> | T[],
): RequiredError | undefined {
  if (!knownValues.includes(value)) {
    return {
      type: 'REQUIRED',
    };
  }

  return undefined;
}

export type MaxLengthError = {
  type: 'MAX_LENGTH';
  max: number;
};

export function maxLength(
  value: string,
  maxValue: number,
): MaxLengthError | undefined {
  if (value.length > maxValue) {
    return {
      type: 'MAX_LENGTH',
      max: maxValue,
    };
  }
}

export type MinLengthError = {
  type: 'MIN_LENGTH';
  min: number;
};

export function minLength(
  value: string,
  minValue: number,
): MinLengthError | undefined {
  if (value.length < minValue) {
    return {
      type: 'MIN_LENGTH',
      min: minValue,
    };
  }

  return undefined;
}

export type MinNumberError = {
  type: 'MIN_NUMBER';
  min: number;
};

export function minNumber(
  value: string,
  minValue: number,
): MinNumberError | undefined {
  const number = parseFloat(value);

  if (Number.isNaN(number)) {
    return undefined;
  }

  if (number < minValue) {
    return {
      type: 'MIN_NUMBER',
      min: minValue,
    };
  }

  return undefined;
}

export type MaxNumberError = {
  type: 'MAX_NUMBER';
  max: number;
};

export function maxNumber(
  value: string,
  maxValue: number,
): MaxNumberError | undefined {
  const number = parseFloat(value);

  if (Number.isNaN(number)) {
    return undefined;
  }

  if (number > maxValue) {
    return {
      type: 'MAX_NUMBER',
      max: maxValue,
    };
  }

  return undefined;
}

export type NumberBetweenError = {
  type: 'NUMBER_BETWEEN';
  min: number;
  max: number;
};

export function numberBetween(
  value: string,
  minValue: number,
  maxValue: number,
): NumberBetweenError | undefined {
  // Can happen if the user provides both numbers.
  if (minValue > maxValue) {
    throw new Error(
      `minValue: ${minValue} is greater than maxValue: ${maxValue}`,
    );
  }

  const number = parseFloat(value);

  if (Number.isNaN(number)) {
    return undefined;
  }

  if (number < minValue || number > maxValue) {
    return {
      type: 'NUMBER_BETWEEN',
      min: minValue,
      max: maxValue,
    };
  }

  return undefined;
}

export type IsNumberError = {
  type: 'NOT_A_NUMBER';
};

export function isNumeric(value: string): IsNumberError | undefined {
  if (!isNumber(value)) {
    return {
      type: 'NOT_A_NUMBER',
    };
  }
  
  return undefined;
}

export type InvalidCobotPositionError = {
  type: 'INVALID_COBOT_POSITION';
};

export function validCobotPosition(
  value: SixNumArray | undefined,
): InvalidCobotPositionError | undefined {
  if (value === undefined) {
    return {
      type: 'INVALID_COBOT_POSITION',
    };
  }

  if (value.length !== 6) {
    return {
      type: 'INVALID_COBOT_POSITION',
    };
  }

  return undefined;
}

type MillCannotHaveSubspindleError = {
  type: 'MILL_CANNOT_HAVE_A_SUB_SPINDLE';
};

type SecondGripperRequiredError = {
  type: 'SECOND_GRIPPER_REQUIRED';
};

type SubSpindleRequiredError = {
  type: 'SUB_SPINDLE_REQUIRED';
};

type PlaceFinishedProductOnSecondDrawerRequiresEasyLoaderAndStaticGridError = {
  type: 'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER_REQUIRES_EASY_LOADER_AND_STATIC_GRID_WITH_A_SECOND_DRAWER';
};

type PlaceFinishedProductCannotGoOnSecondDrawerAndDropOffPositionAtSameTimeError =
  {
    type: 'PLACE_FINISHED_PRODUCT_CANNOT_GO_ON_SECOND_DRAWER_AND_DROP_OFF_POSITION_AT_SAME_TIME';
  };

type GridTypeMustBeStaticWhenHasSecondDrawerIsOnError = {
  type: 'GRID_TYPE_MUST_BE_STATIC_WHEN_HAS_SECOND_DRAWER_IS_ON';
};

type GridTypeMustBePinnedWhenUsingProFeederError = {
  type: 'GRID_TYPE_MUST_BE_PINNED_WHEN_USING_PRO_FEEDER';
};

type UndefinedPickPositionError = {
  type: 'UNDEFINED_PICK_POSITION';
};

type UndefinedPlacePositionError = {
  type: 'UNDEFINED_PLACE_POSITION';
};

type UndefinedDropOffPositionError = {
  type: 'UNDEFINED_DROP_OFF_POSITION';
};

type LatheRequiresFirstMachinePickPositionError = {
  type: 'LATHE_REQUIRES_FIRST_MACHINE_PICK_POSITION';
};

type LatheRequiresFirstMachinePlacePositionError = {
  type: 'LATHE_REQUIRES_FIRST_MACHINE_PLACE_POSITION';
};

type UndefinedStaticGridConfigurationError = {
  type: 'UNDEFINED_STATIC_GRID_CONFIGURATION';
};

// type ReachTestRequiredError = {
//   type: 'REACH_TEST_REQUIRED';
// };

type NoSpotCanBeReachedError = {
  type: 'NO_SPOT_CAN_BE_REACHED';
};

type ArraySizeError = {
  type: 'ARRAY_SIZE';
  min: number;
  max: number;
};

export function arraySize(
  value: unknown[],
  minSize: number,
  maxSize: number,
): ArraySizeError | undefined {
  // Can happen if the user provides both numbers.
  if (minSize > maxSize) {
    throw new Error(`minSize: ${minSize} is greater than maxSize: ${maxSize}`);
  }

  if (!Array.isArray(value)) {
    return {
      type: 'ARRAY_SIZE',
      min: minSize,
      max: maxSize,
    };
  }

  if (value.length > maxSize || value.length < minSize) {
    return {
      type: 'ARRAY_SIZE',
      min: minSize,
      max: maxSize,
    };
  }

  return undefined;
}

type IOPortNotUniqueError = {
  type: 'IO_PORT_NOT_UNIQUE';
};

export function isIOPortUnique(
  name: DigitalInputName | DigitalOutputName,
  ioConfig: DigitalInput | DigitalOutput,
  cobotConfig: CobotConfig,
): IOPortNotUniqueError | undefined {
  const digitals = DIGITAL_INPUTS.includes(name as DigitalInputName)
    ? DIGITAL_INPUTS
    : DIGITAL_OUTPUTS;

  for (const otherName of digitals) {
    const io = cobotConfig.config[otherName];

    if (
      name !== otherName &&
      io.value !== -1 &&
      ioConfig.value === io.value &&
      ioConfig.type === io.type
    ) {
      return { type: 'IO_PORT_NOT_UNIQUE' };
    }
  }

  return undefined;
}

type IOPortOutOfRangeError = {
  type: 'IO_PORT_OUT_OF_RANGE';
  min: number;
  max: number;
  kind: IOType;
};

type IOPortNotDefinedError = {
  type: 'IO_PORT_NOT_DEFINED';
};

export function validIORange(
  io: DigitalInput | DigitalOutput,
): IOPortOutOfRangeError | IOPortNotDefinedError | undefined {
  if (io.value === -1) {
    return { type: 'IO_PORT_NOT_DEFINED' };
  }

  if (io.type === 'controller') {
    if (io.value < 1 || io.value > 16) {
      return {
        type: 'IO_PORT_OUT_OF_RANGE',
        min: 1,
        max: 16,
        kind: 'controller',
      };
    }
  } else {
    if (io.value < 1 || io.value > 6) {
      return {
        type: 'IO_PORT_OUT_OF_RANGE',
        min: 1,
        max: 6,
        kind: 'flange',
      };
    }
  }

  return undefined;
}
