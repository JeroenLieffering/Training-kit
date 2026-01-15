import { Context, IMotionManager, logger } from 'dart-api';
import {
  AIR_PURGE_TCP,
  GRIPPER_1_TCP,
  GRIPPER_2_TCP,
  TOOL_WEIGHT_NAME,
} from '../../config';
import { CobotConfig } from '../../core/models/cobot-config-types';
import { Product } from '../../core/models/product-types';
import {
  getSecondDrawerStaticGridConfig,
  getMainDrawerStaticGridConfig,
  getToolWeight,
  maxCarryWeight,
} from '../../core/services/cobot-config-service';
import {
  calculateTotalProductsForMainDrawer,
  calculateTotalProductsForSecondDrawer,
  Drawer,
} from '../../core/services/drawer-service';
import {
  calculatePinDistances,
  PRODUCT_MARGIN,
} from '../../core/services/pin-service';
import DrlUtils, { Watchers } from '../../DrlUtils';
import { ResumeForm } from '../../ProductDetail/types';
import mainProgram from './main.drl';
import { CobotInfo } from '../../types';

type MainArgs = {
  programMode: 'MAIN' | 'REACH';
  reachDrawer?: Drawer;
  product: Product;
  cobotConfig: CobotConfig;
  cobotInfo: CobotInfo;
  productsToFabricate: number;
  amountAlreadyProduced: number;
  previousPythonState: unknown;
  watchers: Watchers;
  resumeForm?: ResumeForm;
  toolWeight: number;
};

