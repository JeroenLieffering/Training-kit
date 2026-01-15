import { DEMO, DEMO_NO_PRODUCTS_PER_DRAWER } from '../../config';
import { range } from '../../utils/array';
import { parseAsNumber } from '../../utils/number';
import { CobotConfig } from '../models/cobot-config-types';
import { Product } from '../models/product-types';
import { getDrawerCount } from './cobot-config-service';

export type Drawer =
  /**
   * Represents the main drawer or the current active drawer from a
   * drawer system such as the metaloader / profeeder.
   */
  | 'MAIN'
  /**
   * Represents a second drawer for when there is an EasyLoader with
   * the second drawer option enabled.
   */
  | 'SECOND';

export function calculateTotalProducts(
  cobotConfig: CobotConfig,
  product: Product,
): number {
  return (
    getDrawerCount(cobotConfig) * calculateTotalProductsForMainDrawer(product)
  );
}

export function calculateTotalProductsForMainDrawer(product: Product): number {
  if (DEMO && DEMO_NO_PRODUCTS_PER_DRAWER) {
    return DEMO_NO_PRODUCTS_PER_DRAWER;
  }

  const spots = product.config.SPOT_STATUS.filter((status) => status).length;
  const z = parseFloat(product.config.DRAWER_AMOUNT_PRODUCT_Z);

  const total = spots * z;

  if (
    z === 1 ||
    product.config.IO_MODE === 'OUTPUT' ||
    product.config.IO_MODE === 'INPUT' ||
    product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER ||
    product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION
  ) {
    return total;
  } else {
    // First position can only contains one item, when mode
    // is INPUT_OUTPUT, this is so a position is always available
    // to place the first finished product
    return total - (z - 1);
  }
}

export function calculateTotalProductsForSecondDrawer(
  product: Product,
): number {
  const x = parseFloat(product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X);
  const y = parseFloat(product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y);
  const z = parseFloat(product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Z);

  return x * y * z;
}

type CalculateInitialProductsForDrawerConfig = {
  drawer: number;
  maxProductsPerDrawer: number;
  totalToProduce: number;
};

export function calculateInitialProductsForDrawer({
  drawer,
  maxProductsPerDrawer,
  totalToProduce,
}: CalculateInitialProductsForDrawerConfig) {
  const normalizedDrawer = drawer + 1;

  if (normalizedDrawer * maxProductsPerDrawer <= totalToProduce) {
    return maxProductsPerDrawer;
  } else {
    return (
      maxProductsPerDrawer -
      (normalizedDrawer * maxProductsPerDrawer - totalToProduce)
    );
  }
}

type CalculateSpotStatusParams = {
  shouldFirstSpotHaveOneItem: boolean;
  noSpots: number;
  productsOnDrawerAtStart: number;
  productsPicked: number;
  productsPlaced: number;
  stack: number;
  spotStatus: boolean[];
  spotOrder: number[];
};

export type Spot = {
  amount: number;
  mode: 'RAW' | 'FINISHED' | 'EMPTY';
  reachable: boolean;
};

export function calculateSpotStatus({
  shouldFirstSpotHaveOneItem,
  noSpots,
  productsOnDrawerAtStart,
  productsPicked,
  productsPlaced,
  stack,
  spotStatus,
  spotOrder,
}: CalculateSpotStatusParams): Spot[] {
  const spots: Spot[] = range(noSpots).map((_pos, index) => {
    const reachable = spotStatus[index];

    if (reachable) {
      return { amount: stack, mode: 'RAW', reachable };
    } else {
      return { amount: 0, mode: 'EMPTY', reachable };
    }
  });

  if (shouldFirstSpotHaveOneItem) {
    for (let i = 0; i < spots.length; i++) {
      const orderIndex = spotOrder[i];
      const spot = spots[orderIndex];

      if (spot.reachable) {
        spot.amount = 1;
        break;
      }
    }
  }

  const totalProducts = spots
    .filter((spot) => spot.reachable)
    .reduce((acc, n) => acc + n.amount, 0);

  const productsToBeRemovedFromEnd = totalProducts - productsOnDrawerAtStart;

  // Remove all extra products from the end
  let spotIndex = spots.length - 1;
  let i = 0;
  while (i < productsToBeRemovedFromEnd) {
    const orderIndex = spotOrder[spotIndex];
    const spot = spots[orderIndex];

    if (!spot) {
      break;
    }

    if (spot.reachable) {
      // Decrease the current spot
      if (spot.amount > 0) {
        spot.amount -= 1;
      }

      // When the spot is empty move the the next spot.
      if (spot.amount === 0) {
        spotIndex -= 1;
      }
      i++;
    } else {
      spotIndex -= 1;
    }
  }

  // Remove all picked up products from the start.
  spotIndex = 0;
  i = 0;
  while (i < productsPicked) {
    const orderIndex = spotOrder[spotIndex];
    const spot = spots[orderIndex];

    if (!spot) {
      break;
    }

    if (spot.reachable) {
      // Decrease the current spot
      if (spot.amount > 0) {
        spot.amount -= 1;
      }

      // When the spot is empty move the the next spot.
      if (spot.amount === 0) {
        spotIndex += 1;
      }
      i += 1;
    } else {
      spotIndex += 1;
    }
  }

  // Add all placed products
  spotIndex = 0;
  i = 0;
  while (i < productsPlaced) {
    const orderIndex = spotOrder[spotIndex];
    const spot = spots[orderIndex];

    if (!spot) {
      break;
    }

    if (spot.reachable) {
      // Increase the current spot
      spot.amount += 1;
      spot.mode = 'FINISHED';

      // When the spot is filled move the the next spot.
      if (spot.amount === stack) {
        spotIndex += 1;
      }
      i += 1;
    } else {
      spotIndex += 1;
    }
  }

  for (const spot of spots) {
    if (spot.amount === 0) {
      spot.mode = 'EMPTY';
    }
  }

  return spots;
}

