import { useCallback, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Product } from '../../core/models/product-types';

/**
 * Watches all properties from the `Product` that have an effect on
 * the `SECOND_DRAWER_REACH_TESTED` boolean property. When one of the
 * values changes the reach should be tested again.
 */
export function useSecondDrawerSyncReachTested(
  form: UseFormReturn<Product, any, undefined>,
) {
  const getLastConfig = useCallback(() => {
    const product = form.getValues();

    return {
      RAW_MAT_HEIGHT: product.config.RAW_MAT_HEIGHT,
      RAW_MAT_DIAMETER: product.config.RAW_MAT_DIAMETER,
      RAW_MAT_LENGTH: product.config.RAW_MAT_LENGTH,
      RAW_MAT_WIDTH: product.config.RAW_MAT_WIDTH,

      FIN_PRODUCT_HEIGHT: product.config.FIN_PRODUCT_HEIGHT,
      FIN_PRODUCT_DIAMETER: product.config.FIN_PRODUCT_DIAMETER,
      FIN_PRODUCT_LENGTH: product.config.FIN_PRODUCT_LENGTH,
      FIN_PRODUCT_WIDTH: product.config.FIN_PRODUCT_WIDTH,

      DRAWER_PICK_OFFSET_X: product.config.DRAWER_PICK_OFFSET_X,
      DRAWER_PICK_OFFSET_Y: product.config.DRAWER_PICK_OFFSET_Y,
      DRAWER_PICK_OFFSET_Z: product.config.DRAWER_PICK_OFFSET_Z,

      DRAWER_PLACE_OFFSET_X: product.config.DRAWER_PLACE_OFFSET_X,
      DRAWER_PLACE_OFFSET_Y: product.config.DRAWER_PLACE_OFFSET_Y,
      DRAWER_PLACE_OFFSET_Z: product.config.DRAWER_PLACE_OFFSET_Z,

      SECOND_DRAWER_AMOUNT_PRODUCT_X:
        product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X,
      SECOND_DRAWER_AMOUNT_PRODUCT_Y:
        product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y,
      SECOND_DRAWER_AMOUNT_PRODUCT_Z:
        product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Z,

      GR1_CLAW_HEIGHT: product.config.GR1_CLAW_HEIGHT,
      GR1_CLAW_DEPTH: product.config.GR1_CLAW_DEPTH,
      GR2_CLAW_HEIGHT: product.config.GR2_CLAW_HEIGHT,
      GR2_CLAW_DEPTH: product.config.GR2_CLAW_DEPTH,

      SECOND_DRAWER_REACH_TESTED: product.config.SECOND_DRAWER_REACH_TESTED,
    };
  }, [form]);

  const [lastConfig, setLastConfig] = useState(getLastConfig);
  const FIN_PRODUCT_HEIGHT = form.watch('config.FIN_PRODUCT_HEIGHT');
  const FIN_PRODUCT_DIAMETER = form.watch('config.FIN_PRODUCT_DIAMETER');
  const FIN_PRODUCT_LENGTH = form.watch('config.FIN_PRODUCT_LENGTH');
  const FIN_PRODUCT_WIDTH = form.watch('config.FIN_PRODUCT_WIDTH');

  const DRAWER_PLACE_OFFSET_X = form.watch('config.DRAWER_PLACE_OFFSET_X');
  const DRAWER_PLACE_OFFSET_Y = form.watch('config.DRAWER_PLACE_OFFSET_Y');
  const DRAWER_PLACE_OFFSET_Z = form.watch('config.DRAWER_PLACE_OFFSET_Z');

  const SECOND_DRAWER_AMOUNT_PRODUCT_X = form.watch(
    'config.SECOND_DRAWER_AMOUNT_PRODUCT_X',
  );
  const SECOND_DRAWER_AMOUNT_PRODUCT_Y = form.watch(
    'config.SECOND_DRAWER_AMOUNT_PRODUCT_Y',
  );
  const SECOND_DRAWER_AMOUNT_PRODUCT_Z = form.watch(
    'config.SECOND_DRAWER_AMOUNT_PRODUCT_Z',
  );

  const GR1_CLAW_HEIGHT = form.watch('config.GR1_CLAW_HEIGHT');
  const GR1_CLAW_DEPTH = form.watch('config.GR1_CLAW_DEPTH');
  const GR2_CLAW_HEIGHT = form.watch('config.GR2_CLAW_HEIGHT');
  const GR2_CLAW_DEPTH = form.watch('config.GR2_CLAW_DEPTH');

  const SECOND_DRAWER_REACH_TESTED = form.watch(
    'config.SECOND_DRAWER_REACH_TESTED',
  );

  useEffect(() => {
    // If nothing has changed, or the user reverted something back
    // to the last known working state then mark the reach as tested.
    // We do however only store the last known working configuration.
    if (
      lastConfig.SECOND_DRAWER_REACH_TESTED &&
      FIN_PRODUCT_HEIGHT === lastConfig.FIN_PRODUCT_HEIGHT &&
      FIN_PRODUCT_DIAMETER === lastConfig.FIN_PRODUCT_DIAMETER &&
      FIN_PRODUCT_LENGTH === lastConfig.FIN_PRODUCT_LENGTH &&
      FIN_PRODUCT_WIDTH === lastConfig.FIN_PRODUCT_WIDTH &&
      DRAWER_PLACE_OFFSET_X === lastConfig.DRAWER_PLACE_OFFSET_X &&
      DRAWER_PLACE_OFFSET_Y === lastConfig.DRAWER_PLACE_OFFSET_Y &&
      DRAWER_PLACE_OFFSET_Z === lastConfig.DRAWER_PLACE_OFFSET_Z &&
      SECOND_DRAWER_AMOUNT_PRODUCT_X ===
        lastConfig.SECOND_DRAWER_AMOUNT_PRODUCT_X &&
      SECOND_DRAWER_AMOUNT_PRODUCT_Z ===
        lastConfig.SECOND_DRAWER_AMOUNT_PRODUCT_Z &&
      SECOND_DRAWER_AMOUNT_PRODUCT_Y ===
        lastConfig.SECOND_DRAWER_AMOUNT_PRODUCT_Y &&
      GR1_CLAW_HEIGHT === lastConfig.GR1_CLAW_HEIGHT &&
      GR1_CLAW_DEPTH === lastConfig.GR1_CLAW_DEPTH &&
      GR2_CLAW_HEIGHT === lastConfig.GR2_CLAW_HEIGHT &&
      GR2_CLAW_DEPTH === lastConfig.GR2_CLAW_DEPTH
    ) {
      form.setValue('config.SECOND_DRAWER_REACH_TESTED', true);
      form.trigger();
    } else {
      form.setValue('config.SECOND_DRAWER_REACH_TESTED', false);
      form.trigger();
    }
  }, [
    FIN_PRODUCT_HEIGHT,
    FIN_PRODUCT_DIAMETER,
    FIN_PRODUCT_LENGTH,
    FIN_PRODUCT_WIDTH,
    DRAWER_PLACE_OFFSET_X,
    DRAWER_PLACE_OFFSET_Y,
    DRAWER_PLACE_OFFSET_Z,
    SECOND_DRAWER_AMOUNT_PRODUCT_X,
    SECOND_DRAWER_AMOUNT_PRODUCT_Y,
    SECOND_DRAWER_AMOUNT_PRODUCT_Z,
    GR1_CLAW_HEIGHT,
    GR1_CLAW_DEPTH,
    GR2_CLAW_HEIGHT,
    GR2_CLAW_DEPTH,
  ]);

  // If the `SECOND_DRAWER_REACH_TESTED` becomes `true` store it as the last known
  // configuration that had its reach tested.
  useEffect(() => {
    if (SECOND_DRAWER_REACH_TESTED) {
      setLastConfig(getLastConfig);
    }
  }, [SECOND_DRAWER_REACH_TESTED]);
}
