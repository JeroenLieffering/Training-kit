import { useEffect, useState } from 'react';
import { Fabrication } from '../core/models/fabrication-type';
import { Product } from '../core/models/product-types';
import { loadFabricationsForProduct } from '../core/services/fabrication-service';
import { useDatabase } from './useDatabase';

export function useFabrications(product: Product) {
  const database = useDatabase();

  const [fabrications, setFabrications] = useState<Fabrication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await loadFabricationsForProduct(database, product);
      setFabrications(data);
      setLoading(false);
    }

    load();
  }, []);

  return [fabrications, loading] as const;
}
