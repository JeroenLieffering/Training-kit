import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import React, { useState } from 'react';
import { Grid, IconButton, PinTable, SubTitle } from '../../../components';
import { CobotConfig } from '../../../core/models/cobot-config-types';
import { Product } from '../../../core/models/product-types';
import { isConfiguredWithStaticGrid } from '../../../core/services/cobot-config-service';
import {
  calculateInitialProductsForDrawer,
  calculateTotalProductsForMainDrawer,
  calculateTotalProductsForSecondDrawer,
} from '../../../core/services/drawer-service';
import { useT } from '../../../hooks/useT';
import { FabricationState } from '../../types';
import { ToolCard } from './components/ToolCard';

type Props = {
  product: Product;
  cobotConfig: CobotConfig;
  fabricationState: FabricationState;
};

export function ProductDetailConfiguration({
  product,
  cobotConfig,
  fabricationState,
}: Props) {
  const t = useT();

  const [showGridFullScreen, setShowGridFullScreen] = useState(false);

  const showSecondGripper =
    cobotConfig.config.HAS_SECOND_GRIPPER && product.config.USE_SECOND_GRIPPER;

  const showSubSpindle =
    cobotConfig.config.MACHINE_HAS_SUB_SPINDLE &&
    product.config.USE_SUB_SPINDLE;

  const maxProductsPerDrawer =
    fabricationState.activeDrawer === 'MAIN'
      ? calculateTotalProductsForMainDrawer(product)
      : calculateTotalProductsForSecondDrawer(product);

  let productsOnDrawerAtStart = 0;
  if (
    fabricationState.activeDrawer === 'MAIN' &&
    product.config.IO_MODE !== 'OUTPUT'
  ) {
    productsOnDrawerAtStart = calculateInitialProductsForDrawer({
      maxProductsPerDrawer,
      drawer: fabricationState.drawerCount,
      totalToProduce: fabricationState.amount,
    });
  }

  const isStaticGrid = isConfiguredWithStaticGrid(cobotConfig);

  const productsPicked = product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER
    ? fabricationState.activeDrawer === 'SECOND'
      ? 0
      : fabricationState.productsPickedOnCurrentDrawer
    : fabricationState.productsPickedOnCurrentDrawer;

  const productsPlaced = product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER
    ? fabricationState.activeDrawer === 'SECOND'
      ? fabricationState.productsPlacedOnCurrentDrawer
      : 0
    : fabricationState.productsPlacedOnCurrentDrawer;

  const grid = (
    <Grid
      cobotConfig={cobotConfig}
      product={product}
      scale={0.5}
      productsOnDrawerAtStart={productsOnDrawerAtStart}
      productsPicked={productsPicked}
      productsPlaced={productsPlaced}
      showFullScreen={showGridFullScreen}
      onExitFullScreen={() => setShowGridFullScreen(false)}
      drawer={fabricationState.activeDrawer}
    />
  );

  return (
    <>
      <SubTitle className="tw-flex tw-justify-between tw-items-center">
        {t('CONFIGURATION')}

        <IconButton
          icon={OpenInFullIcon}
          onClick={() => setShowGridFullScreen(true)}
        />
      </SubTitle>

      {!isStaticGrid ? (
        <div className="tw-flex tw-gap-4">
          {grid}

          <PinTable product={product} mode="small" />
        </div>
      ) : (
        <div className="tw-flex tw-justify-center">{grid}</div>
      )}

      <div className="tw-grid tw-gap-4 tw-grid-cols-2">
        <ToolCard
          title={t('GRIPPER_NO_1')}
          depth={product.config.GR1_CLAW_DEPTH}
          height={product.config.GR1_CLAW_HEIGHT}
        />

        {showSecondGripper ? (
          <ToolCard
            title={t('GRIPPER_NO_2')}
            depth={product.config.GR2_CLAW_DEPTH}
            height={product.config.GR2_CLAW_HEIGHT}
          />
        ) : null}

        <ToolCard
          title={t('MAIN_SPINDLE')}
          depth={product.config.MAIN_CLAW_DEPTH}
          height={product.config.MAIN_CLAW_HEIGHT}
        />

        {showSubSpindle ? (
          <ToolCard
            title={t('SUB_SPINDLE')}
            depth={product.config.SUB_CLAW_DEPTH}
            height={product.config.SUB_CLAW_HEIGHT}
          />
        ) : null}
      </div>
    </>
  );
}
