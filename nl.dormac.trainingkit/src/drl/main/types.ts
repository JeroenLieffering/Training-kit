export type MetaSuiteProgramState =
  | 'HOMING'
  | 'ROBOT_HOME'
  | 'GRIPPER_1_CLOSED'
  | 'GRIPPER_1_OPENED'
  | 'GRIPPER_2_CLOSED'
  | 'GRIPPER_2_OPENED'
  | 'MAIN_CLAW_OPENED'
  | 'MAIN_CLAW_CLOSED'
  | 'SUB_CLAW_OPENED'
  | 'SUB_CLAW_CLOSED'
  | 'START_FROM_FIRST_POS'
  | 'REQUEST_NEW_DRAWER'
  | 'FIN_PRODUCT_IN_MACHINE'
  | 'MACHINE_EMPTY'
  | 'CONTINUE_PROGRAM'
  | 'PICK_PRODUCT_DRAWER'
  | 'PICK_FROM_DRAWER_FAILED'
  | 'WAIT_MACHINE_CALL'
  | 'MACHINE_CALL_GIVEN'
  | 'WAIT_DOOR_OPEN'
  | 'MACHINE_DOOR_OPEN'
  | 'AIRPURGE_BEFORE_INFEED'
  | 'AIRPURGE_BEFORE_INFEED_DONE'
  | 'PLACE_PRODUCT_MACHINE'
  | 'FORCE_FEED'
  | 'NORMAL_FEED'
  | 'PUSH_AFTER_PLACE'
  | 'PRODUCT_PICKED_FROM_DRAWER'
  | 'PRODUCT_PLACED_ON_DRAWER'
  | 'PRODUCT_PLACED_ON_DROP_OFF'
  | 'PRODUCT_PLACED_IN_MACHINE'
  | 'PRODUCT_PICKED_FROM_MACHINE'
  | 'PICK_FINISHED_PRODUCT'
  | 'AIRPURGE_BEFORE_OUTFEED'
  | 'AIRPURGE_BEFORE_OUTFEED_DONE'
  | 'AIRPURGE_AFTER_OUTFEED'
  | 'AIRPURGE_AFTER_OUTFEED_DONE'
  | 'CLEAN_PRODUCT'
  | 'PRODUCT_CLEANED'
  | 'PLACE_FINISHED_PRODUCT'
  | 'PLACE_PRODUCT_DRAWER'
  | 'PRODUCT_FINISHED'
  | 'TOTAL_FINISHED'
  | 'GRIPPER1_CHECK_FAILED'
  | 'GRIPPER2_CHECK_FAILED'
  | 'PICK_FROM_MACHINE_FAILED'
  | 'REACH_TEST'
  | 'REACH_TEST_FINISHED'
  | 'SECOND_DRAWER_IS_FULL'
  | 'SECOND_DRAWER_IS_CLEARED';

export type MetaSuiteProgramSpindleStatus =
  | 0 // EMPTY
  | 1 // RAW
  | 2; // FINISHED

export type MetaSuiteProgramPhase =
  | 'CONFIGURE_MACHINE_PHASE'
  | 'EXIT_PROGRAM_PHASE'
  | 'DETERMINE_START_PHASE'
  | 'PICK_RAW_MATERIAL_FROM_DRAWER_PHASE'
  | 'PLACE_RAW_MATERIAL_IN_MACHINE_PHASE'
  | 'PICK_FINISHED_PRODUCT_FROM_MACHINE_PHASE'
  | 'PLACE_FINISHED_PRODUCT_ON_DRAWER_PHASE'
  | 'PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_PHASE'
  | 'REACH_TEST_PHASE';

export type MetaSuiteProgramJSON = {
  phase: MetaSuiteProgramPhase;
  state: MetaSuiteProgramState;
  productsToFabricate: number;
  productsFabricatedOnCurrentDrawer: number;
  productsPlacedOnCurrentDrawer: number;
  productsPickedOnCurrentDrawer: number;
  productsDroppedOnDropOff: number;
  xPick: number;
  yPick: number;
  zPick: number;
  xPlace: number;
  yPlace: number;
  zPlace: number;
  drawerCount: number;
  firstRawMaterialThatWasTakenFromDrawerIsInMachine: boolean;
  pickupFails: number;
  totalProductsFabricated: number;
  mainSpindleStatus: MetaSuiteProgramSpindleStatus;
  subSpindleStatus: MetaSuiteProgramSpindleStatus;
  gripper1Status: MetaSuiteProgramSpindleStatus;
  gripper2Status: MetaSuiteProgramSpindleStatus;
};
