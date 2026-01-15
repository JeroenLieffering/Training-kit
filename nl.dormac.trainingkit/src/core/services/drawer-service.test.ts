import { range } from '../../utils/array';
import {
  configEasyloaderWithStaticGrid,
  configMetaLoaderWithStaticGrid,
  configProFeederWithPinnedGrid,
} from '../fixtures/cobot-config-fixtures';
import { makeAnchor, makeSaw, makeWrench } from '../fixtures/product-fixtures';
import {
  calculateInitialProductsForDrawer,
  calculateSpotStatus,
  calculateMainDrawerSpotOrder,
  calculateSecondDrawerSpotOrder,
  calculateTotalProducts,
  calculateTotalProductsForMainDrawer,
  calculateTotalProductsForSecondDrawer,
} from './drawer-service';

describe('service: Drawer', () => {
  describe('calculateTotalProducts', () => {
    describe('when FEEDER is EASY_LOADER', () => {
      it('should only take into account the main drawer', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();

        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '5';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '4';
        wrench.config.SPOT_STATUS = range(4 * 5).map(() => true);
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProducts(cobotConfig, wrench)).toBe(39);
      });

      it('should use the full drawer when EasyLoader has second drawer', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

        const wrench = makeWrench();
        wrench.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '5';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '4';
        wrench.config.SPOT_STATUS = range(5 * 4).map(() => true);
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProducts(cobotConfig, wrench)).toBe(40);
      });

      it('should only take into account reachable spots', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();

        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '2';
        wrench.config.SPOT_STATUS = [
          true,
          false,
          false,
          true,
          true,
          false,
          false,
          true,
        ];
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProducts(cobotConfig, wrench)).toBe(7);
      });
    });

    describe('when FEEDER is META_LOADER', () => {
      it('should when there is one drawer use the total products for main drawer', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.META_LOADER.NUMBER_OF_DRAWERS = '1';

        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '5';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '4';
        wrench.config.SPOT_STATUS = range(5 * 4).map(() => true);
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProducts(cobotConfig, wrench)).toBe(39);
      });

      it('should multiply by the number of drawers when there is more than one drawer', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.META_LOADER.NUMBER_OF_DRAWERS = '1';

        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '5';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '4';
        wrench.config.SPOT_STATUS = range(5 * 4).map(() => true);
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProducts(cobotConfig, wrench)).toBe(39);
      });

      it('should only take into account reachable spots', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.META_LOADER.NUMBER_OF_DRAWERS = '1';

        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '3';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '2';
        wrench.config.SPOT_STATUS = [true, true, false, false, false, false];
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '5';

        expect(calculateTotalProducts(cobotConfig, wrench)).toBe(6);
      });
    });

    describe('when FEEDER is PRO_FEEDER', () => {
      it('should when there is one drawer use the total products for main drawer', () => {
        const cobotConfig = configProFeederWithPinnedGrid();
        cobotConfig.config.PRO_FEEDER.NUMBER_OF_DRAWERS = '1';

        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '5';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '4';
        wrench.config.SPOT_STATUS = range(5 * 4).map(() => true);
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProducts(cobotConfig, wrench)).toBe(39);
      });

      it('should multiply by the number of drawers when there is more than one drawer', () => {
        const cobotConfig = configProFeederWithPinnedGrid();
        cobotConfig.config.PRO_FEEDER.NUMBER_OF_DRAWERS = '1';

        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '5';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '4';
        wrench.config.SPOT_STATUS = range(5 * 4).map(() => true);
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProducts(cobotConfig, wrench)).toBe(39);
      });

      it('should only take into account reachable spots', () => {
        const cobotConfig = configProFeederWithPinnedGrid();
        cobotConfig.config.PRO_FEEDER.NUMBER_OF_DRAWERS = '1';

        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '2';
        wrench.config.SPOT_STATUS = [
          true,
          false,
          false,
          false,
          true,
          true,
          false,
          false,
        ];
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProducts(cobotConfig, wrench)).toBe(5);
      });
    });
  });

  describe('calculateTotalProductsForMainDrawer', () => {
    describe('when IO_MODE is INPUT_OUTPUT', () => {
      it('should know how to calculate when z is 2', () => {
        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '5';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '4';
        wrench.config.SPOT_STATUS = range(5 * 4).map(() => true);
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProductsForMainDrawer(wrench)).toBe(39);
      });

      it('should know how to calculate when z is 3', () => {
        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '3';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '2';
        wrench.config.SPOT_STATUS = range(3 * 2).map(() => true);
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '3';

        expect(calculateTotalProductsForMainDrawer(wrench)).toBe(16);
      });

      it('should know how to calculate when z is 1', () => {
        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '3';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '2';
        wrench.config.SPOT_STATUS = range(3 * 2).map(() => true);
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

        expect(calculateTotalProductsForMainDrawer(wrench)).toBe(6);
      });

      it('should take into account the reachable spots', () => {
        const wrench = makeWrench();
        wrench.config.IO_MODE = 'INPUT_OUTPUT';
        wrench.config.DRAWER_AMOUNT_PRODUCT_X = '2';
        wrench.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
        wrench.config.SPOT_STATUS = [true, false, false, false, true, false];
        wrench.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProductsForMainDrawer(wrench)).toBe(3);
      });
    });

    describe('when IO_MODE is INPUT', () => {
      it('should know how to calculate when z is 2', () => {
        const anchor = makeAnchor();
        anchor.config.IO_MODE = 'INPUT';
        anchor.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        anchor.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
        anchor.config.SPOT_STATUS = range(4 * 3).map(() => true);
        anchor.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProductsForMainDrawer(anchor)).toBe(24);
      });

      it('should know how to calculate when z is 1', () => {
        const anchor = makeWrench();
        anchor.config.IO_MODE = 'INPUT';
        anchor.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        anchor.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
        anchor.config.SPOT_STATUS = range(4 * 3).map(() => true);
        anchor.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

        expect(calculateTotalProductsForMainDrawer(anchor)).toBe(12);
      });

      it('should take into account the reachable spots', () => {
        const anchor = makeWrench();
        anchor.config.IO_MODE = 'INPUT';
        anchor.config.DRAWER_AMOUNT_PRODUCT_X = '2';
        anchor.config.DRAWER_AMOUNT_PRODUCT_Y = '2';
        anchor.config.SPOT_STATUS = [true, false, false, false];
        anchor.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

        expect(calculateTotalProductsForMainDrawer(anchor)).toBe(1);
      });
    });

    describe('when IO_MODE is OUTPUT', () => {
      it('should know how to calculate when z is 2', () => {
        const saw = makeSaw();
        saw.config.IO_MODE = 'OUTPUT';
        saw.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        saw.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
        saw.config.SPOT_STATUS = range(4 * 3).map(() => true);
        saw.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProductsForMainDrawer(saw)).toBe(24);
      });

      it('should know how to calculate when z is 1', () => {
        const saw = makeSaw();
        saw.config.IO_MODE = 'OUTPUT';
        saw.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        saw.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
        saw.config.SPOT_STATUS = range(4 * 3).map(() => true);
        saw.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

        expect(calculateTotalProductsForMainDrawer(saw)).toBe(12);
      });

      it('should take into account the reachable spots', () => {
        const saw = makeSaw();
        saw.config.IO_MODE = 'OUTPUT';
        saw.config.DRAWER_AMOUNT_PRODUCT_X = '2';
        saw.config.DRAWER_AMOUNT_PRODUCT_Y = '4';
        saw.config.SPOT_STATUS = [
          true,
          false,
          false,
          true,
          true,
          true,
          false,
          false,
        ];
        saw.config.DRAWER_AMOUNT_PRODUCT_Z = '5';

        expect(calculateTotalProductsForMainDrawer(saw)).toBe(20);
      });
    });

    describe('when PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION is true', () => {
      it('should know how to calculate when z is 2', () => {
        const saw = makeSaw();
        saw.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;
        saw.config.IO_MODE = 'INPUT_OUTPUT';
        saw.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        saw.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
        saw.config.SPOT_STATUS = range(4 * 3).map(() => true);
        saw.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProductsForMainDrawer(saw)).toBe(24);
      });

      it('should know how to calculate when z is 1', () => {
        const saw = makeSaw();
        saw.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;
        saw.config.IO_MODE = 'OUTPUT';
        saw.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        saw.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
        saw.config.SPOT_STATUS = range(4 * 3).map(() => true);
        saw.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

        expect(calculateTotalProductsForMainDrawer(saw)).toBe(12);
      });

      it('should take into account the reachable spots', () => {
        const saw = makeSaw();
        saw.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;
        saw.config.IO_MODE = 'OUTPUT';
        saw.config.DRAWER_AMOUNT_PRODUCT_X = '3';
        saw.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
        saw.config.SPOT_STATUS = [
          true,
          false,
          false,
          true,
          false,
          false,
          true,
          false,
          false,
        ];
        saw.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

        expect(calculateTotalProductsForMainDrawer(saw)).toBe(3);
      });
    });

    describe('when PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER is true', () => {
      it('should know how to calculate when z is 2', () => {
        const saw = makeSaw();
        saw.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;
        saw.config.IO_MODE = 'INPUT_OUTPUT';
        saw.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        saw.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
        saw.config.SPOT_STATUS = range(4 * 3).map(() => true);
        saw.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProductsForMainDrawer(saw)).toBe(24);
      });

      it('should know how to calculate when z is 1', () => {
        const saw = makeSaw();
        saw.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;
        saw.config.IO_MODE = 'INPUT_OUTPUT';
        saw.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        saw.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
        saw.config.SPOT_STATUS = range(4 * 3).map(() => true);
        saw.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

        expect(calculateTotalProductsForMainDrawer(saw)).toBe(12);
      });

      it('should take into account the reachable spots', () => {
        const saw = makeSaw();
        saw.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;
        saw.config.IO_MODE = 'INPUT_OUTPUT';
        saw.config.DRAWER_AMOUNT_PRODUCT_X = '4';
        saw.config.DRAWER_AMOUNT_PRODUCT_Y = '2';
        saw.config.SPOT_STATUS = [
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ];
        saw.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

        expect(calculateTotalProductsForMainDrawer(saw)).toBe(4);
      });
    });
  });

  describe('calculateTotalProductsForSecondDrawer', () => {
    it('should know how to calculate when z is 3', () => {
      const wrench = makeWrench();
      wrench.config.SECOND_DRAWER_AMOUNT_PRODUCT_X = '3';
      wrench.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y = '2';
      wrench.config.SPOT_STATUS = range(3 * 2).map(() => true);
      wrench.config.SECOND_DRAWER_AMOUNT_PRODUCT_Z = '3';

      expect(calculateTotalProductsForSecondDrawer(wrench)).toBe(18);
    });

    it('should know how to calculate when z is 1', () => {
      const wrench = makeWrench();
      wrench.config.SECOND_DRAWER_AMOUNT_PRODUCT_X = '3';
      wrench.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y = '2';
      wrench.config.SPOT_STATUS = range(3 * 2).map(() => true);
      wrench.config.SECOND_DRAWER_AMOUNT_PRODUCT_Z = '1';

      expect(calculateTotalProductsForSecondDrawer(wrench)).toBe(6);
    });
  });

  describe('calculateInitialProductsForDrawer', () => {
    it('should know how to calculate the products that are going to be placed on the drawer initially', () => {
      expect(
        calculateInitialProductsForDrawer({
          drawer: 0,
          maxProductsPerDrawer: 25,
          totalToProduce: 124,
        }),
      ).toBe(25);

      expect(
        calculateInitialProductsForDrawer({
          drawer: 1,
          maxProductsPerDrawer: 25,
          totalToProduce: 124,
        }),
      ).toBe(25);

      expect(
        calculateInitialProductsForDrawer({
          drawer: 2,
          maxProductsPerDrawer: 25,
          totalToProduce: 124,
        }),
      ).toBe(25);

      expect(
        calculateInitialProductsForDrawer({
          drawer: 3,
          maxProductsPerDrawer: 25,
          totalToProduce: 124,
        }),
      ).toBe(25);

      expect(
        calculateInitialProductsForDrawer({
          drawer: 4,
          maxProductsPerDrawer: 25,
          totalToProduce: 124,
        }),
      ).toBe(24);
    });
  });

  describe('calculateSpotStatus', () => {
    describe('PINNED', () => {
      describe('when all spots are reachable', () => {
        describe('when doing input and output and therefore shouldFirstSpotHaveOneItem is true', () => {
          it('should work when stack is 1', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: true,
                noSpots: 6,
                productsOnDrawerAtStart: 6,
                stack: 1,
                spotStatus: [true, true, true, true, true, true],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 0,
                productsPlaced: 0,
              }),
            ).toEqual([
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
                productsPlaced: 0,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
                productsPlaced: 4,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 5,
                productsPlaced: 4,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 5,
                productsPlaced: 5,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 6,
                productsPlaced: 5,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 6,

                productsPlaced: 6,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
            ]);
          });

          it('should work when stack is N', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: true,
                noSpots: 6,
                productsOnDrawerAtStart: 9,
                stack: 3,
                productsPlaced: 0,
                spotStatus: [true, true, true, true, true, true],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 0,
                productsPlaced: 0,
              }),
            ).toEqual([
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
                productsPlaced: 0,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
                productsPlaced: 4,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 5,
                productsPlaced: 4,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 5,
                productsPlaced: 5,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 6,
                productsPlaced: 5,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 6,
                productsPlaced: 6,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 7,
                productsPlaced: 6,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 7,
                productsPlaced: 7,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 8,
                productsPlaced: 7,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 8,
                productsPlaced: 8,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 9,
                productsPlaced: 8,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 9,
                productsPlaced: 9,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);
          });
        });

        describe('when doing output and therefore shouldFirstSpotHaveOneItem is false', () => {
          it('should work when stack is 1', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: false,
                noSpots: 6,
                productsOnDrawerAtStart: 0,
                productsPicked: 0,
                stack: 1,
                spotStatus: [true, true, true, true, true, true],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 0,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 4,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 5,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 6,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
            ]);
          });

          it('should work when stack is N', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: false,
                noSpots: 6,
                productsOnDrawerAtStart: 0,
                productsPicked: 0,
                stack: 3,
                spotStatus: [true, true, true, true, true, true],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 0,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 4,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 5,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 6,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 7,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 8,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 9,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 10,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 11,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 12,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 13,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 14,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 15,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 16,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 17,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 18,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
            ]);
          });
        });

        describe('when doing input and therefore shouldFirstSpotHaveOneItem is false', () => {
          it('should work when stack is 1', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: false,
                noSpots: 6,
                productsOnDrawerAtStart: 6,
                productsPlaced: 0,
                stack: 1,
                spotStatus: [true, true, true, true, true, true],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 0,
              }),
            ).toEqual([
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 5,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 6,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);
          });

          it('should work when stack is N', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: false,
                noSpots: 6,
                productsOnDrawerAtStart: 18,
                productsPlaced: 0,
                stack: 3,
                spotStatus: [true, true, true, true, true, true],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 0,
              }),
            ).toEqual([
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
              }),
            ).toEqual([
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
              }),
            ).toEqual([
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 5,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 6,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 7,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 8,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 9,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 10,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 11,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 12,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 13,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 14,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 15,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 16,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 17,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 18,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);
          });
        });
      });

      describe('when some spots are not reachable', () => {
        describe('when doing input and output and therefore shouldFirstSpotHaveOneItem is true', () => {
          it('should work when stack is 1', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: true,
                noSpots: 6,
                productsOnDrawerAtStart: 4,
                stack: 1,
                spotStatus: [false, true, true, true, true, false],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 0,
                productsPlaced: 0,
                spotOrder: [0, 1, 2, 3, 4, 5],
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
                productsPlaced: 0,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
                productsPlaced: 4,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);
          });

          it('should work when stack is N', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: true,
                noSpots: 6,
                productsOnDrawerAtStart: 6,
                stack: 3,
                spotStatus: [false, true, false, true, false, true],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 0,
                productsPlaced: 0,
                spotOrder: [0, 1, 2, 3, 4, 5],
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
                productsPlaced: 0,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
                productsPlaced: 4,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 5,
                productsPlaced: 4,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 5,
                productsPlaced: 5,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 6,
                productsPlaced: 5,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 6,
                productsPlaced: 6,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);
          });
        });

        describe('when doing output and therefore shouldFirstSpotHaveOneItem is false', () => {
          it('should work when stack is 1', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: false,
                noSpots: 6,
                productsOnDrawerAtStart: 0,
                productsPicked: 0,
                stack: 1,
                spotStatus: [true, false, true, false, false, true],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 0,
                spotOrder: [0, 1, 2, 3, 4, 5],
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'FINISHED', reachable: true },
            ]);
          });

          it('should work when stack is N', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: false,
                noSpots: 6,
                productsOnDrawerAtStart: 0,
                productsPicked: 0,
                stack: 4,
                spotStatus: [true, true, true, false, false, false],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 0,
                spotOrder: [0, 1, 2, 3, 4, 5],
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 1,
              }),
            ).toEqual([
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 2,
              }),
            ).toEqual([
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 3,
              }),
            ).toEqual([
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 4,
              }),
            ).toEqual([
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 5,
              }),
            ).toEqual([
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 6,
              }),
            ).toEqual([
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 7,
              }),
            ).toEqual([
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 8,
              }),
            ).toEqual([
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 9,
              }),
            ).toEqual([
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 1, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 10,
              }),
            ).toEqual([
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 2, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 11,
              }),
            ).toEqual([
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 3, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PLACE
            expect(
              calculateSpotStatus({
                ...common(),
                productsPlaced: 12,
              }),
            ).toEqual([
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 4, mode: 'FINISHED', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);
          });
        });

        describe('when doing input and therefore shouldFirstSpotHaveOneItem is false', () => {
          it('should work when stack is 1', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: false,
                noSpots: 6,
                productsOnDrawerAtStart: 3,
                productsPlaced: 0,
                stack: 1,
                spotStatus: [true, false, true, false, false, true],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 0,
              }),
            ).toEqual([
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 1, mode: 'RAW', reachable: true },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: true },
            ]);
          });

          it('should work when stack is N', () => {
            function common() {
              return {
                shouldFirstSpotHaveOneItem: false,
                noSpots: 6,
                productsOnDrawerAtStart: 12,
                productsPlaced: 0,
                stack: 4,
                spotStatus: [true, true, true, false, false, false],
                spotOrder: [0, 1, 2, 3, 4, 5],
              };
            }

            // START
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 0,
              }),
            ).toEqual([
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 1,
              }),
            ).toEqual([
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 2,
              }),
            ).toEqual([
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 3,
              }),
            ).toEqual([
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 4,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 5,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 6,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 7,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 8,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 4, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 9,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 3, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 10,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 2, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 11,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 1, mode: 'RAW', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);

            // PICK
            expect(
              calculateSpotStatus({
                ...common(),
                productsPicked: 12,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: true },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);
          });
        });

        it('should when no square can be reached default to empty spots', () => {
          expect(
            calculateSpotStatus({
              shouldFirstSpotHaveOneItem: false,
              noSpots: 4,
              productsOnDrawerAtStart: 0,
              productsPicked: 0,
              stack: 3,
              productsPlaced: 12,
              spotStatus: [false, false, false, false],
              spotOrder: [0, 1, 2, 3, 4, 5],
            }),
          ).toEqual([
            { amount: 0, mode: 'EMPTY', reachable: false },
            { amount: 0, mode: 'EMPTY', reachable: false },
            { amount: 0, mode: 'EMPTY', reachable: false },
            { amount: 0, mode: 'EMPTY', reachable: false },
          ]);
        });
      });
    });

    describe('STATIC', () => {
      describe('MAIN drawer', () => {
        describe('when all spots are reachable', () => {
          describe('when doing input and output and therefore shouldFirstSpotHaveOneItem is true', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: true,
                  noSpots: 9,
                  productsOnDrawerAtStart: 9,
                  stack: 1,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: true,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 3 * 3 * 2 - 1,
                  stack: 2,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 10,
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 10,
                  productsPlaced: 10,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 11,
                  productsPlaced: 10,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 11,
                  productsPlaced: 11,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 12,
                  productsPlaced: 11,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 12,
                  productsPlaced: 12,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 13,
                  productsPlaced: 12,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 13,
                  productsPlaced: 13,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 14,
                  productsPlaced: 13,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 14,
                  productsPlaced: 14,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 15,
                  productsPlaced: 14,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 15,
                  productsPlaced: 15,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 16,
                  productsPlaced: 15,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 16,
                  productsPlaced: 16,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 17,
                  productsPlaced: 16,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 17,
                  productsPlaced: 17,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });
          });

          describe('when doing output and therefore shouldFirstSpotHaveOneItem is false', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 0,
                  stack: 1,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                  productsPicked: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 0,
                  stack: 3,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                  productsPicked: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 10,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 11,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 12,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 13,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 14,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 15,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 16,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 17,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 18,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 19,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 20,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 21,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 22,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 23,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 24,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 25,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 26,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 27,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });
          });

          describe('when doing input and therefore shouldFirstSpotHaveOneItem is false', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 9,
                  stack: 1,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                  productsPlaced: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 27,
                  stack: 3,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                  productsPlaced: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 10,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 11,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 12,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 13,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 14,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 15,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 16,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 17,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 18,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 19,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 20,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 21,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 22,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 23,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 24,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 25,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 26,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 27,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);
            });
          });
        });

        describe('when some spots are not reachable', () => {
          describe('when doing input and output and therefore shouldFirstSpotHaveOneItem is true', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: true,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 6,
                  stack: 1,
                  spotStatus: [
                    false,
                    true,
                    true,
                    false,
                    true,
                    true,
                    false,
                    true,
                    true,
                  ],
                  spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: true,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 5,
                  stack: 2,
                  spotStatus: [
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    false,
                    false,
                    true,
                  ],
                  spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });
          });

          describe('when doing output and therefore shouldFirstSpotHaveOneItem is false', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 0,
                  stack: 1,
                  spotStatus: [
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                  ],
                  spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                  productsPicked: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 0,
                  stack: 3,
                  spotStatus: [
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                  ],
                  spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                  productsPicked: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);
            });
          });

          it('should when no square can be reached default to empty spots', () => {
            expect(
              calculateSpotStatus({
                shouldFirstSpotHaveOneItem: true,
                noSpots: 3 * 3,
                productsOnDrawerAtStart: 3 * 3,
                stack: 1,
                spotStatus: [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ],
                spotOrder: [6, 7, 8, 3, 4, 5, 0, 1, 2],
                productsPicked: 0,
                productsPlaced: 0,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);
          });
        });
      });

      describe('SECOND drawer', () => {
        describe('when all spots are reachable', () => {
          describe('when doing input and output and therefore shouldFirstSpotHaveOneItem is true', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: true,
                  noSpots: 9,
                  productsOnDrawerAtStart: 9,
                  stack: 1,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: true,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 3 * 3 * 2 - 1,
                  stack: 2,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 10,
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 10,
                  productsPlaced: 10,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 11,
                  productsPlaced: 10,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 11,
                  productsPlaced: 11,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 12,
                  productsPlaced: 11,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 12,
                  productsPlaced: 12,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 13,
                  productsPlaced: 12,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 13,
                  productsPlaced: 13,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 14,
                  productsPlaced: 13,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 14,
                  productsPlaced: 14,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 15,
                  productsPlaced: 14,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 15,
                  productsPlaced: 15,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 16,
                  productsPlaced: 15,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 16,
                  productsPlaced: 16,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 17,
                  productsPlaced: 16,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 17,
                  productsPlaced: 17,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });
          });

          describe('when doing output and therefore shouldFirstSpotHaveOneItem is false', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 0,
                  stack: 1,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                  productsPicked: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 0,
                  stack: 3,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                  productsPicked: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 2, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 10,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 11,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 2, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 12,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 13,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 14,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 15,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 16,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 17,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 18,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 19,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 20,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 2, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 21,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 22,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 23,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 24,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 25,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 1, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 26,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 2, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 27,
                }),
              ).toEqual([
                { amount: 3, mode: 'FINISHED', reachable: true }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 3, mode: 'FINISHED', reachable: true }, // 2
                { amount: 3, mode: 'FINISHED', reachable: true }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 3, mode: 'FINISHED', reachable: true }, // 5
                { amount: 3, mode: 'FINISHED', reachable: true }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 3, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });
          });

          describe('when doing input and therefore shouldFirstSpotHaveOneItem is false', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 9,
                  stack: 1,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                  productsPlaced: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 27,
                  stack: 3,
                  spotStatus: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                  productsPlaced: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 3, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 2, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                }),
              ).toEqual([
                { amount: 3, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                }),
              ).toEqual([
                { amount: 2, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 3, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 10,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 2, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 11,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 12,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 13,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 14,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 15,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 3, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 16,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 17,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 18,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 3, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 19,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 20,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 21,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 22,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 23,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 24,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 3, mode: 'RAW', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 25,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 2, mode: 'RAW', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 26,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 1, mode: 'RAW', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 27,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: true }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);
            });
          });
        });

        describe('when some spots are not reachable', () => {
          describe('when doing input and output and therefore shouldFirstSpotHaveOneItem is true', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: true,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 6,
                  stack: 1,
                  spotStatus: [
                    false,
                    true,
                    true,
                    false,
                    true,
                    true,
                    false,
                    true,
                    true,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: true,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 5,
                  stack: 2,
                  spotStatus: [
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    false,
                    false,
                    true,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 1, mode: 'RAW', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 1, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 1, mode: 'RAW', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 2, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 1, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 2, mode: 'FINISHED', reachable: true }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 2, mode: 'FINISHED', reachable: true }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });
          });

          describe('when doing output and therefore shouldFirstSpotHaveOneItem is false', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 0,
                  stack: 1,
                  spotStatus: [
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                  productsPicked: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 1, mode: 'FINISHED', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 1, mode: 'FINISHED', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'FINISHED', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 0,
                  stack: 3,
                  spotStatus: [
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                  productsPicked: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 2, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 2, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 6,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 7,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 8,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 2, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PLACE
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPlaced: 9,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 3, mode: 'FINISHED', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'FINISHED', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'FINISHED', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);
            });
          });

          describe('when doing input and therefore shouldFirstSpotHaveOneItem is false', () => {
            it('should work when stack is 1', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 3,
                  stack: 1,
                  spotStatus: [
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                  productsPlaced: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 1, mode: 'RAW', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 1, mode: 'RAW', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 1, mode: 'RAW', reachable: true }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: false }, // 1
                { amount: 0, mode: 'EMPTY', reachable: true }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: false }, // 4
                { amount: 0, mode: 'EMPTY', reachable: true }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: false }, // 7
                { amount: 0, mode: 'EMPTY', reachable: true }, // 8
              ]);
            });

            it('should work when stack is N', () => {
              function makeCommon() {
                return {
                  shouldFirstSpotHaveOneItem: false,
                  noSpots: 3 * 3,
                  productsOnDrawerAtStart: 9,
                  stack: 3,
                  spotStatus: [
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                  ],
                  spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                  productsPlaced: 0,
                };
              }

              // START
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 0,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 3, mode: 'RAW', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 1,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 2, mode: 'RAW', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 2,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 1, mode: 'RAW', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 3,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 3, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 4,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 2, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 5,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 1, mode: 'RAW', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 6,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 3, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 7,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 2, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 8,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 1, mode: 'RAW', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);

              // PICK
              expect(
                calculateSpotStatus({
                  ...makeCommon(),
                  productsPicked: 9,
                }),
              ).toEqual([
                { amount: 0, mode: 'EMPTY', reachable: false }, // 0
                { amount: 0, mode: 'EMPTY', reachable: true }, // 1
                { amount: 0, mode: 'EMPTY', reachable: false }, // 2
                { amount: 0, mode: 'EMPTY', reachable: false }, // 3
                { amount: 0, mode: 'EMPTY', reachable: true }, // 4
                { amount: 0, mode: 'EMPTY', reachable: false }, // 5
                { amount: 0, mode: 'EMPTY', reachable: false }, // 6
                { amount: 0, mode: 'EMPTY', reachable: true }, // 7
                { amount: 0, mode: 'EMPTY', reachable: false }, // 8
              ]);
            });
          });

          it('should when no square can be reached default to empty spots', () => {
            expect(
              calculateSpotStatus({
                shouldFirstSpotHaveOneItem: true,
                noSpots: 3 * 3,
                productsOnDrawerAtStart: 3 * 3,
                stack: 1,
                spotStatus: [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ],
                spotOrder: [2, 1, 0, 5, 4, 3, 8, 7, 6],
                productsPicked: 0,
                productsPlaced: 0,
              }),
            ).toEqual([
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
              { amount: 0, mode: 'EMPTY', reachable: false },
            ]);
          });
        });
      });
    });
  });

  describe('calculateMainDrawerSpotOrder', () => {
    it('should know how calculate the main drawer spot order for a 3x3 grid', () => {
      const product = makeWrench();
      product.config.DRAWER_AMOUNT_PRODUCT_X = '3';
      product.config.DRAWER_AMOUNT_PRODUCT_Y = '3';
      product.config.DRAWER_AMOUNT_PRODUCT_Z = '3';

      expect(calculateMainDrawerSpotOrder(product)).toEqual([
        6, 7, 8, 3, 4, 5, 0, 1, 2,
      ]);
    });

    it('should know how calculate the main drawer spot order for a 4x2 grid', () => {
      const product = makeWrench();
      product.config.DRAWER_AMOUNT_PRODUCT_X = '4';
      product.config.DRAWER_AMOUNT_PRODUCT_Y = '2';
      product.config.DRAWER_AMOUNT_PRODUCT_Z = '10';

      expect(calculateMainDrawerSpotOrder(product)).toEqual([
        4, 5, 6, 7, 0, 1, 2, 3,
      ]);
    });

    it('should know how calculate the main drawer spot order for a 4x2 grid', () => {
      const product = makeWrench();
      product.config.DRAWER_AMOUNT_PRODUCT_X = '7';
      product.config.DRAWER_AMOUNT_PRODUCT_Y = '4';
      product.config.DRAWER_AMOUNT_PRODUCT_Z = '10';

      expect(calculateMainDrawerSpotOrder(product)).toEqual([
        21, 22, 23, 24, 25, 26, 27, 14, 15, 16, 17, 18, 19, 20, 7, 8, 9, 10, 11,
        12, 13, 0, 1, 2, 3, 4, 5, 6,
      ]);
    });
  });

  describe('calculateSecondDrawerSpotOrder', () => {
    it('should know how calculate the second drawer spot order for a 3x3 grid', () => {
      const product = makeWrench();
      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X = '3';
      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y = '3';
      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Z = '3';

      expect(calculateSecondDrawerSpotOrder(product)).toEqual([
        2, 1, 0, 5, 4, 3, 8, 7, 6,
      ]);
    });

    it('should know how calculate the second drawer spot order for a 4x2 grid', () => {
      const product = makeWrench();
      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X = '4';
      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y = '2';
      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Z = '10';

      expect(calculateSecondDrawerSpotOrder(product)).toEqual([
        3, 2, 1, 0, 7, 6, 5, 4,
      ]);
    });

    it('should know how calculate the second drawer spot order for a 4x2 grid', () => {
      const product = makeWrench();
      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X = '7';
      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y = '4';
      product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Z = '10';

      expect(calculateSecondDrawerSpotOrder(product)).toEqual([
        6, 5, 4, 3, 2, 1, 0, 13, 12, 11, 10, 9, 8, 7, 20, 19, 18, 17, 16, 15,
        14, 27, 26, 25, 24, 23, 22, 21,
      ]);
    });
  });
});
