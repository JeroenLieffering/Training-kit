import { IDartDatabase, logger, TableRow } from 'dart-api';
import { CobotInfo, MetaLoader } from '../../types';
import {
  PRODUCT_CONFIG_HISTORY_TABLE_NAME,
  PRODUCTS_COLUMN_NAMES,
  PRODUCTS_CONFIG_HISTORY_COLUMN_NAMES,
  PRODUCTS_TABLE_NAME,
} from '../db/product-table';
import { CobotConfig } from '../models/cobot-config-types';
import { Product, ProductHistory } from '../models/product-types';
import {
  getFeederInfo,
  getGripper1Info,
  getSecondDrawerStaticGridConfig,
  getMainDrawerStaticGridConfig,
  isConfiguredWithStaticGrid,
  maxCarryWeight,
  isConfiguredWithStaticEasyLoaderWithSecondDrawer,
} from './cobot-config-service';
import {
  calculatePinDistances,
  PIN_SPACING,
  PRODUCT_MARGIN,
} from './pin-service';
import { FABRICATION_TABLE_NAME } from '../db/fabrication-table';
import { MIGRATION } from '../../config';
import { UseFormReturn } from 'react-hook-form';
import { range } from '../../utils/array';


export async function loadProducts(database: IDartDatabase) {
  const rows = await database.query(
    PRODUCTS_TABLE_NAME,
    PRODUCTS_COLUMN_NAMES,
    {},
  );

  const products: Product[] = rows.map(rowToProduct);

  return products;
}

export async function loadProductById(database: IDartDatabase, id: string) {
  const rows = await database.query(
    PRODUCTS_TABLE_NAME,
    PRODUCTS_COLUMN_NAMES,
    {
      id,
    },
  );

  const products: Product[] = rows.map(rowToProduct);

  if (products.length !== 1) {
    throw Error('Could not find product by ID');
  }

  return products[0];
}

export async function loadProductsConfigHistoryById(
  database: IDartDatabase,
  product: Product,
) {
  const rows = await database.query(
    PRODUCT_CONFIG_HISTORY_TABLE_NAME,
    PRODUCTS_CONFIG_HISTORY_COLUMN_NAMES,
    {
      productId: product.id,
    },
  );

  const products: ProductHistory[] = rows.map((row: TableRow) => {
    return {
      id: row.data.id,
      productId: row.data.productId,
      config: JSON.parse(row.data.config),
      iteration: row.data.iteration,
      createdAt: row.data.createdAt,
      updatedAt: row.data.updatedAt,
      migration: row.data.migration,
    };
  });

  return products;
}

export async function insertProductWithHistory(
  database: IDartDatabase,
  product: Product,
) {
  await insertProduct(database, product);

  await insertProductHistory(database, {
    id: crypto.randomUUID(),
    productId: product.id,
    config: product.config,
    iteration: product.iteration,
    createdAt: product.createdAt,
    migration: MIGRATION,
  });

  return true;
}

export async function insertProduct(database: IDartDatabase, product: Product) {
  const result = await database.insert(PRODUCTS_TABLE_NAME, [
    product.id,
    product.name,
    product.description,
    product.icon,
    product.color,
    product.state,
    JSON.stringify(product.config),
    product.lastFabricationDuration,
    product.lastFabricationAmount,
    product.iteration,
    product.createdAt,
    product.updatedAt,
    MIGRATION,
  ]);

  if (!result) {
    throw new Error('Could not insert product');
  }

  return true;
}

export async function insertProductHistory(
  database: IDartDatabase,
  productHistory: ProductHistory,
) {
  const result = await database.insert(PRODUCT_CONFIG_HISTORY_TABLE_NAME, [
    productHistory.id,
    productHistory.productId,
    JSON.stringify(productHistory.config),
    productHistory.iteration,
    productHistory.createdAt,
    MIGRATION,
  ]);

  if (!result) {
    throw new Error('Could not insert product history');
  }

  return true;
}

