import { useEffect, useState } from 'react';
import { Product } from '../core/models/product-types';
import { loadProductById } from '../core/services/product-service';
import { useDatabase } from './useDatabase';

export function useProduct(productId: string) {
  const database = useDatabase();

  const [product, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await loadProductById(database, productId);
      setProducts(data);
      setLoading(false);
    }

    load();
  }, []);

  return [product, loading] as const;
}
