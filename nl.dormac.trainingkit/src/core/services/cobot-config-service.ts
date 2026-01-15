import { Context, IDartDatabase, IRobotManager, logger, ModuleContext, TableRow, ToolWeight } from 'dart-api';
import {
  EASY_LOADER_TYPES,
  GRIPPER_SUPPLIERS,
  META_LOADER_TYPES,
  MIGRATION,
  PRO_FEEDER_TYPES,
} from '../../config';
import { CobotInfo, FeederInfo } from '../../types';
import {
  COBOT_CONFIG_COLUMN_NAMES,
  COBOT_CONFIG_HISTORY_COLUMN_NAMES,
  COBOT_CONFIG_HISTORY_TABLE_NAME,
  COBOT_CONFIG_TABLE_NAME,
} from '../db/cobot-config-table';
import {
  CobotConfig,
  CobotConfigHistory,
  StaticGridConfig,
} from '../models/cobot-config-types';
import { parseAsNumber } from '../../utils/number';

export async function loadCobotConfig(database: IDartDatabase) {
  // The COBOT_CONFIG
  const rows = await database.query(
    COBOT_CONFIG_TABLE_NAME,
    COBOT_CONFIG_COLUMN_NAMES,
    {},
  );

  const configs: CobotConfig[] = rows.map(rowToCobotConfig);

  return configs[0];
}

export async function insertConfig(
  database: IDartDatabase,
  cobotConfig: CobotConfig,
) {
  const result = await database.insert(COBOT_CONFIG_TABLE_NAME, [
    cobotConfig.id,
    JSON.stringify(cobotConfig.config),
    cobotConfig.iteration,
    cobotConfig.createdAt,
    cobotConfig.updatedAt,
    MIGRATION,
  ]);

  if (!result) {
    throw new Error('Could not create a cobot config');
  }

  return true;
}

export async function updateConfig(
  database: IDartDatabase,
  { prev, next }: { prev: CobotConfig; next: CobotConfig },
) {
  logger.info('Updating COBOT_CONFIG ' + prev.id);

  // If nothing has changed do nothing, this prevents history
  // entries from being added.
  if (JSON.stringify(prev) === JSON.stringify(next)) {
    logger.info(`Ignore update of COBOT_CONFIG ${prev.id} nothing has changed`);
    return true;
  }

  const configChanged =
    JSON.stringify(prev.config) !== JSON.stringify(next.config);

  const cobotConfig = next;

  const nextId = crypto.randomUUID();

  const iteration = configChanged
    ? cobotConfig.iteration + 1
    : cobotConfig.iteration;

  const result = await database.update(
    COBOT_CONFIG_TABLE_NAME,
    { id: prev.id },
    {
      id: nextId,
      config: JSON.stringify(cobotConfig.config),
      updatedAt: new Date().toISOString(),
      iteration,
    },
  );

  if (result === 0) {
    throw new Error('Could not update config');
  }

  const historyResult = await insertCobotConfigHistory(database, {
    id: nextId,
    config: cobotConfig.config,
    createdAt: new Date().toISOString(),
    iteration,
    migration: MIGRATION,
  });

  return historyResult;
}

export async function insertCobotConfigHistory(
  database: IDartDatabase,
  cobotConfigHistory: CobotConfigHistory,
) {
  const result = await database.insert(COBOT_CONFIG_HISTORY_TABLE_NAME, [
    cobotConfigHistory.id,
    JSON.stringify(cobotConfigHistory.config),
    cobotConfigHistory.iteration,
    cobotConfigHistory.createdAt,
    cobotConfigHistory.migration,
  ]);

  if (!result) {
    throw new Error('Could not insert product history');
  }

  return true;
}

function rowToCobotConfig(row: TableRow): CobotConfig {
  return {
    id: row.data.id,
    config: JSON.parse(row.data.config),
    iteration: row.data.iteration,
    createdAt: row.data.createdAt,
    updatedAt: row.data.updatedAt,
    migration: row.data.migration,
  };
}

export async function loadCobotConfigHistory(database: IDartDatabase) {
  // The COBOT_CONFIG
  const rows = await database.query(
    COBOT_CONFIG_HISTORY_TABLE_NAME,
    COBOT_CONFIG_HISTORY_COLUMN_NAMES,
    {},
  );

  const configs: CobotConfigHistory[] = rows.map((row) => {
    return {
      id: row.data.id,
      config: JSON.parse(row.data.config),
      iteration: row.data.iteration,
      createdAt: row.data.createdAt,
      migration: row.data.migration,
    };
  });

  return configs;
}

export function isConfiguredWithStaticGrid(cobotConfig: CobotConfig): boolean {
  const type = cobotConfig.config.FEEDER;

  if (type === 'PRO_FEEDER') {
    return false; // ProFeeder is always a pinned grid
  }

  return cobotConfig.config.GRID_TYPE === 'STATIC';
}

export function getMainDrawerStaticGridConfig(
  cobotConfig: CobotConfig,
  staticGridIndex?: string,
): StaticGridConfig {
  let index
  if(staticGridIndex){
    index = staticGridIndex
  } else {
    index = "0"
  }
  logger.info("staticGridIndex = " + staticGridIndex)
  logger.info("cobotConfig.config.STATIC_GRIDS[parseFloat(index)] = " + JSON.stringify(cobotConfig.config.STATIC_GRIDS[parseFloat(index)]))
  return cobotConfig.config.STATIC_GRIDS[parseFloat(index)];
}