export async function deleteProduct(database: IDartDatabase, product: Product) {
  await database.delete(FABRICATION_TABLE_NAME, {
    productId: product.id,
  });

  database.delete(PRODUCT_CONFIG_HISTORY_TABLE_NAME, {
    productId: product.id,
  });

  const result = await database.delete(PRODUCTS_TABLE_NAME, { id: product.id });

  if (result === 0) {
    throw new Error('Could not remove product');
  }

  return result;
}

export async function updateProduct(
  database: IDartDatabase,
  { prev, next }: { prev: Product; next: Product },
) {
  logger.info('Updating PRODUCT ' + prev.id);

  // If nothing has changed do nothing, this prevents history
  // entries from being added.
  if (JSON.stringify(prev) === JSON.stringify(next)) {
    logger.info(`Ignore update of PRODUCT ${prev.id} nothing has changed`);
    return true;
  }

  const configChanged =
    JSON.stringify(prev.config) !== JSON.stringify(next.config);

  const product = next;

  const configJson = JSON.stringify(product.config);

  const iteration = configChanged ? product.iteration + 1 : product.iteration;

  const result = await database.update(
    PRODUCTS_TABLE_NAME,
    { id: product.id },
    {
      id: product.id,
      name: product.name,
      description: product.description,
      color: product.color,
      state: product.state,
      icon: product.icon,
      config: configJson,
      lastFabricationDuration: product.lastFabricationDuration,
      lastFabricationAmount: product.lastFabricationAmount,
      iteration,
      updatedAt: new Date().toISOString(),
    },
  );

  if (!result) {
    throw new Error('Could not update product');
  }

  // If nothing has changed do nothing, this prevents history
  // entries from being added.
  if (!configChanged) {
    logger.info(
      `UPDATED PRODUCT ${prev.id} but config did not change keeping history `,
    );
    return result;
  }

  const historyResult = await database.insert(
    PRODUCT_CONFIG_HISTORY_TABLE_NAME,
    [
      crypto.randomUUID(),
      product.id,
      configJson,
      iteration,
      new Date().toISOString(),
      MIGRATION,
    ],
  );

  logger.info(`UPDATED PRODUCT ${prev.id} and updated history `);
  return historyResult;
}

export async function updateProductLastFabricationDuration(
  database: IDartDatabase,
  product: Product,
  duration: number,
) {
  logger.info('Updating PRODUCT lastFabricationDuration' + product.id);

  const result = await database.update(
    PRODUCTS_TABLE_NAME,
    { id: product.id },
    {
      lastFabricationDuration: duration,
    },
  );

  if (!result) {
    throw new Error('Could not update product lastFabricationDuration');
  }

  return result;
}

export async function updateProductLastFabricationAmount(
  database: IDartDatabase,
  product: Product,
  amount: number,
) {
  logger.info('Updating PRODUCT lastFabricationAmount' + product.id);

  const result = await database.update(
    PRODUCTS_TABLE_NAME,
    { id: product.id },
    {
      lastFabricationAmount: amount,
    },
  );

  if (!result) {
    throw new Error('Could not update product lastFabricationAmount');
  }

  return result;
}

function rowToProduct(row: TableRow): Product {
  return {
    id: row.data.id,
    name: row.data.name,
    description: row.data.description,
    color: row.data.color,
    state: row.data.state,
    icon: row.data.icon,
    lastFabricationDuration: row.data.lastFabricationDuration,
    lastFabricationAmount: row.data.lastFabricationAmount,
    config: JSON.parse(row.data.config),
    iteration: row.data.iteration,
    createdAt: row.data.createdAt,
    updatedAt: row.data.updatedAt,
    migration: row.data.migration,
  };
}

