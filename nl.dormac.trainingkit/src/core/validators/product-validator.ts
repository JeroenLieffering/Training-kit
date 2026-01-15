import { FieldErrors } from 'react-hook-form';
import { CobotInfo } from '../../types';
import { parseAsNumber } from '../../utils/number';
import { CobotConfig } from '../models/cobot-config-types';
import { Product, PRODUCT_ICONS, ProductIcon } from '../models/product-types';
import {
  getGripper1Info,
  getGripper2Info,
  isConfiguredWithStaticGrid,
  isConfiguredWithStaticEasyLoaderWithSecondDrawer,
  getSecondDrawerStaticGridConfig,
  getMainDrawerStaticGridConfig,
} from '../services/cobot-config-service';
import {
  getBoundsRawMaterialDiameter,
  getBoundsRawMaterialHeight,
  getBoundsRawMaterialLength,
  getBoundsRawMaterialWeight,
  getBoundsRawMaterialWidth,
} from '../services/product-service';
import { getErrors, Validator } from './utils';
import {
  isKnownValue,
  isNumeric,
  maxLength,
  numberBetween,
  required,
} from './validators';

export function productValidator(
  product: Product,
  cobotConfig: CobotConfig,
  cobotInfo: CobotInfo,
  toolWeight: number,
) {
  const isGridStatic = isConfiguredWithStaticGrid(cobotConfig);
  const isGridPinned = !isGridStatic;

  const mainDrawerStaticGridConfig = getMainDrawerStaticGridConfig(cobotConfig, product.config.STATIC_GRID_INDEX);
  const secondDrawerStaticGridConfig =
    getSecondDrawerStaticGridConfig(cobotConfig, product.config.STATIC_GRID_INDEX_SECOND_DRAWER);

  const validators: Validator<Product>[] = [
    // info
    {
      name: 'name',
      label: 'PRODUCT_NAME',
      validator: () => {
        const value = product.name;

        return [required(value), maxLength(value, 100)];
      },
    },
    {
      name: 'description',
      label: 'PRODUCT_DESCRIPTION',
      validator: () => [maxLength(product.description, 255)],
    },
    {
      name: 'icon',
      label: 'PRODUCT_ICON',
      validator: () => {
        const value = product.icon;
        return [isKnownValue<ProductIcon>(value, PRODUCT_ICONS)];
      },
    },

    // process-flow
    {
      name: 'config.FORCE_FEEDING_NEWTON',
      label: 'FORCE_FEEDING_NEWTON',
      validator: () => {
        if (!product.config.FORCE_INFEED) {
          return undefined;
        }

        const value = product.config.FORCE_FEEDING_NEWTON;

        return [isNumeric(value), numberBetween(value, 5, 80)];
      },
    },
    {
      name: 'config.FORCE_PUSHING_NEWTON',
      label: 'FORCE_PUSHING_NEWTON',
      validator: () => {
        if (!product.config.PUSH_AFTER_PLACE) {
          return undefined;
        }

        const value = product.config.FORCE_PUSHING_NEWTON;

        return [isNumeric(value), numberBetween(value, 5, 80)];
      },
    },
    {
      name: 'config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
      label: 'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
      validator: () => {
        if (
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER &&
          !isConfiguredWithStaticEasyLoaderWithSecondDrawer(cobotConfig)
        ) {
          return {
            type: 'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER_REQUIRES_EASY_LOADER_AND_STATIC_GRID_WITH_A_SECOND_DRAWER',
          };
        }

        if (
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER &&
          product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION
        ) {
          return {
            type: 'PLACE_FINISHED_PRODUCT_CANNOT_GO_ON_SECOND_DRAWER_AND_DROP_OFF_POSITION_AT_SAME_TIME',
          };
        }
      },
    },
    {
      name: 'config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX',
      label: 'PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION',
      validator: () => {
        if (!product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION) {
          return;
        }

        const value =
          product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX;

        if (value === '') {
          return {
            type: 'REQUIRED',
          };
        }

        const index = parseFloat(value);

        if (!cobotConfig.config.DROP_OFF_POSITIONS[index]) {
          return { type: 'UNDEFINED_DROP_OFF_POSITION' };
        }
      },
    },

    // product
    {
      name: 'config.RAW_MAT_HEIGHT',
      label: 'RAW_MAT_HEIGHT',
      validator: () => {
        const value = product.config.RAW_MAT_HEIGHT;

        const { min, max } = getBoundsRawMaterialHeight(cobotConfig);

        return [isNumeric(value), numberBetween(value, min, max)];
      },
    },
    {
      name: 'config.RAW_MAT_LENGTH',
      label: 'RAW_MAT_LENGTH',
      validator: () => {
        if (product.config.ROUND_PRODUCT) {
          return undefined;
        }

        const value = product.config.RAW_MAT_LENGTH;

        const { min, max } = getBoundsRawMaterialLength(cobotConfig, product);

        return [isNumeric(value), numberBetween(value, min, max)];
      },
    },
    {
      name: 'config.RAW_MAT_WIDTH',
      label: 'RAW_MAT_WIDTH',
      validator: () => {
        if (product.config.ROUND_PRODUCT) {
          return undefined;
        }

        const value = product.config.RAW_MAT_WIDTH;

        const { min, max } = getBoundsRawMaterialWidth(cobotConfig, product);

        return [isNumeric(value), numberBetween(value, min, max)];
      },
    },
    {
      name: 'config.RAW_MAT_DIAMETER',
      label: 'RAW_MAT_DIAMETER',
      validator: () => {
        if (!product.config.ROUND_PRODUCT) {
          return undefined;
        }

        const value = product.config.RAW_MAT_DIAMETER;

        const { min, max } = getBoundsRawMaterialDiameter(cobotConfig, product);

        return [isNumeric(value), numberBetween(value, min, max)];
      },
    },
    {
      name: 'config.RAW_MAT_WEIGHT',
      label: 'RAW_MAT_WEIGHT',
      validator: () => {
        const value = product.config.RAW_MAT_WEIGHT;

        const { min, max } = getBoundsRawMaterialWeight(cobotInfo, cobotConfig, toolWeight);

        return [isNumeric(value), numberBetween(value, min, max)];
        // return [isNumeric(value), numberBetween(value, 0.1, 6)];
      },
    },
    {
      name: 'config.FIN_PRODUCT_HEIGHT',
      label: 'FIN_PRODUCT_HEIGHT',
      validator: () => {
        const rawMatHeight = parseFloat(product.config.RAW_MAT_HEIGHT);

        // If the raw material height is unknown or zero do not do anything.
        if (Number.isNaN(rawMatHeight) || rawMatHeight === 0) {
          return undefined;
        }

        const value = product.config.FIN_PRODUCT_HEIGHT;

        return [isNumeric(value), numberBetween(value, 0.1, rawMatHeight)];
      },
    },
    {
      name: 'config.FIN_PRODUCT_LENGTH',
      label: 'FIN_PRODUCT_LENGTH',
      validator: () => {
        if (product.config.ROUND_PRODUCT) {
          return undefined;
        }

        const rawMatLength = parseFloat(product.config.RAW_MAT_LENGTH);

        // If the raw material length is unknown or zero do not do anything.
        if (Number.isNaN(rawMatLength) || rawMatLength === 0) {
          return undefined;
        }

        const value = product.config.FIN_PRODUCT_LENGTH;

        return [isNumeric(value), numberBetween(value, 0.1, rawMatLength)];
      },
    },
    {
      name: 'config.FIN_PRODUCT_WIDTH',
      label: 'FIN_PRODUCT_WIDTH',
      validator: () => {
        if (product.config.ROUND_PRODUCT) {
          return undefined;
        }

        const rawMatWidth = parseFloat(product.config.RAW_MAT_WIDTH);

        // If the raw material width is unknown or zero do not do anything.
        if (Number.isNaN(rawMatWidth) || rawMatWidth === 0) {
          return undefined;
        }

        const value = product.config.FIN_PRODUCT_WIDTH;

        return [isNumeric(value), numberBetween(value, 0.1, rawMatWidth)];
      },
    },
    {
      name: 'config.FIN_PRODUCT_DIAMETER',
      label: 'FIN_PRODUCT_DIAMETER',
      validator: () => {
        if (!product.config.ROUND_PRODUCT) {
          return undefined;
        }

        const rawMatDiameter = parseFloat(product.config.RAW_MAT_DIAMETER);

        // If the raw material diameter is unknown or zero do not do anything.
        if (Number.isNaN(rawMatDiameter) || rawMatDiameter === 0) {
          return undefined;
        }

        const value = product.config.FIN_PRODUCT_DIAMETER;

        return [isNumeric(value), numberBetween(value, 0.1, rawMatDiameter)];
      },
    },
    {
      name: 'config.FIN_PRODUCT_WEIGHT',
      label: 'FIN_PRODUCT_WEIGHT',
      validator: () => {
        const rawMatWeight = parseFloat(product.config.RAW_MAT_WEIGHT);

        // If the raw material weight is unknown or zero do not do anything.
        if (Number.isNaN(rawMatWeight) || rawMatWeight === 0) {
          return undefined;
        }

        const value = product.config.FIN_PRODUCT_WEIGHT;

        // Get the gripper that is going to carry the finished product.
        const gripperCarryWeight = product.config.USE_SECOND_GRIPPER
          ? getGripper2Info(cobotConfig)?.gripper.carryWeight
          : getGripper1Info(cobotConfig)?.gripper.carryWeight;

        // The max cannot exceed the weight of the raw material as
        // things can only be chopped off. It must also be able to
        // be carried by the gripper.
        const max = Math.min(rawMatWeight, gripperCarryWeight ?? rawMatWeight);

        return [isNumeric(value), numberBetween(value, 0.1, max)];
      },
    },

    // Stepped axis
    {
      name: 'config.FIN_TOP_OFFSET',
      label: 'FIN_TOP_OFFSET',
      validator: () => {
        if (!product.config.STEPPED_AXIS) {
          return undefined;
        }

        const value = product.config.FIN_TOP_OFFSET;

        let max = 0;

        if (product.config.USE_SECOND_GRIPPER) {
          max =
            parseAsNumber(product.config.GR2_CLAW_HEIGHT, 9999) -
            parseAsNumber(product.config.GR2_CLAW_DEPTH, 9999) -
            0.5;
        } else {
          max =
            parseAsNumber(product.config.GR1_CLAW_HEIGHT, 9999) -
            parseAsNumber(product.config.GR1_CLAW_DEPTH, 9999) -
            0.5;
        }

        return [isNumeric(value), numberBetween(value, 0, max)];
      },
    },
    {
      name: 'config.FIN_BOTTOM_OFFSET',
      label: 'FIN_BOTTOM_OFFSET',
      validator: () => {
        if (!product.config.STEPPED_AXIS) {
          return undefined;
        }

        const value = product.config.FIN_BOTTOM_OFFSET;

        let max = 0;

        if (product.config.USE_SUB_SPINDLE) {
          max =
            parseAsNumber(product.config.SUB_CLAW_HEIGHT, 9999) -
            parseAsNumber(product.config.SUB_CLAW_DEPTH, 9999) -
            0.5;
        } else {
          max =
            parseAsNumber(product.config.MAIN_CLAW_HEIGHT, 9999) -
            parseAsNumber(product.config.MAIN_CLAW_DEPTH, 9999) -
            0.5;
        }

        return [isNumeric(value), numberBetween(value, 0, max)];
      },
    },

    // machine
    {
      name: 'config.MACHINE_PICK_POSITION_INDEX',
      label: 'MACHINE_PICK_POSITION',
      validator: () => {
        if (
          cobotConfig.config.MACHINE_TYPE === 'LATHE' &&
          product.config.MACHINE_PICK_POSITION_INDEX !== '0'
        ) {
          return { type: 'LATHE_REQUIRES_FIRST_MACHINE_PICK_POSITION' };
        }

        const value = product.config.MACHINE_PICK_POSITION_INDEX;

        if (value === '') {
          return {
            type: 'REQUIRED',
          };
        }

        const index = parseFloat(value);

        if (!cobotConfig.config.MACHINE_PICK_POSITIONS[index]) {
          return { type: 'UNDEFINED_PICK_POSITION' };
        }
      },
    },
    {
      name: 'config.MACHINE_PLACE_POSITION_INDEX',
      label: 'MACHINE_PLACE_POSITION',
      validator: () => {
        if (
          cobotConfig.config.MACHINE_TYPE === 'LATHE' &&
          product.config.MACHINE_PLACE_POSITION_INDEX !== '0'
        ) {
          return { type: 'LATHE_REQUIRES_FIRST_MACHINE_PLACE_POSITION' };
        }

        const value = product.config.MACHINE_PLACE_POSITION_INDEX;

        if (value === '') {
          return {
            type: 'REQUIRED',
          };
        }

        const index = parseFloat(value);

        if (!cobotConfig.config.MACHINE_PLACE_POSITIONS[index]) {
          return { type: 'UNDEFINED_PLACE_POSITION' };
        }
      },
    },
    {
      name: 'config.MACHINE_PICK_HEIGHT_OFFSET',
      label: 'MACHINE_PICK_HEIGHT_OFFSET',
      validator: () => {
        const value = product.config.MACHINE_PICK_HEIGHT_OFFSET;
        return [isNumeric(value), numberBetween(value, -10, 10)];
      },
    },
    {
      name: 'config.MACHINE_PICK_DEPTH_OFFSET',
      label: 'MACHINE_PICK_DEPTH_OFFSET',
      validator: () => {
        const value = product.config.MACHINE_PICK_DEPTH_OFFSET;
        return [isNumeric(value), numberBetween(value, -10, 10)];
      },
    },
    {
      name: 'config.MACHINE_PLACE_HEIGHT_OFFSET',
      label: 'MACHINE_PLACE_HEIGHT_OFFSET',
      validator: () => {
        const value = product.config.MACHINE_PLACE_HEIGHT_OFFSET;
        return [isNumeric(value), numberBetween(value, -10, 10)];
      },
    },
    {
      name: 'config.MACHINE_PLACE_DEPTH_OFFSET',
      label: 'MACHINE_PLACE_DEPTH_OFFSET',
      validator: () => {
        const value = product.config.MACHINE_PLACE_DEPTH_OFFSET;
        return [isNumeric(value), numberBetween(value, -10, 10)];
      },
    },

    // gripper
    {
      name: 'config.GR1_CLAW_DEPTH',
      label: 'GR1_CLAW_DEPTH',
      validator: () => {
        const value = product.config.GR1_CLAW_DEPTH;
        return [isNumeric(value), numberBetween(value, 1, 100)];
      },
    },
    {
      name: 'config.GR2_CLAW_DEPTH',
      label: 'GR2_CLAW_DEPTH',
      validator: () => {
        if (!product.config.USE_SECOND_GRIPPER) {
          return undefined;
        }

        const value = product.config.GR2_CLAW_DEPTH;
        return [isNumeric(value), numberBetween(value, 1, 100)];
      },
    },
    {
      name: 'config.GR1_CLAW_HEIGHT',
      label: 'GR1_CLAW_HEIGHT',
      validator: () => {
        const value = product.config.GR1_CLAW_HEIGHT;
        return [isNumeric(value), numberBetween(value, 10, 150)];
      },
    },
    {
      name: 'config.GR2_CLAW_HEIGHT',
      label: 'GR2_CLAW_HEIGHT',
      validator: () => {
        if (!product.config.USE_SECOND_GRIPPER) {
          return undefined;
        }

        const value = product.config.GR2_CLAW_HEIGHT;
        return [isNumeric(value), numberBetween(value, 10, 150)];
      },
    },
    {
      name: 'config.MAIN_CLAW_HEIGHT',
      label: 'MAIN_CLAW_HEIGHT',
      validator: () => {
        const value = product.config.MAIN_CLAW_HEIGHT;
        return [isNumeric(value), numberBetween(value, 10, 150)];
      },
    },
    {
      name: 'config.MAIN_CLAW_DEPTH',
      label: 'MAIN_CLAW_DEPTH',
      validator: () => {
        const value = product.config.MAIN_CLAW_DEPTH;
        return [isNumeric(value), numberBetween(value, 1, 100)];
      },
    },
    {
      name: 'config.SUB_CLAW_HEIGHT',
      label: 'SUB_CLAW_HEIGHT',
      validator: () => {
        if (!product.config.USE_SUB_SPINDLE) {
          return undefined;
        }

        const value = product.config.SUB_CLAW_HEIGHT;
        return [isNumeric(value), numberBetween(value, 10, 150)];
      },
    },
    {
      name: 'config.SUB_CLAW_DEPTH',
      label: 'SUB_CLAW_DEPTH',
      validator: () => {
        if (!product.config.USE_SUB_SPINDLE) {
          return undefined;
        }

        const value = product.config.SUB_CLAW_DEPTH;
        return [isNumeric(value), numberBetween(value, 1, 100)];
      },
    },

    // drawer
    {
      name: 'config.DRAWER_PICK_OFFSET_X',
      label: 'DRAWER_PICK_OFFSET_X',
      validator: () => {
        const value = product.config.DRAWER_PICK_OFFSET_X;
        return [isNumeric(value), numberBetween(value, -10, 10)];
      },
    },
    {
      name: 'config.DRAWER_PICK_OFFSET_Y',
      label: 'DRAWER_PICK_OFFSET_Y',
      validator: () => {
        const value = product.config.DRAWER_PICK_OFFSET_Y;
        return [isNumeric(value), numberBetween(value, -10, 10)];
      },
    },
    {
      name: 'config.DRAWER_PICK_OFFSET_Z',
      label: 'DRAWER_PICK_OFFSET_Z',
      validator: () => {
        const value = product.config.DRAWER_PICK_OFFSET_Z;
        return [isNumeric(value), numberBetween(value, -10, 10)];
      },
    },
    {
      name: 'config.DRAWER_PLACE_OFFSET_X',
      label: 'DRAWER_PLACE_OFFSET_X',
      validator: () => {
        const value = product.config.DRAWER_PLACE_OFFSET_X;
        return [isNumeric(value), numberBetween(value, -10, 10)];
      },
    },
    {
      name: 'config.DRAWER_PLACE_OFFSET_Y',
      label: 'DRAWER_PLACE_OFFSET_Y',
      validator: () => {
        const value = product.config.DRAWER_PLACE_OFFSET_Y;
        return [isNumeric(value), numberBetween(value, -10, 10)];
      },
    },
    {
      name: 'config.DRAWER_PLACE_OFFSET_Z',
      label: 'DRAWER_PLACE_OFFSET_Z',
      validator: () => {
        const value = product.config.DRAWER_PLACE_OFFSET_Z;
        return [isNumeric(value), numberBetween(value, -10, 10)];
      },
    },

    {
      name: 'config.POSITIONING_PIN_DIAMETER',
      label: 'POSITIONING_PIN_DIAMETER',
      validator: () => {
        if (isGridStatic) {
          return undefined;
        }

        const value = product.config.POSITIONING_PIN_DIAMETER;

        return [isNumeric(value), numberBetween(value, 8, 20)];
      },
    },

    {
      name: 'config.USE_SECOND_GRIPPER',
      label: 'USE_SECOND_GRIPPER',
      validator: () => {
        if (
          product.config.USE_SECOND_GRIPPER &&
          !cobotConfig.config.HAS_SECOND_GRIPPER
        ) {
          return {
            type: 'SECOND_GRIPPER_REQUIRED',
          };
        }
      },
    },

    {
      name: 'config.USE_SUB_SPINDLE',
      label: 'USE_SUB_SPINDLE',
      validator: () => {
        if (
          product.config.USE_SUB_SPINDLE &&
          !cobotConfig.config.MACHINE_HAS_SUB_SPINDLE
        ) {
          return {
            type: 'SUB_SPINDLE_REQUIRED',
          };
        }
      },
    },

    {
      name: 'config.DRAWER_AMOUNT_PRODUCT_X',
      label: 'DRAWER_AMOUNT_PRODUCT_X',
      validator: () => {
        if (isGridPinned) {
          return undefined;
        }

        const max = parseFloat(
          mainDrawerStaticGridConfig.AMOUNT_SQUARES_X_AXIS,
        );

        const value = product.config.DRAWER_AMOUNT_PRODUCT_X;
        return [isNumeric(value), numberBetween(value, 1, max)];
      },
    },
    {
      name: 'config.DRAWER_AMOUNT_PRODUCT_Y',
      label: 'DRAWER_AMOUNT_PRODUCT_Y',
      validator: () => {
        if (isGridPinned) {
          return undefined;
        }

        const max = parseFloat(
          mainDrawerStaticGridConfig.AMOUNT_SQUARES_Y_AXIS,
        );

        const value = product.config.DRAWER_AMOUNT_PRODUCT_Y;
        return [isNumeric(value), numberBetween(value, 1, max)];
      },
    },
    {
      name: 'config.DRAWER_AMOUNT_PRODUCT_Z',
      label: 'DRAWER_AMOUNT_PRODUCT_Z',
      validator: () => {
        const value = product.config.DRAWER_AMOUNT_PRODUCT_Z;
        return [isNumeric(value), numberBetween(value, 1, 999)];
      },
    },

    {
      name: 'config.SECOND_DRAWER_AMOUNT_PRODUCT_X',
      label: 'DRAWER_AMOUNT_PRODUCT_X',
      validator: () => {
        if (!product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER) {
          return undefined;
        }

        const max = parseFloat(
          secondDrawerStaticGridConfig.AMOUNT_SQUARES_X_AXIS,
        );

        const value = product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X;
        return [isNumeric(value), numberBetween(value, 1, max)];
      },
    },
    {
      name: 'config.SECOND_DRAWER_AMOUNT_PRODUCT_Y',
      label: 'DRAWER_AMOUNT_PRODUCT_Y',
      validator: () => {
        if (!product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER) {
          return undefined;
        }

        const max = parseFloat(
          secondDrawerStaticGridConfig.AMOUNT_SQUARES_Y_AXIS,
        );

        const value = product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y;
        return [isNumeric(value), numberBetween(value, 1, max)];
      },
    },
    {
      name: 'config.SECOND_DRAWER_AMOUNT_PRODUCT_Z',
      label: 'DRAWER_AMOUNT_PRODUCT_Z',
      validator: () => {
        if (!product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER) {
          return undefined;
        }

        const value = product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Z;
        return [isNumeric(value), numberBetween(value, 1, 999)];
      },
    },

    // {
    //   name: 'config.REACH_TESTED',
    //   label: 'REACH_TEST',
    //   validator: () => {
    //     if (!product.config.REACH_TESTED) {
    //       return {
    //         type: 'REACH_TEST_REQUIRED',
    //       };
    //     }

    //     if (
    //       product.config.SPOT_STATUS.every((reachable) => reachable === false)
    //     ) {
    //       return {
    //         type: 'NO_SPOT_CAN_BE_REACHED',
    //       };
    //     }
    //   },
    // },
    // {
    //   name: 'config.SECOND_DRAWER_REACH_TESTED',
    //   label: 'REACH_TEST',
    //   validator: () => {
    //     if (!product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER) {
    //       return undefined;
    //     }

        // if (!product.config.SECOND_DRAWER_REACH_TESTED) {
        //   return {
        //     type: 'REACH_TEST_REQUIRED',
        //   };
        // }

        // if (
        //   product.config.SECOND_DRAWER_SPOT_STATUS.every(
        //     (reachable) => reachable === false,
        //   )
        // ) {
        //   return {
        //     type: 'NO_SPOT_CAN_BE_REACHED',
        //   };
        // }
    //   },
    // },
  ];

  const errors: FieldErrors<Product> = getErrors(validators);

  const hasError = Object.keys(errors).length > 0;

  return {
    values: hasError ? {} : product,
    errors: hasError ? errors : {},
    hasError,
  };
}
