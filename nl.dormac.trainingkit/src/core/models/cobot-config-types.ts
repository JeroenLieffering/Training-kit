import { SixNumArray } from 'dart-api';
import { PickStartingWith } from '../../utils/typescript';

export type CobotConfig = {
  id: string;
  config: CobotConfigConfig;
  // Each save increases the iteration
  iteration: number;
  createdAt: string;
  updatedAt: string;
  // The current migration version, used whenever there is an update
  // of the application to migrate the `Product` to the latest
  // database version.
  migration: number;
};

export type CobotConfigHistory = {
  id: string;
  config: CobotConfigConfig;
  iteration: number;
  createdAt: string;
  // The current migration version, used whenever there is an update
  // of the application to migrate the `Product` to the latest
  // database version.
  migration: number;
};

export type MachineType = 'LATHE' | 'MILL';

export type FeederType = 'EASY_LOADER' | 'PRO_FEEDER' | 'META_LOADER';

export type GridType = 'STATIC' | 'PINNED';

export type DrawerConfig = {
  PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR: Positions[]; // JOINT

  GRIPPER1_AT_DRAWER_POSITION: SixNumArray; // JOINT
  GRIPPER2_AT_DRAWER_POSITION: SixNumArray; // JOINT
  STATIC_GRID_INDEX: string;
};

export type StaticGridConfig = {
  name: string;

  DRAWER_LEFT_FRONT_TEACH_POSITION: SixNumArray; // TASK
  DRAWER_RIGHT_FRONT_TEACH_POSITION: SixNumArray; // TASK
  DRAWER_LEFT_BACK_TEACH_POSITION: SixNumArray; // TASK
  DRAWER_RIGHT_BACK_TEACH_POSITION: SixNumArray; // TASK

  // The squares available on the static grid
  AMOUNT_SQUARES_X_AXIS: string;
  AMOUNT_SQUARES_Y_AXIS: string;
};

export type DropOffPosition = {
  name: string;
  position: SixNumArray; // TASK
  pathFromOutsideMachineDoor: Positions[]; // JOINT
};

export type MachinePosition = {
  name: string;
  position: SixNumArray; // TASK
};

export type CobotConfigConfig = DrawerConfig & {
  HAS_SECOND_GRIPPER: boolean;

  GR1_SUPPLIER: string;
  GR1_TYPE: string;
  GR1_ADDONS: string[];

  GR2_SUPPLIER: string;
  GR2_TYPE: string;
  GR2_ADDONS: string[];

  MACHINE_TYPE: MachineType;

  MACHINE_HAS_SUB_SPINDLE: boolean;
  MACHINE_MAX_FEED_HEIGHT: string;
  MACHINE_MAX_FEED_LENGTH: string;
  MACHINE_MAX_FEED_WIDTH: string;

  DEBUG_CONSTANTLY_LOOP_PROGRAM: boolean;
  DEBUG_WAIT_FOR_MACHINE_CALL: boolean;
  DEBUG_WAIT_FOR_MACHINE_DOOR: boolean;
  DEBUG_CHECK_GRIPPER_STATUS: boolean;

  FEEDER: FeederType;

  GRID_TYPE: GridType;

  // These are pinned grid configs and only need to be stored once
  GRID_X_OFFSET: string;
  GRID_Y_OFFSET: string;
  X_OFFSET_ORIGIN: string;
  Y_OFFSET_ORIGIN: string;
  Z_OFFSET_ORIGIN: string;
  X_FIRST_SPOT: string;
  Y_FIRST_SPOT: string;

  // Stores all configured static grids one has to be chosen by
  // index via the `STATIC_GRID_INDEX` field.
  STATIC_GRIDS: StaticGridConfig[];

  TEACH_CONFIG_MAIN_CLAW_PRODUCT_HEIGHT: string;
  TEACH_CONFIG_MAIN_CLAW_PRODUCT_WIDTH: string;
  TEACH_CONFIG_MAIN_CLAW_PRODUCT_LENGTH: string;
  TEACH_CONFIG_SUB_CLAW_PRODUCT_HEIGHT: string;
  TEACH_CONFIG_SUB_CLAW_PRODUCT_WIDTH: string;
  TEACH_CONFIG_SUB_CLAW_PRODUCT_LENGTH: string;

  TEACH_CONFIG_PLACE_SPINDLE_HEIGHT: string;
  TEACH_CONFIG_PLACE_SPINDLE_DEPTH: string;
  TEACH_CONFIG_GR_RAW_HEIGHT: string;
  TEACH_CONFIG_GR_RAW_DEPTH: string;

  TEACH_CONFIG_PICK_SPINDLE_HEIGHT: string;
  TEACH_CONFIG_PICK_SPINDLE_DEPTH: string;
  TEACH_CONFIG_GR_FINISHED_HEIGHT: string;
  TEACH_CONFIG_GR_FINISHED_DEPTH: string;

  AIRPURGE_MAIN_CLAW_POSITION_ANGLE: string;
  AIRPURGE_MAIN_CLAW_POSITION_DISTANCE: string;
  AIRPURGE_SUB_CLAW_POSITION_ANGLE: string;
  AIRPURGE_SUB_CLAW_POSITION_DISTANCE: string;

  EASY_LOADER: {
    TYPE: string;

    HAS_SECOND_DRAWER: boolean;
    SECOND_DRAWER: DrawerConfig;
  };
  META_LOADER: {
    TYPE: string;
    NUMBER_OF_DRAWERS: string;
  };
  PRO_FEEDER: {
    TYPE: string;
    NUMBER_OF_DRAWERS: string;
    POSITIONS: ProFeederPosition[];
  };

  // PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW: Positions[]; // JOINT
  // AIRPURGE_AT_MAIN_CLAW: SixNumArray; // TASK

  // PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW: Positions[]; // JOINT
  // AIRPURGE_AT_SUB_CLAW: SixNumArray; // TASK


  
  PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED: Positions[]; // JOINT
  AIRPURGE_BEFORE_INFEED_POSITION: SixNumArray; // TASK

  PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED: Positions[]; // JOINT
  AIRPURGE_BEFORE_OUTFEED_POSITION: SixNumArray; // TASK

  PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED: Positions[]; // JOINT
  AIRPURGE_AFTER_OUTFEED_POSITION: SixNumArray; // TASK



  PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT: Positions[]; // JOINT
  CLEAN_PRODUCT_POSITION: SixNumArray; // TASK

  PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK: Positions[]; // JOINT
  MACHINE_PICK_POSITIONS: MachinePosition[]; // TASK

  PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE: Positions[]; // JOINT
  MACHINE_PLACE_POSITIONS: MachinePosition[]; // TASK

  DROP_OFF_POSITIONS: DropOffPosition[];

  DO_GRIPPER1_OPEN: DigitalOutput;
  DO_GRIPPER1_CLOSE: DigitalOutput;
  DO_GRIPPER2_OPEN: DigitalOutput;
  DO_GRIPPER2_CLOSE: DigitalOutput;
  DO_AIRPURGE: DigitalOutput;
  DO_MAIN_SPINDLE_OPEN: DigitalOutput;
  DO_MAIN_SPINDLE_CLOSE: DigitalOutput;
  DO_SUB_SPINDLE_OPEN: DigitalOutput;
  DO_SUB_SPINDLE_CLOSE: DigitalOutput;
  DO_REQUEST_NEW_DRAWER: DigitalOutput;
  DO_RUN_MACHINE: DigitalOutput;
  DO_SEND_ALERT: DigitalOutput;

  DI_GRIPPER1_IS_OPENED: DigitalInput;
  DI_GRIPPER1_IS_CLOSED: DigitalInput;
  DI_GRIPPER2_IS_OPENED: DigitalInput;
  DI_GRIPPER2_IS_CLOSED: DigitalInput;
  DI_DOOR_IS_OPENED: DigitalInput;
  DI_MAIN_SPINDLE_IS_OPENED: DigitalInput;
  DI_MAIN_SPINDLE_IS_CLOSED: DigitalInput;
  DI_SUB_SPINDLE_IS_OPENED: DigitalInput;
  DI_SUB_SPINDLE_IS_CLOSED: DigitalInput;
  DI_NEW_DRAWER_IS_REQUESTED: DigitalInput;
  DI_COBOT_IS_CALLED: DigitalInput;
  DI_COBOT_CAN_CONTROL_MACHINE: DigitalInput;
};