export function makeDefaultProduct(cobotConfig: CobotConfig): Product {
  const mainDrawerStaticGridConfig = getMainDrawerStaticGridConfig(cobotConfig);
  const secondDrawerStaticGridConfig =
    getSecondDrawerStaticGridConfig(cobotConfig);

  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    icon: 'wrench',
    state: 'active',
    color: '#000000',
    config: {
      IO_MODE: 'INPUT_OUTPUT',
      STEPPED_AXIS: false,
      USE_SUB_SPINDLE: cobotConfig.config.MACHINE_HAS_SUB_SPINDLE,
      USE_SECOND_GRIPPER: cobotConfig.config.HAS_SECOND_GRIPPER,
      ROUND_PRODUCT: true,
      PUSH_AFTER_PLACE: false,
      PUSH_GRIPPER_CLOSED: false,
      FORCE_INFEED: false,
      CLEAN_PRODUCT: false,
      AIRPURGE_BEFORE_INFEED: false,
      AIRPURGE_BEFORE_OUTFEED: false,
      AIRPURGE_AFTER_OUTFEED: false,
      PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER: false,
      PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION: false,
      PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX: '0',
      RAW_MAT_HEIGHT: '0',
      RAW_MAT_LENGTH: '0',
      RAW_MAT_WIDTH: '0',
      RAW_MAT_DIAMETER: '0',
      RAW_MAT_WEIGHT: '0',
      FIN_PRODUCT_HEIGHT: '0',
      FIN_PRODUCT_LENGTH: '0',
      FIN_PRODUCT_WIDTH: '0',
      FIN_PRODUCT_DIAMETER: '0',
      FIN_PRODUCT_WEIGHT: '0',
      FIN_BOTTOM_OFFSET: '0',
      FIN_TOP_OFFSET: '0',
      POSITIONING_PIN_DIAMETER: '8',
      DISTANCE_POSITIONING_PINS: '75',
      POS_POSPIN1_X: '50',
      POS_POSPIN1_Y: '0',
      EQUAL_GRID: true,
      DRAWER_AMOUNT_PRODUCT_X: mainDrawerStaticGridConfig.AMOUNT_SQUARES_X_AXIS,
      DRAWER_AMOUNT_PRODUCT_Y: mainDrawerStaticGridConfig.AMOUNT_SQUARES_Y_AXIS,
      DRAWER_AMOUNT_PRODUCT_Z: '1',
      REACH_TESTED: true,
      SPOT_STATUS: range(7 * 5).map(() => true),
      SECOND_DRAWER_AMOUNT_PRODUCT_X:
        secondDrawerStaticGridConfig.AMOUNT_SQUARES_X_AXIS,
      SECOND_DRAWER_AMOUNT_PRODUCT_Y:
        secondDrawerStaticGridConfig.AMOUNT_SQUARES_Y_AXIS,
      SECOND_DRAWER_AMOUNT_PRODUCT_Z: '1',
      SECOND_DRAWER_REACH_TESTED: true,
      SECOND_DRAWER_SPOT_STATUS: [],
      GR1_CLAW_DEPTH: '0',
      GR1_CLAW_HEIGHT: '0',
      GR2_CLAW_DEPTH: '0',
      GR2_CLAW_HEIGHT: '0',
      MAIN_CLAW_HEIGHT: '0',
      MAIN_CLAW_DEPTH: '0',
      SUB_CLAW_HEIGHT: '0',
      SUB_CLAW_DEPTH: '0',
      DRAWER_PICK_OFFSET_X: '0',
      DRAWER_PICK_OFFSET_Y: '0',
      DRAWER_PICK_OFFSET_Z: '0',
      DRAWER_PLACE_OFFSET_X: '0',
      DRAWER_PLACE_OFFSET_Y: '0',
      DRAWER_PLACE_OFFSET_Z: '0',
      MACHINE_PICK_POSITION_INDEX: '0',
      MACHINE_PLACE_POSITION_INDEX: '0',
      MACHINE_PICK_HEIGHT_OFFSET: '0',
      MACHINE_PICK_DEPTH_OFFSET: '0',
      MACHINE_PLACE_HEIGHT_OFFSET: '0',
      MACHINE_PLACE_DEPTH_OFFSET: '0',
      FORCE_FEEDING_NEWTON: '20',
      FORCE_PUSHING_NEWTON: '20',
      STATIC_GRID_INDEX: '0',
      STATIC_GRID_INDEX_SECOND_DRAWER: '0',
    },
    lastFabricationDuration: null,
    lastFabricationAmount: null,
    iteration: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    migration: MIGRATION,
  };
}

