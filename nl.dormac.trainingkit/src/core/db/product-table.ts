import { IDartDatabase, logger } from 'dart-api';
import { DEBUG, MIGRATION } from '../../config';
import { randomInteger } from '../../utils/number';
import {
  makeAnchor,
  makeCar,
  makeGear,
  makeHammer,
  makeRocket,
  makeSaw,
  makeWrench,
} from '../fixtures/product-fixtures';
import { Product, ProductHistory } from '../models/product-types';
import { insertFabrication } from '../services/fabrication-service';
import {
  insertProductWithHistory,
  syncProductWithCobotConfig,
} from '../services/product-service';
import { INITIAL_CONFIG_ID, makeInitialConfig } from './cobot-config-table';

export const PRODUCTS_TABLE_NAME = 'PRODUCT';
export const PRODUCT_CONFIG_HISTORY_TABLE_NAME = 'PRODUCT_HISTORY';

export const PRODUCTS_COLUMN_NAMES: (keyof Product)[] = [
  'id',
  'name',
  'description',
  'icon',
  'color',
  'state',
  'config',
  'lastFabricationDuration',
  'lastFabricationAmount',
  'iteration',
  'createdAt',
  'updatedAt',
  'migration',
];

export const PRODUCTS_CONFIG_HISTORY_COLUMN_NAMES: (keyof ProductHistory)[] = [
  'id',
  'productId',
  'config',
  'iteration',
  'createdAt',
  'migration',
];

export async function createProductsTable(database: IDartDatabase) {
  const productsTableExists = await database.hasTable(PRODUCTS_TABLE_NAME);

  if (productsTableExists) {
    if (DEBUG) {
      await database.deleteTable(PRODUCTS_TABLE_NAME);
    } else {
      logger.info('PRODUCTS table already exists');
      return;
    }
  }

  logger.info('Creating table PRODUCTS');
  await database.createTable(PRODUCTS_TABLE_NAME, PRODUCTS_COLUMN_NAMES, false);

  if (DEBUG) {
    logger.info('Inserting DEBUG products');

    const cobotConfig = makeInitialConfig();

    const wrench = makeWrench();
    syncProductWithCobotConfig(wrench, cobotConfig);
    await insertProductWithHistory(database, wrench);

    const car = makeCar();
    syncProductWithCobotConfig(car, cobotConfig);
    await insertProductWithHistory(database, car);

    for (let index = 0; index < 100; index++) {
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - index);

      await insertFabrication(database, {
        id: crypto.randomUUID(),
        productId: wrench.id,
        productIteration: wrench.iteration,
        configurationId: INITIAL_CONFIG_ID,
        data: {
          success: true,
          error: '',
          duration: randomInteger(68039, 68039 * 10),
        },
        createdAt: createdAt.toISOString(),
        migration: MIGRATION,
      });
    }

    for (let index = 0; index < 100; index++) {
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - index);

      const success = Math.random() > 0.5;

      await insertFabrication(database, {
        id: crypto.randomUUID(),
        productId: car.id,
        productIteration: car.iteration,
        configurationId: INITIAL_CONFIG_ID,
        data: {
          success,
          error: success ? '' : 'PICKUP_FAILED',
          duration: randomInteger(68039, 68039 * 10),
        },
        createdAt: createdAt.toISOString(),
        migration: MIGRATION,
      });
    }

    const anchor = makeAnchor();
    syncProductWithCobotConfig(anchor, cobotConfig);
    await insertProductWithHistory(database, anchor);

    for (let index = 0; index < 50; index++) {
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - index);

      await insertFabrication(database, {
        id: crypto.randomUUID(),
        productId: car.id,
        productIteration: car.iteration,
        configurationId: INITIAL_CONFIG_ID,
        data: {
          success: false,
          error: 'PICKUP_FAILED',
          duration: randomInteger(68039, 68039 * 10),
        },
        createdAt: createdAt.toISOString(),
        migration: MIGRATION,
      });
    }

    const saw = makeSaw();
    syncProductWithCobotConfig(saw, cobotConfig);
    await insertProductWithHistory(database, saw);
    const hammer = makeHammer();
    syncProductWithCobotConfig(hammer, cobotConfig);
    await insertProductWithHistory(database, hammer);
    const rocket = makeRocket();
    syncProductWithCobotConfig(rocket, cobotConfig);
    await insertProductWithHistory(database, rocket);
    const gear = makeGear();
    syncProductWithCobotConfig(gear, cobotConfig);
    await insertProductWithHistory(database, gear);
  }

  logger.info('Finished creating PRODUCTS table');
}

export async function createProductConfigHistoryTable(database: IDartDatabase) {
  const configTableExists = await database.hasTable(
    PRODUCT_CONFIG_HISTORY_TABLE_NAME,
  );

  if (configTableExists) {
    if (DEBUG) {
      await database.deleteTable(PRODUCT_CONFIG_HISTORY_TABLE_NAME);
    } else {
      logger.info('PRODUCT_HISTORY table already exists');
      return;
    }
  }

  logger.info('Creating table PRODUCT_HISTORY');
  await database.createTable(
    PRODUCT_CONFIG_HISTORY_TABLE_NAME,
    PRODUCTS_CONFIG_HISTORY_COLUMN_NAMES,
    false,
  );

  logger.info('Finished creating PRODUCT_HISTORY table');
}
