import { FieldErrors } from 'react-hook-form';
import { DEMO, DEMO_MAX_DRAWER_AMOUNT } from '../../config';
import { CobotConfig } from '../models/cobot-config-types';
import {
  isConfiguredWithStaticEasyLoaderWithSecondDrawer,
  isConfiguredWithStaticGrid,
  isConfiguredWithSupportForMultipleDrawers,
} from '../services/cobot-config-service';
import { getErrors, Validator } from './utils';
import {
  arraySize,
  isIOPortUnique,
  isNumeric,
  maxLength,
  numberBetween,
  required,
  validCobotPosition,
  validIORange,
} from './validators';

export function cobotConfigValidator(cobotConfig: CobotConfig) {
  const isGridStatic = isConfiguredWithStaticGrid(cobotConfig);
  const isGridPinned = !isGridStatic;

  const hasSecondDrawer =
    isConfiguredWithStaticEasyLoaderWithSecondDrawer(cobotConfig);

  const validators: Validator<CobotConfig>[] = [
    {
      name: 'config.GRID_TYPE',
      label: 'GRID_TYPE',
      validator: () => {
        if (
          cobotConfig.config.FEEDER === 'EASY_LOADER' &&
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER &&
          cobotConfig.config.GRID_TYPE === 'PINNED'
        ) {
          return {
            type: 'GRID_TYPE_MUST_BE_STATIC_WHEN_HAS_SECOND_DRAWER_IS_ON',
          };
        }

        if (
          cobotConfig.config.FEEDER === 'PRO_FEEDER' &&
          cobotConfig.config.GRID_TYPE === 'STATIC'
        ) {
          return {
            type: 'GRID_TYPE_MUST_BE_PINNED_WHEN_USING_PRO_FEEDER',
          };
        }
      },
    },
    {
      name: 'config.GRID_X_OFFSET',
      label: 'GRID_X_OFFSET',
      validator: () => {
        if (isGridStatic) {
          return undefined;
        }

        const value = cobotConfig.config.GRID_X_OFFSET;

        return [isNumeric(value), numberBetween(value, 50, 350)];
      },
    },
    {
      name: 'config.GRID_Y_OFFSET',
      label: 'GRID_Y_OFFSET',
      validator: () => {
        if (isGridStatic) {
          return undefined;
        }

        const value = cobotConfig.config.GRID_Y_OFFSET;

        return [isNumeric(value), numberBetween(value, 50, 300)];
      },
    },
    {
      name: 'config.X_OFFSET_ORIGIN',
      label: 'X_OFFSET_ORIGIN',
      validator: () => {
        if (isGridStatic) {
          return undefined;
        }

        const value = cobotConfig.config.X_OFFSET_ORIGIN;

        return [isNumeric(value), numberBetween(value, 0, 300)];
      },
    },
    {
      name: 'config.Y_OFFSET_ORIGIN',
      label: 'Y_OFFSET_ORIGIN',
      validator: () => {
        if (isGridStatic) {
          return undefined;
        }

        const value = cobotConfig.config.Y_OFFSET_ORIGIN;

        return [isNumeric(value), numberBetween(value, 0, 300)];
      },
    },
    {
      name: 'config.Z_OFFSET_ORIGIN',
      label: 'Z_OFFSET_ORIGIN',
      validator: () => {
        if (isGridStatic) {
          return undefined;
        }

        const value = cobotConfig.config.Z_OFFSET_ORIGIN;

        return [isNumeric(value), numberBetween(value, 0, 300)];
      },
    },

    {
      name: 'config.MACHINE_HAS_SUB_SPINDLE',
      label: 'MACHINE_HAS_SUB_SPINDLE',
      validator: () => {
        if (
          cobotConfig.config.MACHINE_TYPE === 'MILL' &&
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE
        ) {
          return {
            type: 'MILL_CANNOT_HAVE_A_SUB_SPINDLE',
          };
        }
      },
    },
    {
      name: 'config.MACHINE_MAX_FEED_HEIGHT',
      label: 'MACHINE_MAX_FEED_HEIGHT',
      validator: () => {
        const value = cobotConfig.config.MACHINE_MAX_FEED_HEIGHT;

        return [isNumeric(value), numberBetween(value, 0.1, 1000)];
      },
    },
    {
      name: 'config.MACHINE_MAX_FEED_LENGTH',
      label: 'MACHINE_MAX_FEED_LENGTH',
      validator: () => {
        const value = cobotConfig.config.MACHINE_MAX_FEED_LENGTH;

        return [isNumeric(value), numberBetween(value, 0.1, 1000)];
      },
    },

    {
      name: 'config.MACHINE_MAX_FEED_WIDTH',
      label: 'MACHINE_MAX_FEED_WIDTH',
      validator: () => {
        const value = cobotConfig.config.MACHINE_MAX_FEED_WIDTH;

        return [isNumeric(value), numberBetween(value, 0.1, 1000)];
      },
    },

    {
      name: 'config.META_LOADER.NUMBER_OF_DRAWERS',
      label: 'NUMBER_OF_DRAWERS',
      validator: () => {
        if (cobotConfig.config.FEEDER !== 'META_LOADER') {
          return undefined;
        }

        const value = cobotConfig.config.META_LOADER.NUMBER_OF_DRAWERS;

        const max =
          DEMO && DEMO_MAX_DRAWER_AMOUNT ? DEMO_MAX_DRAWER_AMOUNT : 24;

        return [isNumeric(value), numberBetween(value, 1, max)];
      },
    },
    {
      name: 'config.PRO_FEEDER.NUMBER_OF_DRAWERS',
      label: 'NUMBER_OF_DRAWERS',
      validator: () => {
        if (cobotConfig.config.FEEDER !== 'PRO_FEEDER') {
          return undefined;
        }

        const value = cobotConfig.config.PRO_FEEDER.NUMBER_OF_DRAWERS;

        const max =
          DEMO && DEMO_MAX_DRAWER_AMOUNT ? DEMO_MAX_DRAWER_AMOUNT : 24;

        return [isNumeric(value), numberBetween(value, 1, max)];
      },
    },

    {
      name: 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE',
      label: 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE',
      validator: () => {
        const value =
          cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE;

        return [
          arraySize(value, 0, 5),
          ...value.map((p) => validCobotPosition(p.value)),
        ];
      },
    },
    {
      name: 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK',
      label: 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK',
      validator: () => {
        const value =
          cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK;

        return [
          arraySize(value, 0, 5),
          ...value.map((p) => validCobotPosition(p.value)),
        ];
      },
    },
    // {
    //   name: 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW',
    //   label: 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW',
    //   validator: () => {
    //     const value =
    //       cobotConfig.config
    //         .PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW;

    //     return [
    //       arraySize(value, 0, 5),
    //       ...value.map((p) => validCobotPosition(p.value)),
    //     ];
    //   },
    // },
    // {
    //   name: 'config.AIRPURGE_AT_MAIN_CLAW',
    //   label: 'AIRPURGE_AT_MAIN_CLAW',
    //   validator: () => {
    //     return [
    //       validCobotPosition(
    //         cobotConfig.config.AIRPURGE_AT_MAIN_CLAW,
    //       ),
    //     ];
    //   },
    // },
    // {
    //   name: 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW',
    //   label: 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW',
    //   validator: () => {
    //     const value =
    //       cobotConfig.config
    //         .PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW;

    //     return [
    //       arraySize(value, 0, 5),
    //       ...value.map((p) => validCobotPosition(p.value)),
    //     ];
    //   },
    // },
    // {
    //   name: 'config.AIRPURGE_AT_SUB_CLAW',
    //   label: 'AIRPURGE_AT_SUB_CLAW',
    //   validator: () => {
    //     return [
    //       validCobotPosition(
    //         cobotConfig.config.AIRPURGE_AT_SUB_CLAW,
    //       ),
    //     ];
    //   },
    // },

    {
      name: 'config.AIRPURGE_BEFORE_INFEED_POSITION',
      label: 'AIRPURGE_BEFORE_INFEED_POSITION',
      validator: () => {
        return [
          validCobotPosition(
            cobotConfig.config.AIRPURGE_BEFORE_INFEED_POSITION,
          ),
        ];
      },
    },
    {
      name: 'config.AIRPURGE_BEFORE_OUTFEED_POSITION',
      label: 'AIRPURGE_BEFORE_OUTFEED_POSITION',
      validator: () => {
        return [
          validCobotPosition(
            cobotConfig.config.AIRPURGE_BEFORE_OUTFEED_POSITION,
          ),
        ];
      },
    },
    {
      name: 'config.AIRPURGE_AFTER_OUTFEED_POSITION',
      label: 'AIRPURGE_AFTER_OUTFEED_POSITION',
      validator: () => {
        return [
          validCobotPosition(
            cobotConfig.config.AIRPURGE_AFTER_OUTFEED_POSITION,
          ),
        ];
      },
    },
    {
      name: 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED',
      label: 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED',
      validator: () => {
        const value =
          cobotConfig.config
            .PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED;

        return [
          arraySize(value, 0, 5),
          ...value.map((p) => validCobotPosition(p.value)),
        ];
      },
    },
    {
      name: 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED',
      label: 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED',
      validator: () => {
        const value =
          cobotConfig.config
            .PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED;

        return [
          arraySize(value, 0, 5),
          ...value.map((p) => validCobotPosition(p.value)),
        ];
      },
    },
    {
      name: 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED',
      label: 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED',
      validator: () => {
        const value =
          cobotConfig.config
            .PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED;

        return [
          arraySize(value, 0, 5),
          ...value.map((p) => validCobotPosition(p.value)),
        ];
      },
    },
    {
      name: 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT',
      label: 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT',
      validator: () => {
        const value =
          cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT;

        return [
          arraySize(value, 0, 5),
          ...value.map((p) => validCobotPosition(p.value)),
        ];
      },
    },
    {
      name: 'config.CLEAN_PRODUCT_POSITION',
      label: 'CLEAN_PRODUCT_POSITION',
      validator: () => {
        return [validCobotPosition(cobotConfig.config.CLEAN_PRODUCT_POSITION)];
      },
    },

    {
      name: 'config.MACHINE_PICK_POSITIONS',
      label: 'MACHINE_PICK_POSITIONS',
      validator: () => {
        return [arraySize(cobotConfig.config.MACHINE_PICK_POSITIONS, 1, 10)];
      },
    },
    ...cobotConfig.config.MACHINE_PICK_POSITIONS.map<Validator<CobotConfig>>(
      (machinePosition, index) => ({
        name: `config.MACHINE_PICK_POSITIONS.${index}.name`,
        label: 'NAME',
        validator: () => {
          const value = machinePosition.name;

          if (cobotConfig.config.MACHINE_TYPE === 'LATHE') {
            return [maxLength(value, 100)];
          } else {
            return [required(value), maxLength(value, 100)];
          }
        },
      }),
    ),
    ...cobotConfig.config.MACHINE_PICK_POSITIONS.map<Validator<CobotConfig>>(
      (machinePosition, index) => ({
        name: `config.MACHINE_PICK_POSITIONS.${index}.position`,
        label: 'MACHINE_PICK_POSITIONS',
        validator: () => {
          return [validCobotPosition(machinePosition.position)];
        },
      }),
    ),

    {
      name: 'config.MACHINE_PLACE_POSITIONS',
      label: 'MACHINE_PLACE_POSITIONS',
      validator: () => {
        return [arraySize(cobotConfig.config.MACHINE_PLACE_POSITIONS, 1, 10)];
      },
    },
    ...cobotConfig.config.MACHINE_PLACE_POSITIONS.map<Validator<CobotConfig>>(
      (machinePosition, index) => ({
        name: `config.MACHINE_PLACE_POSITIONS.${index}.name`,
        label: 'NAME',
        validator: () => {
          const value = machinePosition.name;

          if (cobotConfig.config.MACHINE_TYPE === 'LATHE') {
            return [maxLength(value, 100)];
          } else {
            return [required(value), maxLength(value, 100)];
          }
        },
      }),
    ),
    ...cobotConfig.config.MACHINE_PLACE_POSITIONS.map<Validator<CobotConfig>>(
      (machinePosition, index) => ({
        name: `config.MACHINE_PLACE_POSITIONS.${index}.position`,
        label: 'MACHINE_PLACE_POSITIONS',
        validator: () => {
          return [validCobotPosition(machinePosition.position)];
        },
      }),
    ),

    // {
    //   name: 'config.STATIC_GRIDS',
    //   label: 'STATIC_GRIDS',
    //   validator: () => {
    //     return [arraySize(cobotConfig.config.STATIC_GRIDS, 0, 10)];
    //   },
    // },
    // {
    //   name: 'config.STATIC_GRID_INDEX',
    //   label: 'STATIC_GRID_CONFIGURATION',
    //   validator: () => {
    //     if (isGridPinned) {
    //       return undefined;
    //     }

    //     const value = cobotConfig.config.STATIC_GRID_INDEX;

    //     if (value === '') {
    //       return {
    //         type: 'REQUIRED',
    //       };
    //     }

    //     const index = parseFloat(value);

    //     if (!cobotConfig.config.STATIC_GRIDS[index]) {
    //       return { type: 'UNDEFINED_STATIC_GRID_CONFIGURATION' };
    //     }
    //   },
    // },

    // ...cobotConfig.config.STATIC_GRIDS.map<Validator<CobotConfig>>(
    //   (staticGrid, index) => ({
    //     name: `config.STATIC_GRIDS.${index}.name`,
    //     label: 'NAME',
    //     validator: () => {
    //       const value = staticGrid.name;

    //       return [required(value), maxLength(value, 100)];
    //     },
    //   }),
    // ),

    // ...cobotConfig.config.STATIC_GRIDS.map<Validator<CobotConfig>>(
    //   (staticGrid, index) => ({
    //     name: `config.STATIC_GRIDS.${index}.AMOUNT_SQUARES_X_AXIS`,
    //     label: 'AMOUNT_SQUARES_X_AXIS',
    //     validator: () => {
    //       const value = staticGrid.AMOUNT_SQUARES_X_AXIS;

    //       return [isNumeric(value), numberBetween(value, 1, 50)];
    //     },
    //   }),
    // ),

    // ...cobotConfig.config.STATIC_GRIDS.map<Validator<CobotConfig>>(
    //   (staticGrid, index) => ({
    //     name: `config.STATIC_GRIDS.${index}.AMOUNT_SQUARES_Y_AXIS`,
    //     label: 'AMOUNT_SQUARES_Y_AXIS',
    //     validator: () => {
    //       const value = staticGrid.AMOUNT_SQUARES_Y_AXIS;

    //       return [isNumeric(value), numberBetween(value, 1, 50)];
    //     },
    //   }),
    // ),

    // ...cobotConfig.config.STATIC_GRIDS.map<Validator<CobotConfig>>(
    //   (staticGrid, index) => ({
    //     name: `config.STATIC_GRIDS.${index}.DRAWER_LEFT_FRONT_TEACH_POSITION`,
    //     label: 'DRAWER_LEFT_FRONT_TEACH_POSITION',
    //     validator: () => {
    //       const value = staticGrid.DRAWER_LEFT_FRONT_TEACH_POSITION;

    //       return [validCobotPosition(value)];
    //     },
    //   }),
    // ),

    // ...cobotConfig.config.STATIC_GRIDS.map<Validator<CobotConfig>>(
    //   (staticGrid, index) => ({
    //     name: `config.STATIC_GRIDS.${index}.DRAWER_LEFT_BACK_TEACH_POSITION`,
    //     label: 'DRAWER_LEFT_BACK_TEACH_POSITION',
    //     validator: () => {
    //       const value = staticGrid.DRAWER_LEFT_BACK_TEACH_POSITION;

    //       return [validCobotPosition(value)];
    //     },
    //   }),
    // ),

    // ...cobotConfig.config.STATIC_GRIDS.map<Validator<CobotConfig>>(
    //   (staticGrid, index) => ({
    //     name: `config.STATIC_GRIDS.${index}.DRAWER_RIGHT_FRONT_TEACH_POSITION`,
    //     label: 'DRAWER_RIGHT_FRONT_TEACH_POSITION',
    //     validator: () => {
    //       const value = staticGrid.DRAWER_RIGHT_FRONT_TEACH_POSITION;

    //       return [validCobotPosition(value)];
    //     },
    //   }),
    // ),

    // ...cobotConfig.config.STATIC_GRIDS.map<Validator<CobotConfig>>(
    //   (staticGrid, index) => ({
    //     name: `config.STATIC_GRIDS.${index}.DRAWER_RIGHT_BACK_TEACH_POSITION`,
    //     label: 'DRAWER_RIGHT_BACK_TEACH_POSITION',
    //     validator: () => {
    //       const value = staticGrid.DRAWER_RIGHT_BACK_TEACH_POSITION;

    //       return [validCobotPosition(value)];
    //     },
    //   }),
    // ),

    {
      name: 'config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX',
      label: 'STATIC_GRID_CONFIGURATION',
      validator: () => {
        if (!hasSecondDrawer) {
          return undefined;
        }

        const value =
          cobotConfig.config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX;

        if (value === '') {
          return {
            type: 'REQUIRED',
          };
        }

        const index = parseFloat(value);

        if (!cobotConfig.config.STATIC_GRIDS[index]) {
          return { type: 'UNDEFINED_STATIC_GRID_CONFIGURATION' };
        }
      },
    },
    {
      name: 'config.EASY_LOADER.SECOND_DRAWER.GRIPPER1_AT_DRAWER_POSITION',
      label: 'GRIPPER1_AT_DRAWER_POSITION',
      validator: () => {
        if (!hasSecondDrawer) {
          return undefined;
        }

        return [
          validCobotPosition(
            cobotConfig.config.EASY_LOADER.SECOND_DRAWER
              .GRIPPER1_AT_DRAWER_POSITION,
          ),
        ];
      },
    },
    {
      name: 'config.EASY_LOADER.SECOND_DRAWER.GRIPPER2_AT_DRAWER_POSITION',
      label: 'GRIPPER2_AT_DRAWER_POSITION',
      validator: () => {
        if (!hasSecondDrawer || !cobotConfig.config.HAS_SECOND_GRIPPER) {
          return undefined;
        }

        return [
          validCobotPosition(
            cobotConfig.config.EASY_LOADER.SECOND_DRAWER
              .GRIPPER2_AT_DRAWER_POSITION,
          ),
        ];
      },
    },
    {
      name: 'config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
      label: 'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
      validator: () => {
        if (!hasSecondDrawer) {
          return undefined;
        }

        const value =
          cobotConfig.config.EASY_LOADER.SECOND_DRAWER
            .PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR;

        return [
          arraySize(value, 1, 10),
          ...value.map((p) => validCobotPosition(p.value)),
        ];
      },
    },
    {
      name: 'config.GRIPPER1_AT_DRAWER_POSITION',
      label: 'GRIPPER1_AT_DRAWER_POSITION',
      validator: () => {
        return [
          validCobotPosition(cobotConfig.config.GRIPPER1_AT_DRAWER_POSITION),
        ];
      },
    },
    {
      name: 'config.GRIPPER2_AT_DRAWER_POSITION',
      label: 'GRIPPER2_AT_DRAWER_POSITION',
      validator: () => {
        if (!cobotConfig.config.HAS_SECOND_GRIPPER) {
          return;
        }

        return [
          validCobotPosition(cobotConfig.config.GRIPPER2_AT_DRAWER_POSITION),
        ];
      },
    },
    {
      name: 'config.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
      label: 'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
      validator: () => {
        const value =
          cobotConfig.config.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR;

        return [
          arraySize(value, 1, 10),
          ...value.map((p) => validCobotPosition(p.value)),
        ];
      },
    },
    {
      name: 'config.DO_GRIPPER1_OPEN',
      label: 'DO_GRIPPER1_OPEN',
      validator: () => {
        const io = cobotConfig.config.DO_GRIPPER1_OPEN;

        return [
          validIORange(io),
          isIOPortUnique('DO_GRIPPER1_OPEN', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_GRIPPER1_CLOSE',
      label: 'DO_GRIPPER1_CLOSE',
      validator: () => {
        const io = cobotConfig.config.DO_GRIPPER1_CLOSE;

        return [
          validIORange(io),
          isIOPortUnique('DO_GRIPPER1_CLOSE', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_GRIPPER2_OPEN',
      label: 'DO_GRIPPER2_OPEN',
      validator: () => {
        if (!cobotConfig.config.HAS_SECOND_GRIPPER) {
          return;
        }

        const io = cobotConfig.config.DO_GRIPPER2_OPEN;

        return [
          validIORange(io),
          isIOPortUnique('DO_GRIPPER2_OPEN', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_GRIPPER2_CLOSE',
      label: 'DO_GRIPPER2_CLOSE',
      validator: () => {
        if (!cobotConfig.config.HAS_SECOND_GRIPPER) {
          return;
        }

        const io = cobotConfig.config.DO_GRIPPER2_CLOSE;

        return [
          validIORange(io),
          isIOPortUnique('DO_GRIPPER2_CLOSE', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_AIRPURGE',
      label: 'DO_AIRPURGE',
      validator: () => {
        const io = cobotConfig.config.DO_AIRPURGE;

        return [
          validIORange(io),
          isIOPortUnique('DO_AIRPURGE', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_MAIN_SPINDLE_OPEN',
      label: 'DO_MAIN_SPINDLE_OPEN',
      validator: () => {
        const io = cobotConfig.config.DO_MAIN_SPINDLE_OPEN;

        return [
          validIORange(io),
          isIOPortUnique('DO_MAIN_SPINDLE_OPEN', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_MAIN_SPINDLE_CLOSE',
      label: 'DO_MAIN_SPINDLE_CLOSE',
      validator: () => {
        const io = cobotConfig.config.DO_MAIN_SPINDLE_CLOSE;

        return [
          validIORange(io),
          isIOPortUnique('DO_MAIN_SPINDLE_CLOSE', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_SUB_SPINDLE_OPEN',
      label: 'DO_SUB_SPINDLE_OPEN',
      validator: () => {
        if (!cobotConfig.config.MACHINE_HAS_SUB_SPINDLE) {
          return;
        }

        const io = cobotConfig.config.DO_SUB_SPINDLE_OPEN;

        return [
          validIORange(io),
          isIOPortUnique('DO_SUB_SPINDLE_OPEN', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_SUB_SPINDLE_CLOSE',
      label: 'DO_SUB_SPINDLE_CLOSE',
      validator: () => {
        if (!cobotConfig.config.MACHINE_HAS_SUB_SPINDLE) {
          return;
        }

        const io = cobotConfig.config.DO_SUB_SPINDLE_CLOSE;

        return [
          validIORange(io),
          isIOPortUnique('DO_SUB_SPINDLE_CLOSE', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_REQUEST_NEW_DRAWER',
      label: 'DO_REQUEST_NEW_DRAWER',
      validator: () => {
        if (!isConfiguredWithSupportForMultipleDrawers(cobotConfig)) {
          return;
        }

        const io = cobotConfig.config.DO_REQUEST_NEW_DRAWER;

        return [
          validIORange(io),
          isIOPortUnique('DO_REQUEST_NEW_DRAWER', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_RUN_MACHINE',
      label: 'DO_RUN_MACHINE',
      validator: () => {
        const io = cobotConfig.config.DO_RUN_MACHINE;

        return [
          validIORange(io),
          isIOPortUnique('DO_RUN_MACHINE', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DO_SEND_ALERT',
      label: 'DO_SEND_ALERT',
      validator: () => {
        const io = cobotConfig.config.DO_SEND_ALERT;

        return [
          validIORange(io),
          isIOPortUnique('DO_SEND_ALERT', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_GRIPPER1_IS_OPENED',
      label: 'DI_GRIPPER1_IS_OPENED',
      validator: () => {
        const io = cobotConfig.config.DI_GRIPPER1_IS_OPENED;

        return [
          validIORange(io),
          isIOPortUnique('DI_GRIPPER1_IS_OPENED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_GRIPPER1_IS_CLOSED',
      label: 'DI_GRIPPER1_IS_CLOSED',
      validator: () => {
        const io = cobotConfig.config.DI_GRIPPER1_IS_CLOSED;

        return [
          validIORange(io),
          isIOPortUnique('DI_GRIPPER1_IS_CLOSED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_GRIPPER2_IS_OPENED',
      label: 'DI_GRIPPER2_IS_OPENED',
      validator: () => {
        if (!cobotConfig.config.HAS_SECOND_GRIPPER) {
          return;
        }

        const io = cobotConfig.config.DI_GRIPPER2_IS_OPENED;

        return [
          validIORange(io),
          isIOPortUnique('DI_GRIPPER2_IS_OPENED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_GRIPPER2_IS_CLOSED',
      label: 'DI_GRIPPER2_IS_CLOSED',
      validator: () => {
        if (!cobotConfig.config.HAS_SECOND_GRIPPER) {
          return;
        }

        const io = cobotConfig.config.DI_GRIPPER2_IS_CLOSED;

        return [
          validIORange(io),
          isIOPortUnique('DI_GRIPPER2_IS_CLOSED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_DOOR_IS_OPENED',
      label: 'DI_DOOR_IS_OPENED',
      validator: () => {
        const io = cobotConfig.config.DI_DOOR_IS_OPENED;

        return [
          validIORange(io),
          isIOPortUnique('DI_DOOR_IS_OPENED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_MAIN_SPINDLE_IS_OPENED',
      label: 'DI_MAIN_SPINDLE_IS_OPENED',
      validator: () => {
        const io = cobotConfig.config.DI_MAIN_SPINDLE_IS_OPENED;

        return [
          validIORange(io),
          isIOPortUnique('DI_MAIN_SPINDLE_IS_OPENED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_MAIN_SPINDLE_IS_CLOSED',
      label: 'DI_MAIN_SPINDLE_IS_CLOSED',
      validator: () => {
        const io = cobotConfig.config.DI_MAIN_SPINDLE_IS_CLOSED;

        return [
          validIORange(io),
          isIOPortUnique('DI_MAIN_SPINDLE_IS_CLOSED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_SUB_SPINDLE_IS_OPENED',
      label: 'DI_SUB_SPINDLE_IS_OPENED',
      validator: () => {
        if (!cobotConfig.config.MACHINE_HAS_SUB_SPINDLE) {
          return;
        }

        const io = cobotConfig.config.DI_SUB_SPINDLE_IS_OPENED;

        return [
          validIORange(io),
          isIOPortUnique('DI_SUB_SPINDLE_IS_OPENED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_SUB_SPINDLE_IS_CLOSED',
      label: 'DI_SUB_SPINDLE_IS_CLOSED',
      validator: () => {
        if (!cobotConfig.config.MACHINE_HAS_SUB_SPINDLE) {
          return;
        }

        const io = cobotConfig.config.DI_SUB_SPINDLE_IS_CLOSED;

        return [
          validIORange(io),
          isIOPortUnique('DI_SUB_SPINDLE_IS_CLOSED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_NEW_DRAWER_IS_REQUESTED',
      label: 'DI_NEW_DRAWER_IS_REQUESTED',
      validator: () => {
        if (!isConfiguredWithSupportForMultipleDrawers(cobotConfig)) {
          return;
        }

        const io = cobotConfig.config.DI_NEW_DRAWER_IS_REQUESTED;

        return [
          validIORange(io),
          isIOPortUnique('DI_NEW_DRAWER_IS_REQUESTED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_COBOT_IS_CALLED',
      label: 'DI_COBOT_IS_CALLED',
      validator: () => {
        const io = cobotConfig.config.DI_COBOT_IS_CALLED;

        return [
          validIORange(io),
          isIOPortUnique('DI_COBOT_IS_CALLED', io, cobotConfig),
        ];
      },
    },
    {
      name: 'config.DI_COBOT_CAN_CONTROL_MACHINE',
      label: 'DI_COBOT_CAN_CONTROL_MACHINE',
      validator: () => {
        const io = cobotConfig.config.DI_COBOT_CAN_CONTROL_MACHINE;

        return [
          validIORange(io),
          isIOPortUnique('DI_COBOT_CAN_CONTROL_MACHINE', io, cobotConfig),
        ];
      },
    },

    {
      name: 'config.DROP_OFF_POSITIONS',
      label: 'DROP_OFF_POSITIONS',
      validator: () => {
        return [arraySize(cobotConfig.config.DROP_OFF_POSITIONS, 0, 10)];
      },
    },
    ...cobotConfig.config.DROP_OFF_POSITIONS.map<Validator<CobotConfig>>(
      (dropOffPosition, index) => ({
        name: `config.DROP_OFF_POSITIONS.${index}.name`,
        label: 'NAME',
        validator: () => {
          const value = dropOffPosition.name;

          return [required(value), maxLength(value, 100)];
        },
      }),
    ),
    ...cobotConfig.config.DROP_OFF_POSITIONS.map<Validator<CobotConfig>>(
      (dropOffPosition, index) => ({
        name: `config.DROP_OFF_POSITIONS.${index}.position`,
        label: 'DROP_OFF_POSITION',
        validator: () => {
          return [validCobotPosition(dropOffPosition.position)];
        },
      }),
    ),
    ...cobotConfig.config.DROP_OFF_POSITIONS.map<Validator<CobotConfig>>(
      (dropOffPosition, index) => ({
        name: `config.DROP_OFF_POSITIONS.${index}.pathFromOutsideMachineDoor`,
        label: 'PATH_FROM_DROP_OFF_POSITION_TO_OUTSIDE_MACHINE_DOOR',
        validator: () => {
          const value = dropOffPosition.pathFromOutsideMachineDoor;

          return [
            arraySize(value, 0, 5),
            ...value.map((p) => validCobotPosition(p.value)),
          ];
        },
      }),
    ),
  ];

  const errors: FieldErrors<CobotConfig> = getErrors(validators);

  const hasError = Object.keys(errors).length > 0;

  return {
    values: hasError ? {} : cobotConfig,
    errors: hasError ? errors : {},
  };
}
