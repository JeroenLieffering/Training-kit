import { configEasyloaderWithStaticGrid } from '../fixtures/cobot-config-fixtures';
import { makeAnchor, makeSaw, makeWrench } from '../fixtures/product-fixtures';
import {
  shouldFirstSpotHaveOneItem,
  shouldShowCobotMayCollideMessage,
} from './product-service';

describe('service: Product', () => {
  describe('shouldFirstSpotHaveOneItem', () => {
    it('should return false when IO_MODE is INPUT', () => {
      const product = makeAnchor();

      expect(shouldFirstSpotHaveOneItem(product)).toBe(false);
    });

    it('should return false when IO_MODE is OUTPUT', () => {
      const product = makeSaw();

      expect(shouldFirstSpotHaveOneItem(product)).toBe(false);
    });

    describe('when IO_MODE is INPUT_OUTPUT', () => {
      it('should return false when PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER is true', () => {
        const product = makeWrench();
        product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;

        expect(shouldFirstSpotHaveOneItem(product)).toBe(false);
      });

      it('should return false when PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION is true', () => {
        const product = makeWrench();
        product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;

        expect(shouldFirstSpotHaveOneItem(product)).toBe(false);
      });

      it('should return true when PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER is false and PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION is false', () => {
        const product = makeWrench();

        expect(shouldFirstSpotHaveOneItem(product)).toBe(true);
      });
    });
  });

  describe('shouldShowCobotMayCollideMessage', () => {
    describe('when there is no second drawer', () => {
      describe('when there is a second gripper', () => {
        it('should when the product is stacked return true because there is no second drawer a second gripper and the product is stacked', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;
          cobotConfig.config.HAS_SECOND_GRIPPER = true;

          const product = makeSaw();
          product.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

          expect(shouldShowCobotMayCollideMessage(cobotConfig, product)).toBe(
            true,
          );
        });

        it('should when the product is not stacked return false because the product is not stacked', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;
          cobotConfig.config.HAS_SECOND_GRIPPER = true;

          const product = makeSaw();
          product.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

          expect(shouldShowCobotMayCollideMessage(cobotConfig, product)).toBe(
            false,
          );
        });
      });

      describe('when there is no second gripper it should never show the message', () => {
        it('should when the product is stacked return false because there is no second gripper', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;
          cobotConfig.config.HAS_SECOND_GRIPPER = false;

          const product = makeSaw();
          product.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

          expect(shouldShowCobotMayCollideMessage(cobotConfig, product)).toBe(
            false,
          );
        });

        it('should when the product is not stacked return false because there is no second gripper', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;
          cobotConfig.config.HAS_SECOND_GRIPPER = false;

          const product = makeSaw();
          product.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

          expect(shouldShowCobotMayCollideMessage(cobotConfig, product)).toBe(
            false,
          );
        });
      });
    });

    describe('when there is a second drawer it should never show the message', () => {
      describe('when there is a second gripper', () => {
        it('should when the product is stacked return false because there is a second drawer', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
          cobotConfig.config.HAS_SECOND_GRIPPER = true;

          const product = makeSaw();
          product.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

          expect(shouldShowCobotMayCollideMessage(cobotConfig, product)).toBe(
            false,
          );
        });

        it('should when the product is not stacked return false because there is a second drawer', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
          cobotConfig.config.HAS_SECOND_GRIPPER = true;

          const product = makeSaw();
          product.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

          expect(shouldShowCobotMayCollideMessage(cobotConfig, product)).toBe(
            false,
          );
        });
      });

      describe('when there is no second gripper', () => {
        it('should when the product is stacked return false', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
          cobotConfig.config.HAS_SECOND_GRIPPER = false;

          const product = makeSaw();
          product.config.DRAWER_AMOUNT_PRODUCT_Z = '2';

          expect(shouldShowCobotMayCollideMessage(cobotConfig, product)).toBe(
            false,
          );
        });

        it('should when the product is not stacked return false', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
          cobotConfig.config.HAS_SECOND_GRIPPER = false;

          const product = makeSaw();
          product.config.DRAWER_AMOUNT_PRODUCT_Z = '1';

          expect(shouldShowCobotMayCollideMessage(cobotConfig, product)).toBe(
            false,
          );
        });
      });
    });
  });
});