export function getBoundsRawMaterialWeight(
  cobotInfo: CobotInfo,
  cobotConfig: CobotConfig,
  toolWeight: number,
) {
  const gripper1 = getGripper1Info(cobotConfig);

  const cobotCarryWeight = maxCarryWeight(cobotInfo, toolWeight);

  // The max cannot exceed the max weight the cobot can carry.
  // It must also be able to be carried by the gripper.
  const max = Math.min(
    cobotCarryWeight,
    gripper1?.gripper?.carryWeight ?? cobotCarryWeight,
  );
  
  return { min: 0.1, max } as const;
}

export function getBoundsRawMaterialHeight(cobotConfig: CobotConfig) {
  // Assume that the MACHINE_MAX_FEED_HEIGHT has been properly
  // configured here.
  const machineMaxFeedHeight = parseFloat(
    cobotConfig.config.MACHINE_MAX_FEED_HEIGHT,
  );

  const feederInfo = getFeederInfo(cobotConfig);

  // The raw material must fit on the feeder.
  const min = Math.max(0.1, feederInfo?.height.min ?? 0.1);

  if (cobotConfig.config.FEEDER === 'META_LOADER') {
    const metaLoader = feederInfo as MetaLoader;

    const metaLoaderDrawerHeightPlusMargin = metaLoader.drawerHeight - 10;

    // The raw material must fit on the feeder and must fit into the machine.
    const max = Math.min(
      machineMaxFeedHeight,
      metaLoaderDrawerHeightPlusMargin ?? machineMaxFeedHeight,
    );

    return {
      min,
      max,
      minReason: min === 0.1 ? 'BASE' : 'FEEDER',
      maxReason: max === machineMaxFeedHeight ? 'MACHINE' : 'FEEDER',
    } as const;
  } else {
    // The raw material must fit on the feeder and must fit into the machine.
    const max = Math.min(
      machineMaxFeedHeight,
      feederInfo?.height.max ?? machineMaxFeedHeight,
    );

    return {
      min,
      max,
      minReason: min === 0.1 ? 'BASE' : 'FEEDER',
      maxReason: max === machineMaxFeedHeight ? 'MACHINE' : 'FEEDER',
    } as const;
  }
}

export function getBoundsRawMaterialLength(
  cobotConfig: CobotConfig,
  product: Product,
) {
  const feederInfo = getFeederInfo(cobotConfig);

  const isGridStatic = isConfiguredWithStaticGrid(cobotConfig);

  const gridMin = getGridMin(product, isGridStatic);

  // Assume that the MACHINE_MAX_FEED_LENGTH has been properly
  // configured here.
  const machineMaxFeedLength = parseFloat(
    cobotConfig.config.MACHINE_MAX_FEED_LENGTH,
  );

  // The raw material must fit on the feeder.
  const min = Math.max(gridMin, feederInfo?.length.min ?? gridMin);

  // The raw material must fit on the feeder and must fit into the machine.
  const max = Math.min(
    machineMaxFeedLength,
    feederInfo?.length.max ?? machineMaxFeedLength,
  );

  return {
    min,
    max,
    minReason:
      min === 0.1 ? 'BASE' : min === feederInfo?.length.min ? 'FEEDER' : 'PIN',
    maxReason: max === machineMaxFeedLength ? 'MACHINE' : 'FEEDER',
  } as const;
}

