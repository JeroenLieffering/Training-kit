import {
  EASY_LOADER_TYPES,
  GRIPPER_SUPPLIERS,
  META_LOADER_TYPES,
  MIGRATION,
  PRO_FEEDER_TYPES,
} from '../../config';
import {
  CobotConfig,
  CobotConfigConfig,
  DrawerConfig,
  DropOffPosition,
  StaticGridConfig,
} from '../models/cobot-config-types';

export function staticGridConfig5by4(): StaticGridConfig {
  return {
    name: '5 x 4',

    DRAWER_LEFT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
    DRAWER_RIGHT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
    DRAWER_LEFT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
    DRAWER_RIGHT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],

    AMOUNT_SQUARES_X_AXIS: '5',
    AMOUNT_SQUARES_Y_AXIS: '4',
  };
}

export function makedDropoffPosition(): DropOffPosition {
  return {
    name: 'Dropoff',
    position: [0, 0, 0, 0, 0, 0],
    pathFromOutsideMachineDoor: [{ value: [1, 1, 1, 1, 1, 1] }],
  };
}

export function commonDrawerConfig(): DrawerConfig {
  return {
    PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR: [
      { value: [95, 40, -115, -180, 100, -90] },
      { value: [-25, 40, -115, -180, 100, -90] },
      { value: [-30, -5, -95, -180, 75, -90] },
    ],

    GRIPPER1_AT_DRAWER_POSITION: [105, -5.7, -118.3, -180, -19, -180],
    GRIPPER2_AT_DRAWER_POSITION: [105, -5.7, -118.3, -180, -19, 0],

    STATIC_GRID_INDEX: '0',
  };
}

