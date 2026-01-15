import { useEffect, useState } from 'react';
import { loadProducts } from '../core/services/product-service';
import { useDatabase } from './useDatabase';
import { Product } from '../core/models/product-types';

export function useProducts() {
  const database = useDatabase();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await loadProducts(database);
      setProducts(data);
      setLoading(false);
    }

    load();
  }, []);

  return [products, loading] as const;
}