/**
 * Needed because `react-hook-form` does not allow us to bind
 * to an array's index directly when using `useFieldArray`.
 * `useFieldArray` requires an item to be an object.
 */
export type Positions = {
  value: SixNumArray;
};

export type ProFeederPosition = {
  open: SixNumArray;
  closed: SixNumArray;
};

export type IOType = 'flange' | 'controller';

export type ControllerIO = {
  type: 'controller';
  value: number; // 1 / 16
};

export type FlangeIO = {
  type: 'flange';
  value: number; // 1 / 16
};

export type DigitalInput = ControllerIO | FlangeIO;

export type DigitalOutput = ControllerIO | FlangeIO;

// All keys from CobotConfigConfig that start with DO_
export const DIGITAL_OUTPUTS: Readonly<
  PickStartingWith<keyof CobotConfigConfig, 'DO_'>
>[] = [
  'DO_GRIPPER1_OPEN',
  'DO_GRIPPER1_CLOSE',
  'DO_GRIPPER2_OPEN',
  'DO_GRIPPER2_CLOSE',
  'DO_AIRPURGE',
  'DO_MAIN_SPINDLE_OPEN',
  'DO_MAIN_SPINDLE_CLOSE',
  'DO_SUB_SPINDLE_OPEN',
  'DO_SUB_SPINDLE_CLOSE',
  'DO_REQUEST_NEW_DRAWER',
  'DO_RUN_MACHINE',
  'DO_SEND_ALERT',
];

// All keys from CobotConfigConfig that start with DI_
export const DIGITAL_INPUTS: Readonly<
  PickStartingWith<keyof CobotConfigConfig, 'DI_'>
>[] = [
  'DI_GRIPPER1_IS_OPENED',
  'DI_GRIPPER1_IS_CLOSED',
  'DI_GRIPPER2_IS_OPENED',
  'DI_GRIPPER2_IS_CLOSED',
  'DI_DOOR_IS_OPENED',
  'DI_MAIN_SPINDLE_IS_OPENED',
  'DI_MAIN_SPINDLE_IS_CLOSED',
  'DI_SUB_SPINDLE_IS_OPENED',
  'DI_SUB_SPINDLE_IS_CLOSED',
  'DI_NEW_DRAWER_IS_REQUESTED',
  'DI_COBOT_IS_CALLED',
  'DI_COBOT_CAN_CONTROL_MACHINE',
];

export type DigitalInputName = (typeof DIGITAL_INPUTS)[number];

export type DigitalOutputName = (typeof DIGITAL_OUTPUTS)[number];