export function commonCobotConfigConfig(): CobotConfigConfig {
  return {
    ...commonDrawerConfig(),
    MACHINE_TYPE: 'LATHE',
    MACHINE_HAS_SUB_SPINDLE: false,

    MACHINE_PICK_POSITIONS: [
      { name: 'Main', position: [-566.23, 563.14, 5.27, 149.06, -179.74, 0] },
    ],
    MACHINE_PLACE_POSITIONS: [
      { name: 'Main', position: [-760.07, 244.96, -28.9, 176.1, 0.25, 179.93] },
    ],

    MACHINE_MAX_FEED_HEIGHT: '500',
    MACHINE_MAX_FEED_WIDTH: '500',
    MACHINE_MAX_FEED_LENGTH: '500',

    GR1_SUPPLIER: GRIPPER_SUPPLIERS[0].id,
    GR1_TYPE: GRIPPER_SUPPLIERS[0].grippers[0].id,
    GR1_ADDONS: [GRIPPER_SUPPLIERS[0].grippers[0].addons[0].id],
    GR2_SUPPLIER: GRIPPER_SUPPLIERS[1].id,
    GR2_TYPE: GRIPPER_SUPPLIERS[1].grippers[0].id,
    GR2_ADDONS: [],

    HAS_SECOND_GRIPPER: false,
    GRID_TYPE: 'STATIC',

    STATIC_GRIDS: [
      staticGridConfig5by4(),
      {
        name: '7 x 4',

        DRAWER_LEFT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_RIGHT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_LEFT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_RIGHT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],

        AMOUNT_SQUARES_X_AXIS: '7',
        AMOUNT_SQUARES_Y_AXIS: '4',
      },
    ],

    GRID_X_OFFSET: '250',
    GRID_Y_OFFSET: '300',
    X_OFFSET_ORIGIN: '0',
    Y_OFFSET_ORIGIN: '0',
    Z_OFFSET_ORIGIN: '0',

    FEEDER: 'EASY_LOADER',
    META_LOADER: {
      TYPE: '',
      NUMBER_OF_DRAWERS: '',
    },
    PRO_FEEDER: {
      TYPE: '',
      NUMBER_OF_DRAWERS: '1',
      POSITIONS: [],
    },
    EASY_LOADER: {
      TYPE: '',

      HAS_SECOND_DRAWER: false,
      SECOND_DRAWER: commonDrawerConfig(),
    },
    PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE: [
      { value: [-18, -21.5, -109, -209.5, -28, -157] },
    ],
    PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK: [
      { value: [-18, -21.5, -109, -209.5, -28, 23] },
    ],
    // PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW: [
    //   { value: [-15.83, -27.58, -87.5, -180, 64.91, -97.73] },
    // ],
    // AIRPURGE_AT_MAIN_CLAW: [-753.5, 249.6, -27.49, 180, 0, 81.9],
    // PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW: [
    //   { value: [-15.83, -27.58, -87.5, -180, 64.91, -97.73] },
    // ],
    // AIRPURGE_AT_SUB_CLAW: [-753.5, 249.6, -27.49, 180, 0, 81.9],

    PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED: [
      { value: [-15.83, -27.58, -87.5, -180, 64.91, -97.73] },
    ],
    AIRPURGE_BEFORE_INFEED_POSITION: [-753.5, 249.6, -27.49, 180, 0, 81.9],
    PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED: [
      { value: [-15.83, -27.58, -87.5, -180, 64.91, -97.73] },
    ],
    AIRPURGE_BEFORE_OUTFEED_POSITION: [-753.5, 249.6, -27.49, 180, 0, 81.9],
    PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED: [
      { value: [-15.83, -27.58, -87.5, -180, 64.91, -97.73] },
    ],
    AIRPURGE_AFTER_OUTFEED_POSITION: [-753.5, 249.6, -27.49, 180, 0, 81.9],
    PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT: [
      { value: [-45, -21.5, -109, -209.5, -28, 23] },
    ],
    
    CLEAN_PRODUCT_POSITION: [-566.5, 563.5, 29, -0.16, -179.77, 148.82],

    DROP_OFF_POSITIONS: [],

    X_FIRST_SPOT: '',
    Y_FIRST_SPOT: '',

    DEBUG_CONSTANTLY_LOOP_PROGRAM: false,
    DEBUG_WAIT_FOR_MACHINE_CALL: true,
    DEBUG_WAIT_FOR_MACHINE_DOOR: true,
    DEBUG_CHECK_GRIPPER_STATUS: true,

    TEACH_CONFIG_PLACE_SPINDLE_HEIGHT: '',
    TEACH_CONFIG_PLACE_SPINDLE_DEPTH: '',
    TEACH_CONFIG_GR_RAW_HEIGHT: '',
    TEACH_CONFIG_GR_RAW_DEPTH: '',
    TEACH_CONFIG_PICK_SPINDLE_HEIGHT: '',
    TEACH_CONFIG_PICK_SPINDLE_DEPTH: '',
    TEACH_CONFIG_GR_FINISHED_HEIGHT: '',
    TEACH_CONFIG_GR_FINISHED_DEPTH: '',
    TEACH_CONFIG_MAIN_CLAW_PRODUCT_HEIGHT: '',
    TEACH_CONFIG_MAIN_CLAW_PRODUCT_WIDTH: '',
    TEACH_CONFIG_MAIN_CLAW_PRODUCT_LENGTH: '',
    TEACH_CONFIG_SUB_CLAW_PRODUCT_HEIGHT: '',
    TEACH_CONFIG_SUB_CLAW_PRODUCT_WIDTH: '',
    TEACH_CONFIG_SUB_CLAW_PRODUCT_LENGTH: '',

    AIRPURGE_MAIN_CLAW_POSITION_ANGLE: '0',
    AIRPURGE_MAIN_CLAW_POSITION_DISTANCE: '0',
    AIRPURGE_SUB_CLAW_POSITION_ANGLE: '0',
    AIRPURGE_SUB_CLAW_POSITION_DISTANCE: '0',
 

    DO_GRIPPER1_OPEN: { type: 'controller', value: 1 },
    DO_GRIPPER1_CLOSE: { type: 'controller', value: 2 },
    DO_GRIPPER2_OPEN: { type: 'controller', value: 3 },
    DO_GRIPPER2_CLOSE: { type: 'controller', value: 4 },
    DO_AIRPURGE: { type: 'controller', value: 5 },
    DO_MAIN_SPINDLE_OPEN: { type: 'controller', value: 6 },
    DO_MAIN_SPINDLE_CLOSE: { type: 'controller', value: 7 },
    DO_SUB_SPINDLE_OPEN: { type: 'controller', value: 8 },
    DO_SUB_SPINDLE_CLOSE: { type: 'controller', value: 9 },
    DO_REQUEST_NEW_DRAWER: { type: 'controller', value: 10 },
    DO_RUN_MACHINE: { type: 'controller', value: 12 },
    DO_SEND_ALERT: { type: 'controller', value: 13 },

    DI_GRIPPER1_IS_OPENED: { type: 'controller', value: 1 },
    DI_GRIPPER1_IS_CLOSED: { type: 'controller', value: 2 },
    DI_GRIPPER2_IS_OPENED: { type: 'controller', value: 3 },
    DI_GRIPPER2_IS_CLOSED: { type: 'controller', value: 4 },
    DI_DOOR_IS_OPENED: { type: 'controller', value: 5 },
    DI_MAIN_SPINDLE_IS_OPENED: { type: 'controller', value: 6 },
    DI_MAIN_SPINDLE_IS_CLOSED: { type: 'controller', value: 7 },
    DI_SUB_SPINDLE_IS_OPENED: { type: 'controller', value: 8 },
    DI_SUB_SPINDLE_IS_CLOSED: { type: 'controller', value: 9 },
    DI_NEW_DRAWER_IS_REQUESTED: { type: 'controller', value: 10 },
    DI_COBOT_IS_CALLED: { type: 'controller', value: 12 },
    DI_COBOT_CAN_CONTROL_MACHINE: { type: 'controller', value: 13 },
  };
}

