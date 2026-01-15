import React, { createContext, useState } from 'react';
import { KitchenSink } from '../KitchenSink/KitchenSink';
import { Maintenance } from '../Maintenance/Maintenance';
import { ProductCreate } from '../ProductCreate/ProductCreate';
import { ProductDetail } from '../ProductDetail/ProductDetail';
import { ProductEdit } from '../ProductEdit/ProductEdit';
import { Products } from '../Products/Products';
import { Setup } from '../Setup/Setup';
import { Page } from '../types';

export const NavigateContext = createContext<(page: Page) => void>(
  () => undefined,
);

export function Router() {
  const [page, navigateTo] = useState<Page>({ page: 'PRODUCTS' });

  return (
    <NavigateContext.Provider value={navigateTo}>
      <PageSwitch page={page} />
    </NavigateContext.Provider>
  );
}

function PageSwitch({ page }: { page: Page }) {
  if (page.page === 'KITCHEN_SINK') {
    return <KitchenSink />;
  } else if (page.page === 'MAINTENANCE') {
    return <Maintenance />;
  } else if (page.page === 'SETUP') {
    return <Setup initialSubPage={page.subPage} />;
  } else if (page.page === 'PRODUCT_CREATE') {
    return <ProductCreate initialSubPage={page.subPage} />;
  } else if (page.page === 'PRODUCT_EDIT') {
    return (
      <ProductEdit
        key={page.productID}
        productID={page.productID}
        initialSubPage={page.subPage}
      />
    );
  } else if (page.page === 'PRODUCT_DETAIL') {
    return <ProductDetail key={page.productID} productID={page.productID} />;
  }

  return <Products />;
}