export async function runMain({
  programMode,
  reachDrawer = 'MAIN',
  product,
  cobotConfig,
  cobotInfo,
  productsToFabricate,
  amountAlreadyProduced,
  watchers,
  resumeForm,
  previousPythonState,
  toolWeight,
}: MainArgs) {
  const drl = DrlUtils.getInstance();
  drl.clear();

  drl.set('ENVIRONMENT', 'PRODUCTION');

  drl.set('PROGRAM_MODE', programMode);
  drl.set('REACH_DRAWER', reachDrawer);

  drl.set('TOOL_WEIGHT', getToolWeight(toolWeight));

  drl.set('MAX_CARRY_WEIGHT', maxCarryWeight(cobotInfo , toolWeight));
  
  drl.set('CARRY_WEIGHT', cobotInfo.carryWeight);
  
  setProductVariables(product);
  await setCobotConfigVariables(cobotConfig);

  if (cobotConfig.config.GRID_TYPE === 'STATIC') {
    drl.set('GRID_X_OFFSET', parseFloat(cobotConfig.config.GRID_X_OFFSET));

    drl.set('GRID_Y_OFFSET', parseFloat(cobotConfig.config.GRID_Y_OFFSET));

    const mainDrawerStaticGridConfig = getMainDrawerStaticGridConfig(cobotConfig, product.config.STATIC_GRID_INDEX);

    drl.set(
      'DRAWER_LEFT_FRONT_TEACH_POSITION',
      JSON.stringify(mainDrawerStaticGridConfig.DRAWER_LEFT_FRONT_TEACH_POSITION),
    );

    drl.set(
      'DRAWER_LEFT_BACK_TEACH_POSITION',
      JSON.stringify(mainDrawerStaticGridConfig.DRAWER_LEFT_BACK_TEACH_POSITION),
    );

    drl.set(
      'DRAWER_RIGHT_FRONT_TEACH_POSITION',
      JSON.stringify(
        mainDrawerStaticGridConfig.DRAWER_RIGHT_FRONT_TEACH_POSITION,
      ),
    );

    drl.set(
      'DRAWER_RIGHT_BACK_TEACH_POSITION',
      JSON.stringify(mainDrawerStaticGridConfig.DRAWER_RIGHT_BACK_TEACH_POSITION),
    );

    const secondDrawerStaticGridConfig =
    getSecondDrawerStaticGridConfig(cobotConfig);

    drl.set(
      'SECOND_DRAWER_LEFT_FRONT_TEACH_POSITION',
      JSON.stringify(
        secondDrawerStaticGridConfig.DRAWER_LEFT_FRONT_TEACH_POSITION,
      ),
    );

    drl.set(
      'SECOND_DRAWER_LEFT_BACK_TEACH_POSITION',
      JSON.stringify(
        secondDrawerStaticGridConfig.DRAWER_LEFT_BACK_TEACH_POSITION,
      ),
    );

    drl.set(
      'SECOND_DRAWER_RIGHT_FRONT_TEACH_POSITION',
      JSON.stringify(
        secondDrawerStaticGridConfig.DRAWER_RIGHT_FRONT_TEACH_POSITION,
      ),
    );

    drl.set(
      'SECOND_DRAWER_RIGHT_BACK_TEACH_POSITION',
      JSON.stringify(
        secondDrawerStaticGridConfig.DRAWER_RIGHT_BACK_TEACH_POSITION,
      ),
    );
  } else {
    const distances = calculatePinDistances(product, PRODUCT_MARGIN);

    drl.set('GRID_X_OFFSET', distances.GRID_X_OFFSET);
    drl.set('GRID_Y_OFFSET', distances.GRID_Y_OFFSET);
  }

  if (resumeForm && resumeForm.mode === 'continue') {
    drl.set('NORMAL_START', false);

    drl.set('MACHINE_CONTAINS_PRODUCT', resumeForm.MACHINE_CONTAINS_PRODUCT);
    drl.set('USE_CURRENT_DRAWER', resumeForm.USE_CURRENT_DRAWER);

    drl.set('PREVIOUS_STATE', stringifyObj(previousPythonState));
  } else {
    drl.set('NORMAL_START', true);

    drl.set('MACHINE_CONTAINS_PRODUCT', false);
    drl.set('USE_CURRENT_DRAWER', false);

    drl.set('PREVIOUS_STATE', '{}');
  }

  drl.set(
    'TOTAL_AMOUNT_PRODUCT_DRAWER',
    calculateTotalProductsForMainDrawer(product),
  );

  if (product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER) {
    drl.set(
      'MAX_AMOUNT_PRODUCT_ON_SECOND_DRAWER',
      calculateTotalProductsForSecondDrawer(product),
    );
  }

  drl.set('TOTAL_AMOUNT_PRODUCTS', productsToFabricate);

  drl.set('AMOUNT_ALREADY_PRODUCED', amountAlreadyProduced);

  drl.set('GRIPPER_1_TCP', GRIPPER_1_TCP);
  drl.set('GRIPPER_2_TCP', GRIPPER_2_TCP);
  drl.set('AIR_PURGE_TCP', AIR_PURGE_TCP);
  drl.set('TOOL_WEIGHT_NAME', TOOL_WEIGHT_NAME);

  if (cobotConfig.config.MACHINE_TYPE === 'LATHE') {
    drl.set(
      'MACHINE_PICK_POSITION',
      JSON.stringify(cobotConfig.config.MACHINE_PICK_POSITIONS[0].position),
    );

    drl.set(
      'MACHINE_PLACE_POSITION',
      JSON.stringify(cobotConfig.config.MACHINE_PLACE_POSITIONS[0].position),
    );
  } else {
    const pickIndex = parseFloat(product.config.MACHINE_PICK_POSITION_INDEX);
    drl.set(
      'MACHINE_PICK_POSITION',
      JSON.stringify(
        cobotConfig.config.MACHINE_PICK_POSITIONS[pickIndex].position,
      ),
    );

    const placeIndex = parseFloat(product.config.MACHINE_PLACE_POSITION_INDEX);
    drl.set(
      'MACHINE_PLACE_POSITION',
      JSON.stringify(
        cobotConfig.config.MACHINE_PLACE_POSITIONS[placeIndex].position,
      ),
    );
  }

  if (product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION) {
    const index = parseFloat(
      product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX,
    );
    const dropOffPosition = cobotConfig.config.DROP_OFF_POSITIONS[index];

    drl.set('DROP_OFF_POSITION', JSON.stringify(dropOffPosition.position));

    drl.set(
      'PATH_FROM_DROP_OFF_POSITION_TO_OUTSIDE_MACHINE_DOOR',
      JSON.stringify(
        dropOffPosition.pathFromOutsideMachineDoor.map((p) => p.value),
      ),
    );
  }

  return drl.runProgram(mainProgram, watchers);
}