export function configEasyloaderWithStaticGrid(): CobotConfig {
  return {
    id: 'f6ca5b48-8b10-429b-81e4-8c84b77fa2f7',
    config: {
      ...commonCobotConfigConfig(),
      MACHINE_HAS_SUB_SPINDLE: true,
      HAS_SECOND_GRIPPER: true,
      FEEDER: 'EASY_LOADER',
      EASY_LOADER: {
        TYPE: EASY_LOADER_TYPES[0].id,

        HAS_SECOND_DRAWER: false,
        SECOND_DRAWER: commonDrawerConfig(),
      },
      GRID_TYPE: 'STATIC',
    },
    iteration: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    migration: MIGRATION,
  };
}

export function configEasyloaderWithPinnedGrid(): CobotConfig {
  return {
    id: 'f6ca5b48-8b10-429b-81e4-8c84b77fa2f7',
    config: {
      ...commonCobotConfigConfig(),
      MACHINE_HAS_SUB_SPINDLE: true,
      HAS_SECOND_GRIPPER: true,
      FEEDER: 'EASY_LOADER',
      EASY_LOADER: {
        TYPE: EASY_LOADER_TYPES[0].id,

        HAS_SECOND_DRAWER: false,
        SECOND_DRAWER: commonDrawerConfig(),
      },
      GRID_TYPE: 'PINNED',
    },
    iteration: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    migration: MIGRATION,
  };
}

export function configProFeederWithPinnedGrid(): CobotConfig {
  return {
    id: 'f6ca5b48-8b10-429b-81e4-8c84b77fa2f7',
    config: {
      ...commonCobotConfigConfig(),
      MACHINE_HAS_SUB_SPINDLE: true,
      HAS_SECOND_GRIPPER: true,
      FEEDER: 'PRO_FEEDER',
      PRO_FEEDER: {
        TYPE: PRO_FEEDER_TYPES[0].id,
        NUMBER_OF_DRAWERS: '1',
        POSITIONS: [],
      },
      GRID_TYPE: 'PINNED',
    },
    iteration: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    migration: MIGRATION,
  };
}

export function configMetaLoaderWithStaticGrid(): CobotConfig {
  return {
    id: 'f6ca5b48-8b10-429b-81e4-8c84b77fa2f7',
    config: {
      ...commonCobotConfigConfig(),
      MACHINE_HAS_SUB_SPINDLE: true,
      HAS_SECOND_GRIPPER: true,
      FEEDER: 'META_LOADER',
      META_LOADER: {
        TYPE: META_LOADER_TYPES[0].id,
        NUMBER_OF_DRAWERS: '5',
      },
      GRID_TYPE: 'STATIC',
    },
    iteration: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    migration: MIGRATION,
  };
}

export function configMetaLoaderWithPinnedGrid(): CobotConfig {
  return {
    id: 'f6ca5b48-8b10-429b-81e4-8c84b77fa2f7',
    config: {
      ...commonCobotConfigConfig(),
      MACHINE_HAS_SUB_SPINDLE: true,
      HAS_SECOND_GRIPPER: true,
      FEEDER: 'META_LOADER',
      META_LOADER: {
        TYPE: META_LOADER_TYPES[0].id,
        NUMBER_OF_DRAWERS: '5',
      },
      GRID_TYPE: 'PINNED',
    },
    iteration: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    migration: MIGRATION,
  };
}