export function getBoundsRawMaterialWidth(
  cobotConfig: CobotConfig,
  product: Product,
) {
  const feederInfo = getFeederInfo(cobotConfig);

  const isGridStatic = isConfiguredWithStaticGrid(cobotConfig);

  const gridMin = getGridMin(product, isGridStatic);

  // Assume that the MACHINE_MAX_FEED_WIDTH has been properly
  // configured here.
  const machineMaxFeedWidth = parseFloat(
    cobotConfig.config.MACHINE_MAX_FEED_WIDTH,
  );

  // The raw material must fit on the feeder.
  const min = Math.max(gridMin, feederInfo?.width.min ?? gridMin);

  // The raw material must fit on the feeder and must fit into the machine.
  const max = Math.min(
    machineMaxFeedWidth,
    feederInfo?.width.max ?? machineMaxFeedWidth,
  );

  return {
    min,
    max,
    minReason:
      min === 0.1 ? 'BASE' : min === feederInfo?.width.min ? 'FEEDER' : 'PIN',
    maxReason: max === machineMaxFeedWidth ? 'MACHINE' : 'FEEDER',
  } as const;
}

export function getBoundsRawMaterialDiameter(
  cobotConfig: CobotConfig,
  product: Product,
) {
  const feederInfo = getFeederInfo(cobotConfig);

  const isGridStatic = isConfiguredWithStaticGrid(cobotConfig);
  const gridMin = getGridMin(product, isGridStatic);

  // Assume that the MACHINE_MAX_FEED_WIDTH has been properly
  // configured here.
  const machineMaxFeedWidth = parseFloat(
    cobotConfig.config.MACHINE_MAX_FEED_WIDTH,
  );

  // Assume that the MACHINE_MAX_FEED_LENGTH has been properly
  // configured here.
  const machineMaxFeedLength = parseFloat(
    cobotConfig.config.MACHINE_MAX_FEED_LENGTH,
  );

  // The machine has a max width and length the product can be
  // placed in. The diameter goes into all directions as it
  // is a sphere.
  const machineMax = Math.min(machineMaxFeedLength, machineMaxFeedWidth);

  // The raw material must fit on the feeder.
  const min = Math.max(
    gridMin,
    feederInfo?.width.min ?? gridMin,
    feederInfo?.length.min ?? gridMin,
  );

  function minReason() {
    if (min === 0.1) {
      return 'BASE';
    } else if (min === feederInfo?.width.min) {
      return 'FEEDER_WIDTH';
    } else if (min === feederInfo?.length.min) {
      return 'FEEDER_LENGTH';
    } else {
      return 'PIN';
    }
  }

  // The raw material must fit on the feeder and must fit into the machine.
  const max = Math.min(
    machineMax,
    feederInfo?.width.max ?? machineMax,
    feederInfo?.length.max ?? machineMax,
  );

  function maxReason() {
    if (max === machineMaxFeedLength) {
      return 'MACHINE_LENGTH';
    } else if (max === machineMaxFeedWidth) {
      return 'MACHINE_WIDTH';
    } else if (max === feederInfo?.width.max) {
      return 'FEEDER_WIDTH';
    } else {
      return 'FEEDER_LENGTH';
    }
  }

  return { min, max, maxReason: maxReason(), minReason: minReason() } as const;
}

export function getGridMin(product: Product, isGridStatic: boolean): number {
  if (isGridStatic) {
    return 0.1;
  }

  const pinDiameter = parseFloat(product.config.POSITIONING_PIN_DIAMETER);

  if (product.config.ROUND_PRODUCT) {
    // TODO this will change in the future.
    return PIN_SPACING - pinDiameter;
  } else {
    return PIN_SPACING * 2 - pinDiameter / 2;
  }
}

/**
 * When the `CobotConfig` changes some properties of the `Product`
 * should follow these changes automatically.
 *
 * The `syncProductWithCobotConfig` function handles this syncing process.
 *
 * The `product` is either a `Product` or a react-hook-form containing
 * which represents a `Product`. This is a bit of a hacky choice but
 * was made so that the synching logic is not happening a two places!
 *
 * @param product The product to sync with the cobot config
 * @param cobotConfig The cobot config to sync with the product
 */
