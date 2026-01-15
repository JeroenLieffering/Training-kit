import AddIcon from '@mui/icons-material/Add';
import CodeIcon from '@mui/icons-material/Code';
import EngineeringIcon from '@mui/icons-material/Engineering';
import React, { useState } from 'react';
import { Button, Container, Debug, TopBar } from '../components';
import { DEBUG } from '../config';
import { ProductState } from '../core/models/product-types';
import { useNavigate } from '../hooks/useNavigate';
import { useProducts } from '../hooks/useProducts';
import { useT } from '../hooks/useT';
import { EmptyProductsCard } from './components/EmptyProductsCard';
import { LoadingProductsCard } from './components/LoadingProductsCard';
import { NoMatchProductCard } from './components/NoMatchProductCard';
import { ProductCard } from './components/ProductCard/ProductCard';
import { ProductSelectFilter } from './components/ProductSelectFilter';
import { SearchInput } from './components/SearchInput';
import { SetupButton } from './components/SetupButton/SetupButton';
import logo from './metasuite.png';

export function Products() {
  const t = useT();

  const navigateTo = useNavigate();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ProductState>('active');

  const areDefaultFiltersActive = query.trim() === '' && filter === 'active';

  const [products, isLoading] = useProducts();

  const filteredProducts = products
    .filter((product) => product.state === filter)
    .filter((product) =>
      product.name.toUpperCase().includes(query.toUpperCase()),
    );

  function clearFilters() {
    setFilter('active');
    setQuery('');
  }

  return (
    <Container>
      <TopBar padRight={false}>
        <img src={logo} width="255" height="55" />

        <div className="tw-flex tw-gap-4">
          {DEBUG ? (
            <Button
              variant="outline"
              icon={CodeIcon}
              onClick={() => navigateTo({ page: 'KITCHEN_SINK' })}
            >
              Kitchen Sink
            </Button>
          ) : null}
          <Button
            variant="outline"
            icon={EngineeringIcon}
            onClick={() => navigateTo({ page: 'MAINTENANCE' })}
          >
            {t('MAINTENANCE')}
          </Button>

          <SetupButton />

          <Button
            icon={AddIcon}
            onClick={() =>
              navigateTo({
                page: 'PRODUCT_CREATE',
                'subPage': { page: 'INFO' },
              })
            }
          >
            {t('PRODUCT_ADD')}
          </Button>
        </div>
      </TopBar>

      {isLoading ? (
        <LoadingProductsCard />
      ) : products.length === 0 ? (
        <EmptyProductsCard
          onClick={() =>
            navigateTo({ page: 'PRODUCT_CREATE', subPage: { page: 'INFO' } })
          }
        />
      ) : (
        <div className="tw-grid tw-gap-4">
          <div className="tw-grid tw-grid-cols-3 tw-gap-4">
            <SearchInput value={query} onChange={setQuery} />

            <ProductSelectFilter
              value={filter}
              onChange={setFilter}
              products={products}
            />
          </div>

          {filteredProducts.length === 0 ? (
            <NoMatchProductCard
              areDefaultFiltersActive={areDefaultFiltersActive}
              onClick={clearFilters}
            />
          ) : (
            <div className="tw-grid tw-gap-4 tw-grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={(product) =>
                    navigateTo({
                      page: 'PRODUCT_DETAIL',
                      productID: product.id,
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      <Debug
        value={{
          products,
          filteredProducts,
          filter,
        }}
      />
    </Container>
  );
}
