import { IDartDatabase, TableRow } from 'dart-api';
import {
  FABRICATION_COLUMN_NAMES,
  FABRICATION_TABLE_NAME,
} from '../db/fabrication-table';
import { Product } from '../models/product-types';
import { Fabrication } from '../models/fabrication-type';

export async function loadFabricationsForProduct(
  database: IDartDatabase,
  product: Product,
) {
  const rows = await database.query(
    FABRICATION_TABLE_NAME,
    FABRICATION_COLUMN_NAMES,
    {
      productId: product.id,
      productIteration: product.iteration,
    },
  );

  const fabrication: Fabrication[] = rows.map(rowToFabrication);

  return fabrication;
}

export async function insertFabrication(
  database: IDartDatabase,
  fabrication: Fabrication,
) {
  const result = await database.insert(FABRICATION_TABLE_NAME, [
    fabrication.id,
    fabrication.productId,
    fabrication.productIteration,
    fabrication.configurationId,
    JSON.stringify(fabrication.data),
    fabrication.createdAt,
    fabrication.migration,
  ]);

  return result;
}

function rowToFabrication(row: TableRow): Fabrication {
  return {
    id: row.data.id,
    productId: row.data.productId,
    productIteration: row.data.productIteration,
    configurationId: row.data.configurationId,
    data: JSON.parse(row.data.data),
    createdAt: row.data.createdAt,
    migration: row.data.migration,
  };
}

export function getFabricationInfo(fabrications: Fabrication[]) {
  let totalDuration = 0;
  let lastRun = fabrications[0].createdAt;
  let errors = 0;

  fabrications.forEach((fabrication) => {
    totalDuration += fabrication.data.duration;

    if (fabrication.createdAt > lastRun) {
      lastRun = fabrication.createdAt;
    }

    if (fabrication.data.error) {
      errors += 1;
    }
  });

  return {
    totalProduced: fabrications.length,
    totalDuration,
    averageDuration: totalDuration / fabrications.length,
    successRate: (100 - (errors / fabrications.length) * 100).toFixed(0),
    errors,
    lastRun,
  };
}
