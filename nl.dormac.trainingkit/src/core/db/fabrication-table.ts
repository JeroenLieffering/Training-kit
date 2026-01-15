import { IDartDatabase, logger } from 'dart-api';
import { DEBUG } from '../../config';
import { Fabrication } from '../models/fabrication-type';

export const FABRICATION_TABLE_NAME = 'FABRICATION';
export const FABRICATION_COLUMN_NAMES: (keyof Fabrication)[] = [
  'id',
  'productId',
  'productIteration',
  'configurationId',
  'data',
  'createdAt',
  'migration',
];

export async function createFabricationTable(database: IDartDatabase) {
  const fabricationTableExists = await database.hasTable(
    FABRICATION_TABLE_NAME,
  );

  if (fabricationTableExists) {
    if (DEBUG) {
      await database.deleteTable(FABRICATION_TABLE_NAME);
    } else {
      logger.info('FABRICATION table already exists');
      return;
    }
  }

  logger.info('Creating table FABRICATION');
  await database.createTable(
    FABRICATION_TABLE_NAME,
    FABRICATION_COLUMN_NAMES,
    false,
  );

  logger.info('Finished creating FABRICATION table');
}