export function syncProductWithCobotConfig(
  product: Product | UseFormReturn<Product, any, undefined>,
  cobotConfig: CobotConfig,
) {
  const staticGridIndex = getProductGridIndex(product, false)
  const staticGridIndexSecondDrawer = getProductGridIndex(product, true)

  if (isConfiguredWithStaticGrid(cobotConfig)) {
    const mainDrawerStaticGridConfig =
      getMainDrawerStaticGridConfig(cobotConfig, staticGridIndex);
    const secondDrawerStaticGridConfig =
      getSecondDrawerStaticGridConfig(cobotConfig, staticGridIndexSecondDrawer);

    if ('watch' in product) {
      product.setValue(
        'config.DRAWER_AMOUNT_PRODUCT_X',
        mainDrawerStaticGridConfig.AMOUNT_SQUARES_X_AXIS,
      );

      product.setValue(
        'config.DRAWER_AMOUNT_PRODUCT_Y',
        mainDrawerStaticGridConfig.AMOUNT_SQUARES_Y_AXIS,
      );

      product.setValue(
        'config.SECOND_DRAWER_AMOUNT_PRODUCT_X',
        secondDrawerStaticGridConfig.AMOUNT_SQUARES_X_AXIS,
      );

      product.setValue(
        'config.SECOND_DRAWER_AMOUNT_PRODUCT_Y',
        secondDrawerStaticGridConfig.AMOUNT_SQUARES_Y_AXIS,
      );
    } else {
      product.config.DRAWER_AMOUNT_PRODUCT_X =
        mainDrawerStaticGridConfig.AMOUNT_SQUARES_X_AXIS;
      product.config.DRAWER_AMOUNT_PRODUCT_Y =
        mainDrawerStaticGridConfig.AMOUNT_SQUARES_Y_AXIS;

      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X =
        secondDrawerStaticGridConfig.AMOUNT_SQUARES_X_AXIS;
      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y =
        secondDrawerStaticGridConfig.AMOUNT_SQUARES_Y_AXIS;
    }
  } else {
    if ('watch' in product) {
      const distances = calculatePinDistances(
        product.getValues(),
        PRODUCT_MARGIN,
      );

      product.setValue(
        'config.DISTANCE_POSITIONING_PINS',
        distances.DISTANCE_POSITIONING_PINS.toString(),
      );

      product.setValue(
        'config.DRAWER_AMOUNT_PRODUCT_X',
        distances.DRAWER_AMOUNT_PRODUCT_X.toString(),
      );
      product.setValue(
        'config.DRAWER_AMOUNT_PRODUCT_Y',
        distances.DRAWER_AMOUNT_PRODUCT_Y.toString(),
      );
      product.setValue(
        'config.POS_POSPIN1_X',
        distances.POS_POSPIN1_X.toString(),
      );
      product.setValue(
        'config.POS_POSPIN1_Y',
        distances.POS_POSPIN1_Y.toString(),
      );
      product.setValue('config.EQUAL_GRID', distances.EQUAL_GRID);
    } else {
      const distances = calculatePinDistances(product, PRODUCT_MARGIN);

      product.config.DISTANCE_POSITIONING_PINS =
        distances.DISTANCE_POSITIONING_PINS.toString();

      product.config.DRAWER_AMOUNT_PRODUCT_X =
        distances.DRAWER_AMOUNT_PRODUCT_X.toString();
      product.config.DRAWER_AMOUNT_PRODUCT_Y =
        distances.DRAWER_AMOUNT_PRODUCT_Y.toString();

      product.config.POS_POSPIN1_X = distances.POS_POSPIN1_X.toString();
      product.config.POS_POSPIN1_Y = distances.POS_POSPIN1_Y.toString();
      product.config.EQUAL_GRID = distances.EQUAL_GRID;
    }
  }
}

