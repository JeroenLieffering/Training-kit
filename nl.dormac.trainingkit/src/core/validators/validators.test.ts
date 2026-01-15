import { SixNumArray } from 'dart-api';
import {
  arraySize,
  isIOPortUnique,
  isKnownValue,
  isNumeric,
  maxLength,
  maxNumber,
  minLength,
  minNumber,
  numberBetween,
  required,
  validCobotPosition,
  validIORange,
} from './validators';
import { configEasyloaderWithStaticGrid } from '../fixtures/cobot-config-fixtures';

describe('util: validators', () => {
  describe('required', () => {
    it('should return a RequiredError when value is empty', () => {
      expect(required('')).toEqual({
        type: 'REQUIRED',
      });
    });

    it('should return a RequiredError when value is empty after trim', () => {
      expect(required(' ')).toEqual({
        type: 'REQUIRED',
      });
    });

    it('should undefined when value is not empty', () => {
      expect(required('a')).toBe(undefined);
    });
  });

  describe('maxLength', () => {
    it('should return a MaxLengthError when value length exceeds max', () => {
      expect(maxLength('noot', 3)).toEqual({
        type: 'MAX_LENGTH',
        max: 3,
      });
    });

    it('should return undefined when value length is equal to the max', () => {
      expect(maxLength('noo', 3)).toBe(undefined);
    });

    it('should return undefined when value length is less than max', () => {
      expect(maxLength('no', 3)).toBe(undefined);
      expect(maxLength('n', 3)).toBe(undefined);
      expect(maxLength('', 3)).toBe(undefined);
    });
  });

  describe('minLength', () => {
    it('should return a MinLengthError when value length is less than min', () => {
      expect(minLength('', 3)).toEqual({
        type: 'MIN_LENGTH',
        min: 3,
      });

      expect(minLength('n', 3)).toEqual({
        type: 'MIN_LENGTH',
        min: 3,
      });

      expect(minLength('no', 3)).toEqual({
        type: 'MIN_LENGTH',
        min: 3,
      });
    });

    it('should return undefined when value length is equal to min', () => {
      expect(minLength('noo', 3)).toBe(undefined);
    });

    it('should return undefined when value length is more than min', () => {
      expect(minLength('noot', 3)).toBe(undefined);
      expect(minLength('noote', 3)).toBe(undefined);
      expect(minLength('nooten', 3)).toBe(undefined);
    });
  });

  describe('minNumber', () => {
    it('should return a MinNumberError when value is less than min', () => {
      expect(minNumber('0', 3)).toEqual({
        type: 'MIN_NUMBER',
        min: 3,
      });

      expect(minNumber('1', 3)).toEqual({
        type: 'MIN_NUMBER',
        min: 3,
      });

      expect(minNumber('2', 3)).toEqual({
        type: 'MIN_NUMBER',
        min: 3,
      });
    });

    it('should return undefined when value is equal to min', () => {
      expect(minNumber('3', 3)).toBe(undefined);
    });

    it('should return undefined when value is more than min', () => {
      expect(minNumber('4', 3)).toBe(undefined);
      expect(minNumber('5', 3)).toBe(undefined);
      expect(minNumber('6', 3)).toBe(undefined);
    });

    it('should return undefined when value cannot be parsed as a number', () => {
      expect(minNumber('aap', 3)).toBe(undefined);
      expect(minNumber('', 3)).toBe(undefined);
      expect(minNumber(' ', 3)).toBe(undefined);
    });
  });

  describe('maxNumber', () => {
    it('should return a MaxNumberError when value is more than max', () => {
      expect(maxNumber('4', 3)).toEqual({
        type: 'MAX_NUMBER',
        max: 3,
      });
    });

    it('should return undefined when value is equal to max', () => {
      expect(maxNumber('3', 3)).toBe(undefined);
    });

    it('should return undefined when value is less than max', () => {
      expect(maxNumber('0', 3)).toBe(undefined);
      expect(maxNumber('1', 3)).toBe(undefined);
      expect(maxNumber('2', 3)).toBe(undefined);
    });

    it('should return undefined when value cannot be parsed as a number', () => {
      expect(maxNumber('aap', 3)).toBe(undefined);
      expect(maxNumber('', 3)).toBe(undefined);
      expect(maxNumber(' ', 3)).toBe(undefined);
    });
  });

  describe('numberBetween', () => {
    it('should return a MaxNumberError when value is less than min or more than max', () => {
      expect(numberBetween('1', 3, 6)).toEqual({
        type: 'NUMBER_BETWEEN',
        min: 3,
        max: 6,
      });

      expect(numberBetween('2', 3, 6)).toEqual({
        type: 'NUMBER_BETWEEN',
        min: 3,
        max: 6,
      });

      expect(numberBetween('7', 3, 6)).toEqual({
        type: 'NUMBER_BETWEEN',
        min: 3,
        max: 6,
      });

      expect(numberBetween('8', 3, 6)).toEqual({
        type: 'NUMBER_BETWEEN',
        min: 3,
        max: 6,
      });

      expect(numberBetween('2', 3, 3)).toEqual({
        type: 'NUMBER_BETWEEN',
        min: 3,
        max: 3,
      });

      expect(numberBetween('4', 3, 3)).toEqual({
        type: 'NUMBER_BETWEEN',
        min: 3,
        max: 3,
      });
    });

    it('should return undefined when value is equal to max', () => {
      expect(numberBetween('6', 3, 6)).toBe(undefined);
    });

    it('should return undefined when value is equal to min', () => {
      expect(numberBetween('3', 3, 6)).toBe(undefined);
    });

    it('should return undefined when value is between min and max', () => {
      expect(numberBetween('4', 3, 6)).toBe(undefined);
      expect(numberBetween('5', 3, 6)).toBe(undefined);

      expect(numberBetween('3', 3, 3)).toBe(undefined);
    });

    it('should return undefined when value cannot be parsed as a number', () => {
      expect(numberBetween('aap', 3, 6)).toBe(undefined);
      expect(numberBetween('', 3, 6)).toBe(undefined);
      expect(numberBetween(' ', 3, 6)).toBe(undefined);
    });

    it('should throw error when min is equal or less than max', () => {
      expect(() => numberBetween('5', 0, -1)).toThrow(
        'minValue: 0 is greater than maxValue: -1',
      );

      expect(() => numberBetween('5', 10, 9)).toThrow(
        'minValue: 10 is greater than maxValue: 9',
      );
    });
  });

  describe('isNumeric', () => {
    it('should return a IsNumberError when value is not a number', () => {
      expect(isNumeric('')).toEqual({
        type: 'NOT_A_NUMBER',
      });
    });

    it('should return undefined when value is in the options', () => {
      expect(isNumeric('6')).toBe(undefined);
      expect(isNumeric('-6')).toBe(undefined);
      expect(isNumeric('6.4')).toBe(undefined);
      expect(isNumeric('-6.4')).toBe(undefined);
      expect(isNumeric('0.3')).toBe(undefined);
      expect(isNumeric('-0.3')).toBe(undefined);
    });
  });

  describe('validCobotPosition', () => {
    it('should return a INVALID_COBOT_POSITION when there are less than 6 positions', () => {
      const five = [1, 2, 3, 4, 5] as unknown as SixNumArray;
      const four = [1, 2, 3, 4] as unknown as SixNumArray;
      const three = [1, 2, 3] as unknown as SixNumArray;
      const two = [1, 2] as unknown as SixNumArray;
      const one = [1] as unknown as SixNumArray;
      const zero = [] as unknown as SixNumArray;

      expect(validCobotPosition(five)).toEqual({
        type: 'INVALID_COBOT_POSITION',
      });

      expect(validCobotPosition(four)).toEqual({
        type: 'INVALID_COBOT_POSITION',
      });

      expect(validCobotPosition(three)).toEqual({
        type: 'INVALID_COBOT_POSITION',
      });

      expect(validCobotPosition(two)).toEqual({
        type: 'INVALID_COBOT_POSITION',
      });

      expect(validCobotPosition(one)).toEqual({
        type: 'INVALID_COBOT_POSITION',
      });

      expect(validCobotPosition(zero)).toEqual({
        type: 'INVALID_COBOT_POSITION',
      });

      expect(validCobotPosition(undefined)).toEqual({
        type: 'INVALID_COBOT_POSITION',
      });
    });

    it('should return a INVALID_COBOT_POSITION when given undefined', () => {
      expect(validCobotPosition(undefined)).toEqual({
        type: 'INVALID_COBOT_POSITION',
      });
    });

    it('should return undefined when all six values are present', () => {
      expect(validCobotPosition([1, 2, 3, 4, 5, 6])).toBe(undefined);
    });
  });

  describe('IsUnknownValue', () => {
    it('should return a REQUIRED when the value is not known', () => {
      expect(isKnownValue('aha', ['foo', 'bar', 'qux'])).toEqual({
        type: 'REQUIRED',
      });
    });

    it('should return undefined when all six values are present', () => {
      expect(isKnownValue('foo', ['foo', 'bar', 'qux'])).toBe(undefined);
      expect(isKnownValue('bar', ['foo', 'bar', 'qux'])).toBe(undefined);
      expect(isKnownValue('qux', ['foo', 'bar', 'qux'])).toBe(undefined);
    });
  });

  describe('arraySize', () => {
    it('should return a ARRAY_SIZE_ERROR when value is less than min or more than max', () => {
      expect(arraySize([], 3, 6)).toEqual({
        type: 'ARRAY_SIZE',
        min: 3,
        max: 6,
      });

      expect(arraySize([1], 3, 6)).toEqual({
        type: 'ARRAY_SIZE',
        min: 3,
        max: 6,
      });

      expect(arraySize([1, 2], 3, 6)).toEqual({
        type: 'ARRAY_SIZE',
        min: 3,
        max: 6,
      });

      expect(arraySize([1, 2, 3, 4, 5, 6, 7], 3, 6)).toEqual({
        type: 'ARRAY_SIZE',
        min: 3,
        max: 6,
      });
    });

    it('should return undefined when value is equal to max', () => {
      expect(arraySize([1, 2, 3, 4, 5, 6], 3, 6)).toBe(undefined);
    });

    it('should return undefined when value is equal to min', () => {
      expect(arraySize([1, 2, 3], 3, 6)).toBe(undefined);
    });

    it('should return undefined when value is between min and max', () => {
      expect(arraySize([1, 2, 3, 4], 3, 6)).toBe(undefined);
      expect(arraySize([1, 2, 3, 4, 5], 3, 6)).toBe(undefined);
    });

    it('should return a ARRAY_SIZE_ERROR when value is not an array', () => {
      // @ts-expect-error Allow me to test this
      expect(arraySize(null, 3, 6)).toEqual({
        type: 'ARRAY_SIZE',
        min: 3,
        max: 6,
      });

      // @ts-expect-error Allow me to test this
      expect(arraySize(undefined, 3, 6)).toEqual({
        type: 'ARRAY_SIZE',
        min: 3,
        max: 6,
      });
    });

    it('should throw error when min is equal or less than max', () => {
      expect(() => arraySize([], 0, -1)).toThrow(
        'minSize: 0 is greater than maxSize: -1',
      );

      expect(() => arraySize([], 10, 9)).toThrow(
        'minSize: 10 is greater than maxSize: 9',
      );
    });
  });

  describe('validIORange', () => {
    describe('controller', () => {
      it('should return a IO_PORT_NOT_DEFINED when port is -1', () => {
        expect(validIORange({ type: 'controller', value: -1 })).toEqual({
          type: 'IO_PORT_NOT_DEFINED',
        });
      });

      it('should return a IO_PORT_OUT_OF_RANGE when port is not between 1 and 16', () => {
        expect(validIORange({ type: 'controller', value: 0 })).toEqual({
          type: 'IO_PORT_OUT_OF_RANGE',
          kind: 'controller',
          max: 16,
          min: 1,
        });

        expect(validIORange({ type: 'controller', value: 17 })).toEqual({
          type: 'IO_PORT_OUT_OF_RANGE',
          kind: 'controller',
          max: 16,
          min: 1,
        });
      });

      it('should return undefined when port is between 1 and 16', () => {
        expect(validIORange({ type: 'controller', value: 1 })).toBe(undefined);
        expect(validIORange({ type: 'controller', value: 16 })).toBe(undefined);
      });
    });

    describe('flange', () => {
      it('should return a IO_PORT_NOT_DEFINED when port is -1', () => {
        expect(validIORange({ type: 'flange', value: -1 })).toEqual({
          type: 'IO_PORT_NOT_DEFINED',
        });
      });

      it('should return a IO_PORT_OUT_OF_RANGE when port is not between 1 and 6', () => {
        expect(validIORange({ type: 'flange', value: 0 })).toEqual({
          type: 'IO_PORT_OUT_OF_RANGE',
          kind: 'flange',
          max: 6,
          min: 1,
        });

        expect(validIORange({ type: 'flange', value: 7 })).toEqual({
          type: 'IO_PORT_OUT_OF_RANGE',
          kind: 'flange',
          max: 6,
          min: 1,
        });
      });

      it('should return undefined when port is between 1 and 6', () => {
        expect(validIORange({ type: 'flange', value: 1 })).toBe(undefined);
        expect(validIORange({ type: 'flange', value: 6 })).toBe(undefined);
      });
    });
  });

  describe('isIOPortUnique', () => {
    describe('input port', () => {
      it('should return a IO_PORT_NOT_UNIQUE error when port / type combination is not unique', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();

        cobotConfig.config.DI_COBOT_IS_CALLED.type = 'controller';
        cobotConfig.config.DI_COBOT_IS_CALLED.value = 16;

        expect(
          isIOPortUnique(
            'DI_DOOR_IS_OPENED',
            { type: 'controller', value: 16 },
            cobotConfig,
          ),
        ).toEqual({
          type: 'IO_PORT_NOT_UNIQUE',
        });
      });

      it('should return undefined when port / type combination is unique', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();

        cobotConfig.config.DI_COBOT_IS_CALLED.type = 'controller';
        cobotConfig.config.DI_COBOT_IS_CALLED.value = 16;

        expect(
          isIOPortUnique(
            'DI_DOOR_IS_OPENED',
            { type: 'controller', value: 15 },
            cobotConfig,
          ),
        ).toBe(undefined);
      });

      it('should return undefined when type is unique', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();

        cobotConfig.config.DI_COBOT_IS_CALLED.type = 'flange';
        cobotConfig.config.DI_COBOT_IS_CALLED.value = 16;

        expect(
          isIOPortUnique(
            'DI_DOOR_IS_OPENED',
            { type: 'controller', value: 16 },
            cobotConfig,
          ),
        ).toBe(undefined);
      });

      it('should return undefined when port -1 is used to denote empty port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();

        cobotConfig.config.DI_COBOT_IS_CALLED.type = 'controller';
        cobotConfig.config.DI_COBOT_IS_CALLED.value = -1;

        expect(
          isIOPortUnique(
            'DI_DOOR_IS_OPENED',
            { type: 'controller', value: -1 },
            cobotConfig,
          ),
        ).toBe(undefined);
      });
    });

    describe('output port', () => {
      it('should return a IO_PORT_NOT_UNIQUE error when port / type combination is not unique', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();

        cobotConfig.config.DO_AIRPURGE.type = 'controller';
        cobotConfig.config.DO_AIRPURGE.value = 16;

        expect(
          isIOPortUnique(
            'DO_RUN_MACHINE',
            { type: 'controller', value: 16 },
            cobotConfig,
          ),
        ).toEqual({
          type: 'IO_PORT_NOT_UNIQUE',
        });
      });

      it('should return undefined when port / type combination is unique', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();

        cobotConfig.config.DO_AIRPURGE.type = 'controller';
        cobotConfig.config.DO_AIRPURGE.value = 16;

        expect(
          isIOPortUnique(
            'DO_RUN_MACHINE',
            { type: 'controller', value: 15 },
            cobotConfig,
          ),
        ).toBe(undefined);
      });

      it('should return undefined when type is unique', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();

        cobotConfig.config.DO_AIRPURGE.type = 'flange';
        cobotConfig.config.DO_AIRPURGE.value = 15;

        expect(
          isIOPortUnique(
            'DO_RUN_MACHINE',
            { type: 'controller', value: 15 },
            cobotConfig,
          ),
        ).toBe(undefined);
      });

      it('should return IO_PORT_NOT_DEFINED when port -1 is used to denote empty port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();

        cobotConfig.config.DO_AIRPURGE.type = 'controller';
        cobotConfig.config.DO_AIRPURGE.value = -1;

        expect(
          isIOPortUnique(
            'DO_RUN_MACHINE',
            { type: 'controller', value: -1 },
            cobotConfig,
          ),
        ).toBe(undefined);
      });
    });
  });
});