export function calculateMainDrawerSpotOrder(product: Product): number[] {
  /* 
     The main drawers order starts at the top left and works its 
     way down from left to right.
    
     The spot order in a 3 x 3 x 3 example will have 3 * 3 = 9 
     spots, visually this looks like this:
    
     [6, 7, 8]
     [3, 4, 5]
     [0, 1, 2]
    
     Below you will find the order visualized, below the `=` line
     you can see the spot order, above the `=` line you can see 
     the positions inside the spot.
    
     24 25 26 21 22 23 18 19 20
     15 16 17 12 13 14 9  10 11
     6  7  8  3  4  5  0  1  2 
     ========================= 
     6  7  8  3  4  5  0  1  2
    
     Given the 3 x 3 x 3 the code below returns the following 
     array: [6, 7, 8, 3, 4, 5, 0, 1, 2]
   */

  const DRAWER_AMOUNT_PRODUCT_Y = parseAsNumber(
    product.config.DRAWER_AMOUNT_PRODUCT_Y,
    0,
  );
  const DRAWER_AMOUNT_PRODUCT_X = parseAsNumber(
    product.config.DRAWER_AMOUNT_PRODUCT_X,
    0,
  );

  const order: number[] = [];

  for (let y = DRAWER_AMOUNT_PRODUCT_Y; y > 0; y--) {
    const leftMostSpotOnY =
      DRAWER_AMOUNT_PRODUCT_X * y - DRAWER_AMOUNT_PRODUCT_X;

    for (let x = 0; x < DRAWER_AMOUNT_PRODUCT_X; x++) {
      order.push(leftMostSpotOnY + x);
    }
  }

  return order;
}

export function calculateSecondDrawerSpotOrder(product: Product): number[] {
  /*
    The second drawers order starts at the bottom right and works
    its way up from right to left
  
    The spot order in a 3 x 3 x 3 example will have 3 * 3 = 9 
    spots, visually this looks like this:
  
    [6, 7, 8]
    [3, 4, 5]
    [0, 1, 2]
  
    Below you will find the order visualized, below the `=` line
    you can see the spot order, above the `=` line you can see 
    the positions inside the spot.
  
    20 19 18 23 22 21 26 25 24 
    11 10 9  14 13 12 17 16 15 
    2  1  0  5  4  3  8  7  6  
    ==========================
    2  1  0  5  4  3  8  7  6
  
    Given the 3 x 3 x 3 the code below returns the following 
    array: [2, 1, 0, 5, 4, 3, 8, 7, 6]
  */

  const SECOND_DRAWER_AMOUNT_PRODUCT_Y = parseAsNumber(
    product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y,
    0,
  );
  const SECOND_DRAWER_AMOUNT_PRODUCT_X = parseAsNumber(
    product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X,
    0,
  );

  const order: number[] = [];

  for (let y = 0; y < SECOND_DRAWER_AMOUNT_PRODUCT_Y; y++) {
    const rightMostSpotOnY =
      SECOND_DRAWER_AMOUNT_PRODUCT_X * y + SECOND_DRAWER_AMOUNT_PRODUCT_X;

    for (let x = 0; x < SECOND_DRAWER_AMOUNT_PRODUCT_X; x++) {
      order.push(rightMostSpotOnY - x - 1);
    }
  }

  return order;
}