export function getSecondDrawerStaticGridConfig(
  cobotConfig: CobotConfig,
  staticGridIndex?: string,
): StaticGridConfig {
  let index
  if(staticGridIndex){
    index = staticGridIndex
  } else {
    index = "0"
  }
  return cobotConfig.config.STATIC_GRIDS[parseFloat(index)];
}

export function maxCarryWeight(cobotInfo: CobotInfo, toolWeight: number): number {
  return cobotInfo.carryWeightMax - toolWeight;
}



export function getToolWeight(toolWeight: number) {
  return (
    toolWeight
  );
}

export function getToolWeightGripper1(cobotConfig: CobotConfig) {
  let toolWeight = 0;

  const gripper1 = getGripper1Info(cobotConfig)?.gripper;
  if (gripper1) {
    toolWeight += gripper1.weight;

    cobotConfig.config.GR1_ADDONS.forEach((selectedAddon) => {
      const addon = gripper1.addons?.find(
        (addon) => addon.id === selectedAddon,
      );

      if (addon) {
        toolWeight += addon.weight;
      }
    });
  }

  return toolWeight;
}

export function getToolWeightGripper2(cobotConfig: CobotConfig) {
  let toolWeight = 0;

  if (cobotConfig.config.HAS_SECOND_GRIPPER) {
    const gripper2 = getGripper2Info(cobotConfig)?.gripper;

    if (gripper2) {
      toolWeight += gripper2.weight;

      cobotConfig.config.GR2_ADDONS.forEach((selectedAddon) => {
        const addon = gripper2.addons?.find(
          (addon) => addon.id === selectedAddon,
        );

        if (addon) {
          toolWeight += addon.weight;
        }
      });
    }
  }

  return toolWeight;
}

export const getGripper1Info = makeGetGripperInfo('GR1');

export const getGripper2Info = makeGetGripperInfo('GR2');

export function makeGetGripperInfo(which: 'GR1' | 'GR2') {
  return (cobotConfig: CobotConfig) => {
    const supplierID = cobotConfig.config[`${which}_SUPPLIER`];

    const supplier = GRIPPER_SUPPLIERS.find((brand) => brand.id === supplierID);

    if (!supplier) {
      return undefined;
    }

    const gripperID = cobotConfig.config[`${which}_TYPE`];

    const gripper = supplier.grippers.find(
      (gripper) => gripper.id === gripperID,
    );

    if (!gripper) {
      return undefined;
    }

    return { gripper, supplier };
  };
}

export function getFeederInfo(
  cobotConfig: CobotConfig,
): FeederInfo | undefined {
  const feeder = cobotConfig.config.FEEDER;

  if (feeder === 'EASY_LOADER') {
    return EASY_LOADER_TYPES.find(
      (item) => item.id === cobotConfig.config.EASY_LOADER.TYPE,
    );
  } else if (feeder === 'META_LOADER') {
    return META_LOADER_TYPES.find(
      (item) => item.id === cobotConfig.config.META_LOADER.TYPE,
    );
  } else if (feeder === 'PRO_FEEDER') {
    return PRO_FEEDER_TYPES.find(
      (item) => item.id === cobotConfig.config.PRO_FEEDER.TYPE,
    );
  }
}

export function getDrawerCount(cobotConfig: CobotConfig): number {
  const feeder = cobotConfig.config.FEEDER;

  if (feeder === 'EASY_LOADER') {
    return 1;
  } else if (feeder === 'META_LOADER') {
    return parseFloat(cobotConfig.config.META_LOADER.NUMBER_OF_DRAWERS);
  } else if (feeder === 'PRO_FEEDER') {
    return parseFloat(cobotConfig.config.PRO_FEEDER.NUMBER_OF_DRAWERS);
  }

  return 1;
}

export function isConfiguredWithSupportForMultipleDrawers(
  cobotConfig: CobotConfig,
): boolean {
  const feeder = cobotConfig.config.FEEDER;

  return feeder !== 'EASY_LOADER';
}

export function isConfiguredWithStaticEasyLoaderWithSecondDrawer(
  cobotConfig: CobotConfig,
) {
  return (
    cobotConfig.config.FEEDER === 'EASY_LOADER' &&
    cobotConfig.config.GRID_TYPE === 'STATIC' &&
    cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER
  );
}

export function getAmountOfSquaresMainDrawer(cobotConfig: CobotConfig): number {
  if (cobotConfig.config.GRID_TYPE === 'PINNED') {
    throw new Error('pinned grid has no squares');
  }

  const staticGridConfig = getMainDrawerStaticGridConfig(cobotConfig);
  return (
    parseAsNumber(staticGridConfig.AMOUNT_SQUARES_X_AXIS, 1) *
    parseAsNumber(staticGridConfig.AMOUNT_SQUARES_Y_AXIS, 1)
  );
}

export function getAmountOfSquaresSecondDrawer(
  cobotConfig: CobotConfig,
): number {
  if (cobotConfig.config.GRID_TYPE === 'PINNED') {
    throw new Error('pinned grid has no squares');
  }

  const staticGridConfig = getSecondDrawerStaticGridConfig(cobotConfig);
  return (
    parseAsNumber(staticGridConfig.AMOUNT_SQUARES_X_AXIS, 1) *
    parseAsNumber(staticGridConfig.AMOUNT_SQUARES_Y_AXIS, 1)
  );
}
