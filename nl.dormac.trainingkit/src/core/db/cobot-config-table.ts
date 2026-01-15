import { IDartDatabase, logger } from 'dart-api';
import {
  DEBUG,
  EASY_LOADER_TYPES,
  GRIPPER_SUPPLIERS,
  META_LOADER_TYPES,
  MIGRATION,
  PRO_FEEDER_TYPES,
} from '../../config';
import { CobotConfig, CobotConfigHistory } from '../models/cobot-config-types';
import {
  insertCobotConfigHistory,
  insertConfig,
} from '../services/cobot-config-service';

export const COBOT_CONFIG_TABLE_NAME = 'COBOT_CONFIG';
export const COBOT_CONFIG_HISTORY_TABLE_NAME = 'COBOT_CONFIG_HISTORY';

export const COBOT_CONFIG_COLUMN_NAMES: (keyof CobotConfig)[] = [
  'id',
  'config',
  'iteration',
  'createdAt',
  'updatedAt',
  'migration',
];

export const COBOT_CONFIG_HISTORY_COLUMN_NAMES: (keyof CobotConfigHistory)[] = [
  'id',
  'config',
  'iteration',
  'createdAt',
  'migration',
];

export async function createConfigTable(database: IDartDatabase) {
  const configTableExists = await database.hasTable(COBOT_CONFIG_TABLE_NAME);

  if (configTableExists) {
    if (DEBUG) {
      await database.deleteTable(COBOT_CONFIG_TABLE_NAME);
    } else {
      logger.info('COBOT_CONFIG table already exists');
      return;
    }
  }

  logger.info('Creating table COBOT_CONFIG');
  await database.createTable(
    COBOT_CONFIG_TABLE_NAME,
    COBOT_CONFIG_COLUMN_NAMES,
    false,
  );

  const initialConfig = makeInitialConfig();

  logger.info('Inserting initial COBOT_CONFIG');

  await insertConfig(database, initialConfig);

  logger.info('Inserting initial COBOT_CONFIG history entry');

  // Also insert the current config as a history, the fabrications
  // point to a config history.

  await insertCobotConfigHistory(database, {
    id: initialConfig.id,
    config: initialConfig.config,
    createdAt: initialConfig.createdAt,
    iteration: initialConfig.iteration,
    migration: MIGRATION,
  });

  logger.info('Finished creating COBOT_CONFIG table');
}

export async function createConfigHistoryTable(database: IDartDatabase) {
  const configTableExists = await database.hasTable(
    COBOT_CONFIG_HISTORY_TABLE_NAME,
  );

  if (configTableExists) {
    if (DEBUG) {
      await database.deleteTable(COBOT_CONFIG_HISTORY_TABLE_NAME);
    } else {
      logger.info('COBOT_CONFIG_HISTORY table already exists');
      return;
    }
  }

  logger.info('Creating table COBOT_CONFIG_HISTORY');
  await database.createTable(
    COBOT_CONFIG_HISTORY_TABLE_NAME,
    COBOT_CONFIG_HISTORY_COLUMN_NAMES,
    false,
  );

  logger.info('Finished creating COBOT_CONFIG_HISTORY table');
}

export const INITIAL_CONFIG_ID = 'aee02d15-4e30-40d4-89ab-ab7b9894eaee';