// For some reason we must escape " characters otherwise python cannot parse it as JSON.
function stringifyObj(obj: unknown) {
  // @ts-expect-error replaceAll works
  return JSON.stringify(obj).replaceAll('"', '\\"');
}

function setProductVariables(product: Product) {
  const drl = DrlUtils.getInstance();

  const config = product.config;

  drl.set('IO_MODE', config.IO_MODE);

  drl.set('STEPPED_AXIS', config.STEPPED_AXIS);
  drl.set('USE_SUB_SPINDLE', config.USE_SUB_SPINDLE);
  drl.set('USE_SECOND_GRIPPER', config.USE_SECOND_GRIPPER);

  drl.set('ROUND_PRODUCT', config.ROUND_PRODUCT);
  drl.set('PUSH_AFTER_PLACE', config.PUSH_AFTER_PLACE);
  drl.set('PUSH_GRIPPER_CLOSED', config.PUSH_GRIPPER_CLOSED);
  drl.set('FORCE_INFEED', config.FORCE_INFEED);
  drl.set('CLEAN_PRODUCT', config.CLEAN_PRODUCT);
  drl.set('AIRPURGE_BEFORE_INFEED', config.AIRPURGE_BEFORE_INFEED);
  drl.set('AIRPURGE_BEFORE_OUTFEED', config.AIRPURGE_BEFORE_OUTFEED);
  drl.set('AIRPURGE_AFTER_OUTFEED', config.AIRPURGE_AFTER_OUTFEED);
  drl.set(
    'PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION',
    config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION,
  );

  drl.set('RAW_MAT_HEIGHT', parseFloat(config.RAW_MAT_HEIGHT));
  drl.set('RAW_MAT_LENGTH', parseFloat(config.RAW_MAT_LENGTH));
  drl.set('RAW_MAT_WIDTH', parseFloat(config.RAW_MAT_WIDTH));
  drl.set('RAW_MAT_DIAMETER', parseFloat(config.RAW_MAT_DIAMETER));
  drl.set('RAW_MAT_WEIGHT', parseFloat(config.RAW_MAT_WEIGHT));

  drl.set('FIN_PRODUCT_HEIGHT', parseFloat(config.FIN_PRODUCT_HEIGHT));
  drl.set('FIN_PRODUCT_LENGTH', parseFloat(config.FIN_PRODUCT_LENGTH));
  drl.set('FIN_PRODUCT_WIDTH', parseFloat(config.FIN_PRODUCT_WIDTH));
  drl.set('FIN_PRODUCT_DIAMETER', parseFloat(config.FIN_PRODUCT_DIAMETER));
  drl.set('FIN_PRODUCT_WEIGHT', parseFloat(config.FIN_PRODUCT_WEIGHT));

  drl.set('FIN_BOTTOM_OFFSET', parseFloat(config.FIN_BOTTOM_OFFSET));
  drl.set('FIN_TOP_OFFSET', parseFloat(config.FIN_TOP_OFFSET));

  drl.set(
    'POSITIONING_PIN_DIAMETER',
    parseFloat(config.POSITIONING_PIN_DIAMETER),
  );
  drl.set(
    'DISTANCE_POSITIONING_PINS',
    parseFloat(config.DISTANCE_POSITIONING_PINS),
  );
  drl.set('POS_POSPIN1_X', parseFloat(config.POS_POSPIN1_X));
  drl.set('POS_POSPIN1_Y', parseFloat(config.POS_POSPIN1_Y));
  drl.set('EQUAL_GRID', config.EQUAL_GRID);

  drl.set(
    'DRAWER_AMOUNT_PRODUCT_X',
    parseFloat(config.DRAWER_AMOUNT_PRODUCT_X),
  );
  drl.set(
    'DRAWER_AMOUNT_PRODUCT_Y',
    parseFloat(config.DRAWER_AMOUNT_PRODUCT_Y),
  );
  drl.set(
    'DRAWER_AMOUNT_PRODUCT_Z',
    parseFloat(config.DRAWER_AMOUNT_PRODUCT_Z),
  );
  logger.info("drawer amount x = " + config.DRAWER_AMOUNT_PRODUCT_X)
  logger.info("drawer amount y = " + config.DRAWER_AMOUNT_PRODUCT_Y)

  drl.set('GR1_CLAW_DEPTH', parseFloat(config.GR1_CLAW_DEPTH));
  drl.set('GR1_CLAW_HEIGHT', parseFloat(config.GR1_CLAW_HEIGHT));

  drl.set('GR2_CLAW_DEPTH', parseFloat(config.GR2_CLAW_DEPTH));
  drl.set('GR2_CLAW_HEIGHT', parseFloat(config.GR2_CLAW_HEIGHT));

  drl.set('MAIN_CLAW_HEIGHT', parseFloat(config.MAIN_CLAW_HEIGHT));
  drl.set('MAIN_CLAW_DEPTH', parseFloat(config.MAIN_CLAW_DEPTH));

  drl.set('SUB_CLAW_HEIGHT', parseFloat(config.SUB_CLAW_HEIGHT));
  drl.set('SUB_CLAW_DEPTH', parseFloat(config.SUB_CLAW_DEPTH));

  drl.set('DRAWER_PICK_OFFSET_X', parseFloat(config.DRAWER_PICK_OFFSET_X));
  drl.set('DRAWER_PICK_OFFSET_Y', parseFloat(config.DRAWER_PICK_OFFSET_Y));
  drl.set('DRAWER_PICK_OFFSET_Z', parseFloat(config.DRAWER_PICK_OFFSET_Z));
  drl.set('DRAWER_PLACE_OFFSET_X', parseFloat(config.DRAWER_PLACE_OFFSET_X));
  drl.set('DRAWER_PLACE_OFFSET_Y', parseFloat(config.DRAWER_PLACE_OFFSET_Y));
  drl.set('DRAWER_PLACE_OFFSET_Z', parseFloat(config.DRAWER_PLACE_OFFSET_Z));

  drl.set(
    'MACHINE_PICK_HEIGHT_OFFSET',
    parseFloat(config.MACHINE_PICK_HEIGHT_OFFSET),
  );
  drl.set(
    'MACHINE_PICK_DEPTH_OFFSET',
    parseFloat(config.MACHINE_PICK_DEPTH_OFFSET),
  );

  drl.set(
    'MACHINE_PLACE_HEIGHT_OFFSET',
    parseFloat(config.MACHINE_PLACE_HEIGHT_OFFSET),
  );
  drl.set(
    'MACHINE_PLACE_DEPTH_OFFSET',
    parseFloat(config.MACHINE_PLACE_DEPTH_OFFSET),
  );

  drl.set('FORCE_FEEDING_NEWTON', parseFloat(config.FORCE_FEEDING_NEWTON));
  drl.set('FORCE_PUSHING_NEWTON', parseFloat(config.FORCE_PUSHING_NEWTON));

  drl.set('SPOT_STATUS', JSON.stringify(config.SPOT_STATUS));

  drl.set(
    'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
    config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER,
  );
  drl.set(
    'SECOND_DRAWER_AMOUNT_PRODUCT_X',
    parseFloat(config.SECOND_DRAWER_AMOUNT_PRODUCT_X),
  );
  drl.set(
    'SECOND_DRAWER_AMOUNT_PRODUCT_Y',
    parseFloat(config.SECOND_DRAWER_AMOUNT_PRODUCT_Y),
  );
  drl.set(
    'SECOND_DRAWER_AMOUNT_PRODUCT_Z',
    parseFloat(config.SECOND_DRAWER_AMOUNT_PRODUCT_Z),
  );

  drl.set(
    'SECOND_DRAWER_SPOT_STATUS',
    JSON.stringify(config.SECOND_DRAWER_SPOT_STATUS),
  );
}

