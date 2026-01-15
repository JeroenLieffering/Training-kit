import { IDartDatabase } from 'dart-api';
import {
  COBOT_CONFIG_HISTORY_TABLE_NAME,
  COBOT_CONFIG_TABLE_NAME,
} from '../../db/cobot-config-table';
import { CobotConfig } from '../../models/cobot-config-types';
import {
  insertCobotConfigHistory,
  insertConfig,
  loadCobotConfig,
  loadCobotConfigHistory,
} from '../cobot-config-service';
import { insertFabrication } from '../fabrication-service';
import {
  deleteProduct,
  insertProduct,
  insertProductHistory,
  loadProducts,
} from '../product-service';
import { BackupRestoreListeners } from './types';

/* 
  TODO: in the future when migrations are implemented apply migration
  to everything that is imported.
*/

export function isValidBackup(json: any) {
  // Note that this is a very rudimentary check, but it is meant to
  // prevent silly mistakes, not to "validate" the entire product.
  // Garbage in garbage out.
  return (
    json &&
    json instanceof Object &&
    Array.isArray(json.products) &&
    json.cobotConfig instanceof Object
  );
}

export async function restore(
  database: IDartDatabase,
  json: any,
  listeners: BackupRestoreListeners,
) {
  listeners.setTotalProducts(json.products.length);

  await clearDb(database);

  await importCobotConfig(database, json);

  await importProducts(database, json, listeners);
}

async function clearDb(database: IDartDatabase) {
  // Load the current config and delete it.
  const config = await loadCobotConfig(database);

  await database.delete(COBOT_CONFIG_TABLE_NAME, {
    id: config.id,
  });

  // Now load all cobot config histories and delete it as well
  for (const history of await loadCobotConfigHistory(database)) {
    await database.delete(COBOT_CONFIG_HISTORY_TABLE_NAME, {
      id: history.id,
    });
  }

  // Finally simply remove all products
  for (const product of await loadProducts(database)) {
    // This will also delete all histories and fabrications
    await deleteProduct(database, product);
  }
}

async function importCobotConfig(database: IDartDatabase, json: any) {
  const cobotConfig = json.cobotConfig as CobotConfig;

  insertConfig(database, cobotConfig);

  if (json.cobotConfigHistory) {
    for (const cobotConfigHistory of json.cobotConfigHistory) {
      insertCobotConfigHistory(database, cobotConfigHistory);
    }
  }
}

async function importProducts(
  database: IDartDatabase,
  json: any,
  { setCurrentProduct }: BackupRestoreListeners,
) {
  let no = 1;
  for (const product of json.products) {
    setCurrentProduct(no);

    // First insert the product
    await insertProduct(database, product);

    // Insert all fabrications next, if we have any
    if (json.fabrications) {
      for (const fabrication of json.fabrications[product.id]) {
        fabrication.productId = product.id;
        await insertFabrication(database, fabrication);
      }
    }

    // Finally add the product history if we have any.
    if (json.productHistories) {
      for (const productHistory of json.productHistories[product.id]) {
        await insertProductHistory(database, productHistory);
      }
    }

    no += 1;
  }
}