export function makeInitialConfig(): CobotConfig {
  return {
    id: INITIAL_CONFIG_ID,
    config: {
      MACHINE_TYPE: 'LATHE',
      MACHINE_HAS_SUB_SPINDLE: true,
      MACHINE_MAX_FEED_HEIGHT: '200',
      MACHINE_MAX_FEED_WIDTH: '100',
      MACHINE_MAX_FEED_LENGTH: '100',
      GR1_SUPPLIER: GRIPPER_SUPPLIERS[0].id,
      GR1_TYPE: GRIPPER_SUPPLIERS[0].grippers[0].id,
      GR1_ADDONS: [],
      GR2_SUPPLIER: GRIPPER_SUPPLIERS[1].id,
      GR2_TYPE: GRIPPER_SUPPLIERS[1].grippers[0].id,
      GR2_ADDONS: [],
      HAS_SECOND_GRIPPER: true,
      GRID_TYPE: 'STATIC',
      STATIC_GRID_INDEX: '0',
      STATIC_GRIDS: [
        {
          name: '7 x 5',
          AMOUNT_SQUARES_X_AXIS: '7',
          AMOUNT_SQUARES_Y_AXIS: '5',
          DRAWER_LEFT_FRONT_TEACH_POSITION: [
            1031.422, -422.576, 166.981, 29.37, 179.91, 0.14,
          ],
          DRAWER_RIGHT_FRONT_TEACH_POSITION: [
            1032.311, 387.519, 165.932, 30.2, -179.98, 0.32,
          ],
          DRAWER_LEFT_BACK_TEACH_POSITION: [
            425.104, -420.18, 166.732, 29.71, -179.47, 0.21,
          ],
          DRAWER_RIGHT_BACK_TEACH_POSITION: [
            425.389, 387.404, 165.473, 30.37, -179.86, 0.19,
          ],
        },
      ],
      GRID_X_OFFSET: '140',
      GRID_Y_OFFSET: '144',
      X_OFFSET_ORIGIN: '0',
      Y_OFFSET_ORIGIN: '0',
      Z_OFFSET_ORIGIN: '0',
      X_FIRST_SPOT: '0',
      Y_FIRST_SPOT: '0',
      TEACH_CONFIG_MAIN_CLAW_PRODUCT_HEIGHT: '95',
      TEACH_CONFIG_MAIN_CLAW_PRODUCT_WIDTH: '65',
      TEACH_CONFIG_MAIN_CLAW_PRODUCT_LENGTH: '65',
      TEACH_CONFIG_SUB_CLAW_PRODUCT_HEIGHT: '95',
      TEACH_CONFIG_SUB_CLAW_PRODUCT_WIDTH: '65',
      TEACH_CONFIG_SUB_CLAW_PRODUCT_LENGTH: '65',
      TEACH_CONFIG_PLACE_SPINDLE_HEIGHT: '0',
      TEACH_CONFIG_PLACE_SPINDLE_DEPTH: '0',
      TEACH_CONFIG_PICK_SPINDLE_HEIGHT: '0',
      TEACH_CONFIG_PICK_SPINDLE_DEPTH: '0',
      TEACH_CONFIG_GR_RAW_HEIGHT: '0',
      TEACH_CONFIG_GR_RAW_DEPTH: '0',
      TEACH_CONFIG_GR_FINISHED_HEIGHT: '0',
      TEACH_CONFIG_GR_FINISHED_DEPTH: '0',
      AIRPURGE_MAIN_CLAW_POSITION_ANGLE: '0',
      AIRPURGE_MAIN_CLAW_POSITION_DISTANCE: '0',
      AIRPURGE_SUB_CLAW_POSITION_ANGLE: '0',
      AIRPURGE_SUB_CLAW_POSITION_DISTANCE: '0',
      DEBUG_CONSTANTLY_LOOP_PROGRAM: false,
      DEBUG_WAIT_FOR_MACHINE_CALL: true,
      DEBUG_WAIT_FOR_MACHINE_DOOR: true,
      DEBUG_CHECK_GRIPPER_STATUS: true,

      FEEDER: 'EASY_LOADER',
      EASY_LOADER: {
        TYPE: EASY_LOADER_TYPES[0].id,
        HAS_SECOND_DRAWER: false,
        SECOND_DRAWER: {
          PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR: [
            { value: [0, 0, 0, 0, 0, 0]},
          ],

          STATIC_GRID_INDEX: '0',

          GRIPPER1_AT_DRAWER_POSITION: [0, 0, 0, 0, 0, 0],
          GRIPPER2_AT_DRAWER_POSITION: [0, 0, 0, 0, 0, 0],
        },
      },
      META_LOADER: {
        TYPE: META_LOADER_TYPES[0].id,
        NUMBER_OF_DRAWERS: '2',
      },
      PRO_FEEDER: {
        TYPE: PRO_FEEDER_TYPES[0].id,
        NUMBER_OF_DRAWERS: '1',
        POSITIONS: [],
      },

      MACHINE_PICK_POSITIONS: [
        { name: 'Main', position: [350, 130.53, 537.55, 180, 180, 45] },
      ],
      
      MACHINE_PLACE_POSITIONS: [
        { name: 'Main', position: [450, 130.53, 537.55, 180, 180, 45] },
      ],

      GRIPPER1_AT_DRAWER_POSITION: [174.393,-5.922873,-104.8974,-132.3923,48.17,-77.29],

      GRIPPER2_AT_DRAWER_POSITION: [174.3929,-5.922991,-104.8986,-132.3921,48.17438,102.71],

      PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR: [
            { value: [168.6272,-11.44457,-94.6041,-179.9502,73.95029,78.54069]},
            { value: [129.7833,8.457839,-109.8477,-179.9743,78.60972,132.06] },
            { value: [67.15302,12.03045,-112.7038,-179.978,79.32769,69.43] },
      ],
      PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE: [
        { value: [80.00526,-36.57523,-52.92179,-179.9291,90.50365,82.3] },
      ],
      PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK: [
        { value: [85.64672,-31.14597,-80.02867,-253.5496,45.69778,155.4013] },
      ],

      PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED: [
        { value: [80.00526,-36.5752,-52.92181,-179.9291,90.50359,173.75] },
      ],
      PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED: [
        { value: [80.00526,-36.5752,-52.92181,-179.9291,90.50359,-6.25] },
      ],
      
    //  Niet meer nodig hebben nu main claw en sub claw positie die we gebruiken. 
      AIRPURGE_BEFORE_INFEED_POSITION: [0, 0, 0, 0, 0, 0],
      PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED: [
        { value: [0, 0, 0, 0, 0, 0] },
      ],
      AIRPURGE_BEFORE_OUTFEED_POSITION: [0, 0, 0, 0, 0, 0],
      
      AIRPURGE_AFTER_OUTFEED_POSITION: [0, 0, 0, 0, 0, 0],
      ///////////////////////

      PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT: [
        { value: [0, 0, 0, 0, 0, 0] },
      ],

      CLEAN_PRODUCT_POSITION: [0, 0, 0, 0, 0, 0],

      DROP_OFF_POSITIONS: [],

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
    },
    iteration: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    migration: MIGRATION,
  };
}