async function setCobotConfigVariables(cobotConfig: CobotConfig) {
  const drl = DrlUtils.getInstance();

  const config = cobotConfig.config;  

  drl.set('MACHINE_TYPE', config.MACHINE_TYPE);

  drl.set('FEEDER_TYPE', config.FEEDER);

  drl.set('GRID_TYPE', config.GRID_TYPE);

  drl.set('X_OFFSET_ORIGIN', parseFloat(config.X_OFFSET_ORIGIN));

  drl.set('Y_OFFSET_ORIGIN', parseFloat(config.Y_OFFSET_ORIGIN));

  drl.set('Z_OFFSET_ORIGIN', parseFloat(config.Z_OFFSET_ORIGIN));

  drl.set(
    'TEACH_CONFIG_MAIN_CLAW_PRODUCT_HEIGHT',
    parseFloat(config.TEACH_CONFIG_MAIN_CLAW_PRODUCT_HEIGHT),
  );

  drl.set(
    'TEACH_CONFIG_MAIN_CLAW_PRODUCT_WIDTH',
    parseFloat(config.TEACH_CONFIG_MAIN_CLAW_PRODUCT_WIDTH),
  );

  drl.set(
    'TEACH_CONFIG_MAIN_CLAW_PRODUCT_LENGTH',
    parseFloat(config.TEACH_CONFIG_MAIN_CLAW_PRODUCT_LENGTH),
  );
  drl.set(
    'TEACH_CONFIG_SUB_CLAW_PRODUCT_HEIGHT',
    parseFloat(config.TEACH_CONFIG_SUB_CLAW_PRODUCT_HEIGHT),
  );

  drl.set(
    'TEACH_CONFIG_SUB_CLAW_PRODUCT_LENGTH',
    parseFloat(config.TEACH_CONFIG_SUB_CLAW_PRODUCT_LENGTH),
  );

  drl.set(
    'TEACH_CONFIG_SUB_CLAW_PRODUCT_WIDTH',
    parseFloat(config.TEACH_CONFIG_SUB_CLAW_PRODUCT_WIDTH),
  );

  drl.set(
    'TEACH_CONFIG_PLACE_SPINDLE_HEIGHT',
    parseFloat(config.TEACH_CONFIG_PLACE_SPINDLE_HEIGHT),
  );

  drl.set(
    'TEACH_CONFIG_PLACE_SPINDLE_DEPTH',
    parseFloat(config.TEACH_CONFIG_PLACE_SPINDLE_DEPTH),
  );

  drl.set(
    'TEACH_CONFIG_GR_RAW_HEIGHT',
    parseFloat(config.TEACH_CONFIG_GR_RAW_HEIGHT),
  );

  drl.set(
    'TEACH_CONFIG_GR_RAW_DEPTH',
    parseFloat(config.TEACH_CONFIG_GR_RAW_DEPTH),
  );

  drl.set(
    'TEACH_CONFIG_PICK_SPINDLE_HEIGHT',
    parseFloat(config.TEACH_CONFIG_PICK_SPINDLE_HEIGHT),
  );

  drl.set(
    'TEACH_CONFIG_PICK_SPINDLE_DEPTH',
    parseFloat(config.TEACH_CONFIG_PICK_SPINDLE_DEPTH),
  );

  drl.set(
    'TEACH_CONFIG_GR_FINISHED_HEIGHT',
    parseFloat(config.TEACH_CONFIG_GR_FINISHED_HEIGHT),
  );

  drl.set(
    'TEACH_CONFIG_GR_FINISHED_DEPTH',
    parseFloat(config.TEACH_CONFIG_GR_FINISHED_DEPTH),
  );

  drl.set(
    'CLEAN_PRODUCT_POSITION',
    JSON.stringify(config.CLEAN_PRODUCT_POSITION),
  );

  drl.set(
    'AIRPURGE_MAIN_CLAW_POSITION_ANGLE',
    parseFloat(config.AIRPURGE_MAIN_CLAW_POSITION_ANGLE),
  );

  drl.set(
    'AIRPURGE_MAIN_CLAW_POSITION_DISTANCE',
    parseFloat(config.AIRPURGE_MAIN_CLAW_POSITION_DISTANCE),
  );

  drl.set(
    'AIRPURGE_SUB_CLAW_POSITION_ANGLE',
    parseFloat(config.AIRPURGE_SUB_CLAW_POSITION_ANGLE),
  );

  drl.set(
    'AIRPURGE_SUB_CLAW_POSITION_DISTANCE',
    parseFloat(config.AIRPURGE_SUB_CLAW_POSITION_DISTANCE),
  );

  const motionManager = drl.moduleContext.getSystemManager(
    Context.MOTION_MANAGER,
  ) as IMotionManager;

  const homePosition = await motionManager.getUserHomePose();
  drl.set('HOME_POSITION', JSON.stringify(homePosition));

  drl.set(
    'GRIPPER1_AT_DRAWER_POSITION',
    JSON.stringify(config.GRIPPER1_AT_DRAWER_POSITION),
  );

  drl.set(
    'GRIPPER2_AT_DRAWER_POSITION',
    JSON.stringify(config.GRIPPER2_AT_DRAWER_POSITION),
  );

  drl.set(
    'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
    JSON.stringify(
      config.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR.map((p) => p.value),
    ),
  );

  drl.set(
    'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE',
    JSON.stringify(
      config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE.map(
        (p) => p.value,
      ),
    ),
  );

  drl.set(
    'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK',
    JSON.stringify(
      config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK.map((p) => p.value),
    ),
  );

  drl.set(
    'AIRPURGE_BEFORE_INFEED_POSITION',
    JSON.stringify(config.AIRPURGE_BEFORE_INFEED_POSITION),
  );

  drl.set(
    'AIRPURGE_BEFORE_OUTFEED_POSITION',
    JSON.stringify(config.AIRPURGE_BEFORE_OUTFEED_POSITION),
  );

  drl.set(
    'AIRPURGE_AFTER_OUTFEED_POSITION',
    JSON.stringify(config.AIRPURGE_AFTER_OUTFEED_POSITION),
  );

  drl.set(
    'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED',
    JSON.stringify(
      config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED.map(
        (p) => p.value,
      ),
    ),
  );

  drl.set(
    'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED',
    JSON.stringify(
      config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED.map(
        (p) => p.value,
      ),
    ),
  );

  drl.set(
    'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED',
    JSON.stringify(
      config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED.map(
        (p) => p.value,
      ),
    ),
  );

  drl.set(
    'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT',
    JSON.stringify(
      config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT.map(
        (p) => p.value,
      ),
    ),
  );

  drl.set('HAS_SECOND_GRIPPER', config.HAS_SECOND_GRIPPER);

  drl.set('MACHINE_HAS_SUB_SPINDLE', config.MACHINE_HAS_SUB_SPINDLE);

  drl.set('DEBUG_WAIT_FOR_MACHINE_CALL', config.DEBUG_WAIT_FOR_MACHINE_CALL);

  drl.set('DEBUG_WAIT_FOR_MACHINE_DOOR', config.DEBUG_WAIT_FOR_MACHINE_DOOR);

  drl.set('DEBUG_CONSTANTLY_LOOP_PROGRAM', config.DEBUG_CONSTANTLY_LOOP_PROGRAM);
  
  drl.set('X_FIRST_SPOT', parseFloat(config.X_FIRST_SPOT));

  drl.set('Y_FIRST_SPOT', parseFloat(config.Y_FIRST_SPOT));

  drl.set('DO_GRIPPER1_OPEN', stringifyObj(config.DO_GRIPPER1_OPEN));
  drl.set('DO_GRIPPER1_CLOSE', stringifyObj(config.DO_GRIPPER1_CLOSE));
  drl.set('DO_GRIPPER2_OPEN', stringifyObj(config.DO_GRIPPER2_OPEN));
  drl.set('DO_GRIPPER2_CLOSE', stringifyObj(config.DO_GRIPPER2_CLOSE));
  drl.set('DO_AIRPURGE', stringifyObj(config.DO_AIRPURGE));
  drl.set('DO_MAIN_SPINDLE_OPEN', stringifyObj(config.DO_MAIN_SPINDLE_OPEN));
  drl.set('DO_MAIN_SPINDLE_CLOSE', stringifyObj(config.DO_MAIN_SPINDLE_CLOSE));
  drl.set('DO_SUB_SPINDLE_OPEN', stringifyObj(config.DO_SUB_SPINDLE_OPEN));
  drl.set('DO_SUB_SPINDLE_CLOSE', stringifyObj(config.DO_SUB_SPINDLE_CLOSE));
  drl.set('DO_REQUEST_NEW_DRAWER', stringifyObj(config.DO_REQUEST_NEW_DRAWER));
  drl.set('DO_RUN_MACHINE', stringifyObj(config.DO_RUN_MACHINE));
  drl.set('DO_SEND_ALERT', stringifyObj(config.DO_SEND_ALERT));

  drl.set('DI_GRIPPER1_IS_OPENED', stringifyObj(config.DI_GRIPPER1_IS_OPENED));
  drl.set('DI_GRIPPER1_IS_CLOSED', stringifyObj(config.DI_GRIPPER1_IS_CLOSED));
  drl.set('DI_GRIPPER2_IS_OPENED', stringifyObj(config.DI_GRIPPER2_IS_OPENED));
  drl.set('DI_GRIPPER2_IS_CLOSED', stringifyObj(config.DI_GRIPPER2_IS_CLOSED));
  drl.set('DI_DOOR_IS_OPENED', stringifyObj(config.DI_DOOR_IS_OPENED));
  drl.set(
    'DI_MAIN_SPINDLE_IS_OPENED',
    stringifyObj(config.DI_MAIN_SPINDLE_IS_OPENED),
  );
  drl.set(
    'DI_MAIN_SPINDLE_IS_CLOSED',
    stringifyObj(config.DI_MAIN_SPINDLE_IS_CLOSED),
  );
  drl.set(
    'DI_SUB_SPINDLE_IS_OPENED',
    stringifyObj(config.DI_SUB_SPINDLE_IS_OPENED),
  );
  drl.set(
    'DI_SUB_SPINDLE_IS_CLOSED',
    stringifyObj(config.DI_SUB_SPINDLE_IS_CLOSED),
  );
  drl.set(
    'DI_NEW_DRAWER_IS_REQUESTED',
    stringifyObj(config.DI_NEW_DRAWER_IS_REQUESTED),
  );
  drl.set('DI_COBOT_IS_CALLED', stringifyObj(config.DI_COBOT_IS_CALLED));

  drl.set(
    'PATH_FROM_SECOND_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
    JSON.stringify(
      config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR.map(
        (p) => p.value,
      ),
    ),
  );

  drl.set(
    'GRIPPER1_AT_SECOND_DRAWER_POSITION',
    JSON.stringify(
      config.EASY_LOADER.SECOND_DRAWER.GRIPPER1_AT_DRAWER_POSITION,
    ),
  );

  drl.set(
    'GRIPPER2_AT_SECOND_DRAWER_POSITION',
    JSON.stringify(
      config.EASY_LOADER.SECOND_DRAWER.GRIPPER2_AT_DRAWER_POSITION,
    ),
  );

}