/**
 * When picking up a raw material from the drawer we must be sure that
 * we can put a back the finished product on the drawer.
 *
 * We only need to limit the first spot to one item when the IO_MODE
 * is 'INPUT_OUTPUT`, and you place them back on the same spot.
 * When using a second drawer of drop off position you never place
 * back on the same spot.
 *
 * Why does placing back on the same spot cause problems for
 * INPUT_OUTPUT? The ansewr is when you would put three raw  materials
 * on the first spot, the finished product would have to be placed
 * back on top of two raw materials.
 *
 * This would make it impossible to pick the remaining raw materials
 * up again, as the finished product is blocking the gripper.
 *
 * When it is not necessary to limit the first spot to only one item
 * you can simply process more items, and we gain more throughput.
 *
 * @param product The product to determine if the first spot on the drawer should be left open
 * @returns Whether or not the first spot on the drawer should be left open
 */
export function shouldFirstSpotHaveOneItem(product: Product) {
  return (
    product.config.IO_MODE === 'INPUT_OUTPUT' &&
    !product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER &&
    !product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION
  );
}

type SyncProductReachTestWithCobotConfigArgs = {
  product: Product;
  nextCobotConfig: CobotConfig;
  prevCobotConfig: CobotConfig;
};

export function syncProductReachTestWithCobotConfig({
  product,
  prevCobotConfig,
  nextCobotConfig,
}: SyncProductReachTestWithCobotConfigArgs) {
  const next = nextCobotConfig.config;
  const prev = prevCobotConfig.config;

  // When teaching dimensions change both the main drawer and second
  // drawer become invalid.
  // if (
  //   next.TEACH_CONFIG_GR_RAW_DEPTH !== prev.TEACH_CONFIG_GR_RAW_DEPTH ||
  //   next.TEACH_CONFIG_GR_RAW_HEIGHT !== prev.TEACH_CONFIG_GR_RAW_HEIGHT ||
  //   next.TEACH_CONFIG_GR_FINISHED_DEPTH !==
  //     prev.TEACH_CONFIG_GR_FINISHED_DEPTH ||
  //   next.TEACH_CONFIG_GR_FINISHED_HEIGHT !==
  //     prev.TEACH_CONFIG_GR_FINISHED_HEIGHT ||
  //   next.TEACH_CONFIG_MAIN_CLAW_PRODUCT_LENGTH !== prev.TEACH_CONFIG_MAIN_CLAW_PRODUCT_LENGTH ||
  //   next.TEACH_CONFIG_MAIN_CLAW_PRODUCT_WIDTH !== prev.TEACH_CONFIG_MAIN_CLAW_PRODUCT_WIDTH ||
  //   next.TEACH_CONFIG_MAIN_CLAW_PRODUCT_HEIGHT !== prev.TEACH_CONFIG_MAIN_CLAW_PRODUCT_HEIGHT ||
  //   next.TEACH_CONFIG_SUB_CLAW_PRODUCT_LENGTH !== prev.TEACH_CONFIG_SUB_CLAW_PRODUCT_LENGTH ||
  //   next.TEACH_CONFIG_SUB_CLAW_PRODUCT_WIDTH !== prev.TEACH_CONFIG_SUB_CLAW_PRODUCT_WIDTH ||
  //   next.TEACH_CONFIG_SUB_CLAW_PRODUCT_HEIGHT !== prev.TEACH_CONFIG_SUB_CLAW_PRODUCT_HEIGHT
  // ) {
  //   product.config.REACH_TESTED = true;
  //   product.config.SPOT_STATUS = [];

  //   product.config.SECOND_DRAWER_REACH_TESTED = true;
  //   product.config.SECOND_DRAWER_SPOT_STATUS = [];

  //   // We can already stop now.
  //   return;
  // }

  const mainNext = getMainDrawerStaticGridConfig(nextCobotConfig, product.config.STATIC_GRID_INDEX);
  const mainPrev = getMainDrawerStaticGridConfig(prevCobotConfig, product.config.STATIC_GRID_INDEX);

  if (
    JSON.stringify(mainNext.DRAWER_LEFT_FRONT_TEACH_POSITION) !==
      JSON.stringify(mainPrev.DRAWER_LEFT_FRONT_TEACH_POSITION) ||
    JSON.stringify(mainNext.DRAWER_RIGHT_FRONT_TEACH_POSITION) !==
      JSON.stringify(mainPrev.DRAWER_RIGHT_FRONT_TEACH_POSITION) ||
    JSON.stringify(mainNext.DRAWER_RIGHT_BACK_TEACH_POSITION) !==
      JSON.stringify(mainPrev.DRAWER_RIGHT_BACK_TEACH_POSITION) ||
    JSON.stringify(mainNext.DRAWER_LEFT_BACK_TEACH_POSITION) !==
      JSON.stringify(mainPrev.DRAWER_LEFT_BACK_TEACH_POSITION) ||
    mainNext.AMOUNT_SQUARES_X_AXIS !== mainPrev.AMOUNT_SQUARES_X_AXIS ||
    mainNext.AMOUNT_SQUARES_Y_AXIS !== mainPrev.AMOUNT_SQUARES_Y_AXIS
  ) {
    product.config.REACH_TESTED = true;
    product.config.SPOT_STATUS = [];
  }

  const secondNext = getSecondDrawerStaticGridConfig(nextCobotConfig);
  const secondPrev = getSecondDrawerStaticGridConfig(prevCobotConfig);

  if (
    JSON.stringify(secondNext.DRAWER_LEFT_FRONT_TEACH_POSITION) !==
      JSON.stringify(secondPrev.DRAWER_LEFT_FRONT_TEACH_POSITION) ||
    JSON.stringify(secondNext.DRAWER_RIGHT_FRONT_TEACH_POSITION) !==
      JSON.stringify(secondPrev.DRAWER_RIGHT_FRONT_TEACH_POSITION) ||
    JSON.stringify(secondNext.DRAWER_RIGHT_BACK_TEACH_POSITION) !==
      JSON.stringify(secondPrev.DRAWER_RIGHT_BACK_TEACH_POSITION) ||
    JSON.stringify(secondNext.DRAWER_LEFT_BACK_TEACH_POSITION) !==
      JSON.stringify(secondPrev.DRAWER_LEFT_BACK_TEACH_POSITION) ||
    secondNext.AMOUNT_SQUARES_X_AXIS !== secondPrev.AMOUNT_SQUARES_X_AXIS ||
    secondNext.AMOUNT_SQUARES_Y_AXIS !== secondPrev.AMOUNT_SQUARES_Y_AXIS
  ) {
    product.config.SECOND_DRAWER_REACH_TESTED = true;
    product.config.SECOND_DRAWER_SPOT_STATUS = [];
  }
}

export function shouldShowCobotMayCollideMessage(
  cobotConfig: CobotConfig,
  product: Product,
) {
  return (
    !isConfiguredWithStaticEasyLoaderWithSecondDrawer(cobotConfig) &&
    cobotConfig.config.HAS_SECOND_GRIPPER &&
    parseFloat(product.config.DRAWER_AMOUNT_PRODUCT_Z) > 1
  );
}

function isProduct(value: any): value is Product {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "config" in value
  );
}

function getProductGridIndex(
  value: Product | UseFormReturn<Product>,
  second: boolean,
): string {
  if (isProduct(value)) {
    if(second){
      return value.config.STATIC_GRID_INDEX_SECOND_DRAWER;
    } else{
      return value.config.STATIC_GRID_INDEX;
    }
  }
    if(second){
      return value.getValues("config.STATIC_GRID_INDEX_SECOND_DRAWER"); 
    } else{
      return value.getValues("config.STATIC_GRID_INDEX"); 
    }

}
