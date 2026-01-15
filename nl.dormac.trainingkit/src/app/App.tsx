import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { Router } from './Router';
import {
  createProductConfigHistoryTable,
  createProductsTable,
} from '../core/db/product-table';

import {
  createConfigHistoryTable,
  createConfigTable,
} from '../core/db/cobot-config-table';
import { createFabricationTable } from '../core/db/fabrication-table';
import { useT } from '../hooks/useT';

export function App() {
  const t = useT();

  const [databaseInitialized, setDatabaseInitialized] = useState(false);

  const database = useDatabase();

  useEffect(() => {
    async function initDB() {
      // This order is important!
      await createConfigHistoryTable(database);
      await createConfigTable(database);

      await createFabricationTable(database);

      await createProductConfigHistoryTable(database);
      await createProductsTable(database);

      setDatabaseInitialized(true);
    }

    initDB();
  }, []);

  if (!databaseInitialized) {
    return null;
  }

  return (
    <Suspense fallback={<p>{t('LOADING')}</p>}>
      <Router />
    </Suspense>
  );
}
