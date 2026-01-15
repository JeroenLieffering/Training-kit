import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { StaticGrid } from '../../../../../../../../components';
import { makeWrench } from '../../../../../../../../core/fixtures/product-fixtures';
import { CobotConfig } from '../../../../../../../../core/models/cobot-config-types';
import { clamp, parseAsNumber } from '../../../../../../../../utils/number';
import { range } from '../../../../../../../../utils/array';

export type TEACH_POSITION =
  | 'DRAWER_LEFT_FRONT_TEACH_POSITION'
  | 'DRAWER_RIGHT_FRONT_TEACH_POSITION'
  | 'DRAWER_LEFT_BACK_TEACH_POSITION'
  | 'DRAWER_RIGHT_BACK_TEACH_POSITION';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  activeTeachPosition: TEACH_POSITION;
  selectedIndex: number;
};

export function TeachGridVisualization({
  form,
  activeTeachPosition,
  selectedIndex,
}: Props) {
  const cobotConfig = form.watch();

  const staticGrids = form.watch('config.STATIC_GRIDS');

  const staticGridConfig = staticGrids[selectedIndex];

  const amountX = clamp(
    parseAsNumber(staticGridConfig.AMOUNT_SQUARES_X_AXIS, 1),
    1,
    50,
  );

  const amountY = clamp(
    parseAsNumber(staticGridConfig.AMOUNT_SQUARES_Y_AXIS, 1),
    1,
    50,
  );

  const product = makeWrench();
  product.config.DRAWER_AMOUNT_PRODUCT_X = amountX.toString();
  product.config.DRAWER_AMOUNT_PRODUCT_Y = amountY.toString();
  product.config.SPOT_STATUS = range(amountX * amountY).map(() => true);

  const activeSpot = activeSpotForTeachPosition(
    activeTeachPosition,
    amountX,
    amountY,
  );

  return (
    <StaticGrid
      cobotConfig={cobotConfig}
      product={product}
      productsOnDrawerAtStart={0}
      productsPlaced={0}
      scale={0.3}
      showFullScreen={false}
      onExitFullScreen={() => undefined}
      drawer="MAIN"
      activeSpot={activeSpot}
      staticGridIndex={selectedIndex.toString()}
    />
  );
}

function activeSpotForTeachPosition(
  teachPosition: TEACH_POSITION,
  amountX: number,
  amountY: number,
) {
  switch (teachPosition) {
    case 'DRAWER_LEFT_FRONT_TEACH_POSITION':
      return 0;

    case 'DRAWER_RIGHT_FRONT_TEACH_POSITION':
      return amountX - 1;

    case 'DRAWER_LEFT_BACK_TEACH_POSITION':
      return amountY * amountX - amountX;

    case 'DRAWER_RIGHT_BACK_TEACH_POSITION':
      return amountY * amountX - 1;
  }
}
