import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Debug, ErrorBoundary } from '../components';
import { CobotConfig } from '../core/models/cobot-config-types';
import { Product } from '../core/models/product-types';
import { syncProductWithCobotConfig } from '../core/services/product-service';
import { productValidator } from '../core/validators/product-validator';
import { useT } from '../hooks/useT';
import { CobotInfo } from '../types';
import { errorToast } from '../utils/toast';
import { ProductFormSwitch } from './components/ProductFormSwitch/ProductFormSwitch';
import { ProductSideBar } from './components/ProductSideBar/ProductSideBar';
import { useMainDrawerSyncReachTested } from './hooks/useMainDrawerSyncReachTested';
import { useSecondDrawerSyncReachTested } from './hooks/useSecondDrawerSyncReachTested';
import { ProductFormMode, ProductFormSubPage } from './types';

type Props = {
  product: Product;
  cobotConfig: CobotConfig;
  cobotInfo: CobotInfo;
  onSubmit: (product: Product) => void;
  initialSubPage: ProductFormSubPage;
  mode: ProductFormMode;
  toolWeight: number;
};

export function ProductForm({
  product,
  cobotConfig,
  cobotInfo,
  onSubmit,
  initialSubPage,
  mode,
  toolWeight,
}: Props) {
  const t = useT();

  const [subPage, setSubPage] = useState<ProductFormSubPage>(initialSubPage);

  const form = useForm<Product>({
    defaultValues: { ...product, config: { ...product.config } },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: (product) =>
      productValidator(product, cobotConfig, cobotInfo, toolWeight),
  });

  const pinDiameter = form.watch('config.POSITIONING_PIN_DIAMETER');
  const productDiameter = form.watch('config.RAW_MAT_DIAMETER');
  const productLength = form.watch('config.RAW_MAT_LENGTH');
  const productWidth = form.watch('config.RAW_MAT_WIDTH');
  const stack = form.watch('config.DRAWER_AMOUNT_PRODUCT_Z');
  const isRound = form.watch('config.ROUND_PRODUCT');

  useEffect(() => {
    syncProductWithCobotConfig(form, cobotConfig);
  }, [
    pinDiameter,
    productDiameter,
    stack,
    isRound,
    productLength,
    productWidth,
  ]);

  function handleSubmitError() {
    errorToast(t, t('FORM_CONTAINS_ERRORS'));
  }

  useMainDrawerSyncReachTested(form);
  useSecondDrawerSyncReachTested(form);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, handleSubmitError)}
        className="tw-h-full"
      >
        <div className="tw-h-full tw-flex">
          <ProductSideBar
            mode={mode}
            form={form}
            subPage={subPage}
            setSubPage={setSubPage}
            product={product}
          />
          <div className="tw-flex-1 tw-ml-4">
            <ErrorBoundary key={subPage.page}>
              <ProductFormSwitch
                mode={mode}
                subPage={subPage}
                setSubPage={setSubPage}
                form={form}
                cobotInfo={cobotInfo}
                cobotConfig={cobotConfig}
              />
            </ErrorBoundary>
            <Debug value={form.getValues()} className="tw-mt-4" />
            <Debug value={form.formState.errors} className="tw-mt-4" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
