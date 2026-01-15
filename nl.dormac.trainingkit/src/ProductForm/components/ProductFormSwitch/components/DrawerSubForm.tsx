import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import React, { useEffect, useState } from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  Grid,
  HalfWidthCenter,
  IconButton,
  InputField,
  LeftRight,
  PinTable,
  Separator,
  SubTitle,
  SelectField,
  Tabs,
  Title,
} from '../../../../components';
import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { Product } from '../../../../core/models/product-types';
import { isConfiguredWithStaticGrid } from '../../../../core/services/cobot-config-service';
import { calculateTotalProductsForMainDrawer } from '../../../../core/services/drawer-service';
import { useT } from '../../../../hooks/useT';
import { useValidateOnMount } from '../../../../hooks/useValidateOnMount';
import { BaseFormDescription } from '../../../../shadcn';
import {
  getValidationErrorsWithInfo,
  makeHasError,
} from '../../../../utils/form';
import drawerOffsetSideImage from './images/drawer-offset-side.png';
import drawerOffsetTopImage from './images/drawer-offset-top.png';
import { ReachTestButton } from './ReachTestButton';
import { range } from '../../../../utils/array';

export type DrawerSubFormTab = 'GRID' | 'OFFSETS';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
  cobotConfig: CobotConfig;
  tab: DrawerSubFormTab;
};

// All fields that are part of the grid tab
const GRID_TAB_FORM_FIELDS: Path<Product>[] = [
  'config.DRAWER_AMOUNT_PRODUCT_X',
  'config.DRAWER_AMOUNT_PRODUCT_Y',
  'config.DRAWER_AMOUNT_PRODUCT_Z',
  'config.POSITIONING_PIN_DIAMETER',
  'config.REACH_TESTED',
];

// All fields that are part of the offsets tab
const OFFSET_TAB_FORM_FIELDS: Path<Product>[] = [
  'config.DRAWER_PICK_OFFSET_X',
  'config.DRAWER_PICK_OFFSET_Y',
  'config.DRAWER_PICK_OFFSET_Z',
  'config.DRAWER_PLACE_OFFSET_X',
  'config.DRAWER_PLACE_OFFSET_Y',
  'config.DRAWER_PLACE_OFFSET_Z',
];

// All fields that are part of this sub form, used to show warning icon.
export const DRAWER_SUB_FORM_FIELDS: Path<Product>[] = [
  ...GRID_TAB_FORM_FIELDS,
  ...OFFSET_TAB_FORM_FIELDS,
];

export function getDrawerSubFormTabForField(
  name: Path<Product>,
): DrawerSubFormTab {
  if (OFFSET_TAB_FORM_FIELDS.includes(name)) {
    return 'OFFSETS';
  }

  return 'GRID';
}

export function DrawerSubForm({ form, cobotConfig, tab }: Props) {
  const t = useT();

  useValidateOnMount(form);

  const [showGridFullScreen, setShowGridFullScreen] = useState(false);

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const hasError = makeHasError<Product>(errors);

  const isStaticGrid = isConfiguredWithStaticGrid(cobotConfig);
  const placeFinishedProductOnSecondDrawer = form.watch(
    'config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
  );
  const placeFinishedProductOnDropOffPosition = form.watch(
    'config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION',
  );

  const showPickOffsets =
    placeFinishedProductOnDropOffPosition || placeFinishedProductOnSecondDrawer;

  const staticGridIndex = form.watch('config.STATIC_GRID_INDEX');

  useEffect(() => {
    if (staticGridIndex === undefined) return;
    const staticGrids = cobotConfig.config.STATIC_GRIDS;
    const staticGrid = staticGrids[Number(staticGridIndex)];
    if (!staticGrid) return;

    form.setValue(
      'config.DRAWER_AMOUNT_PRODUCT_X',
      staticGrid.AMOUNT_SQUARES_X_AXIS,
    );
    form.setValue(
      'config.DRAWER_AMOUNT_PRODUCT_Y',
      staticGrid.AMOUNT_SQUARES_Y_AXIS,
    );
    form.setValue(
      'config.SPOT_STATUS',
      range(
        parseFloat(staticGrid.AMOUNT_SQUARES_X_AXIS) *
          parseFloat(staticGrid.AMOUNT_SQUARES_Y_AXIS),
      ).map(() => true),
    );
  }, [staticGridIndex, form]);

  return (
    <Container>
      <Title center>{t('DRAWER')}</Title>

      <Tabs
        initialTab={tab}
        tabs={[
          {
            id: 'OFFSETS',
            label: t('OFFSETS'),
            warning: hasError(OFFSET_TAB_FORM_FIELDS),
            content() {
              const pickOffsets = (
                <>
                  <SubTitle>{t('PICK_OFFSETS')}</SubTitle>

                  <InputField
                    register={() =>
                      form.register('config.DRAWER_PICK_OFFSET_X')
                    }
                    label={t('X_OFFSET')}
                    addon={t('MM')}
                  />

                  <InputField
                    register={() =>
                      form.register('config.DRAWER_PICK_OFFSET_Y')
                    }
                    label={t('Y_OFFSET')}
                    addon={t('MM')}
                  />

                  <InputField
                    register={() =>
                      form.register('config.DRAWER_PICK_OFFSET_Z')
                    }
                    label={t('Z_OFFSET')}
                    addon={t('MM')}
                  />
                </>
              );

              return (
                <div className="tw-grid tw-gap-4">
                  {showPickOffsets ? (
                    <HalfWidthCenter>{pickOffsets}</HalfWidthCenter>
                  ) : (
                    <LeftRight
                      left={pickOffsets}
                      right={
                        <>
                          <SubTitle>{t('PLACE_OFFSETS')}</SubTitle>

                          <InputField
                            register={() =>
                              form.register('config.DRAWER_PLACE_OFFSET_X')
                            }
                            label={t('X_OFFSET')}
                            addon={t('MM')}
                          />

                          <InputField
                            register={() =>
                              form.register('config.DRAWER_PLACE_OFFSET_Y')
                            }
                            label={t('Y_OFFSET')}
                            addon={t('MM')}
                          />

                          <InputField
                            register={() =>
                              form.register('config.DRAWER_PLACE_OFFSET_Z')
                            }
                            label={t('Z_OFFSET')}
                            addon={t('MM')}
                          />
                        </>
                      }
                    />
                  )}

                  <Separator orientation="horizontal" />

                  <div className="tw-grid tw-gap-2 tw-place-items-center">
                    <BaseFormDescription className="tw-px-16 tw-text-center">
                      {t('DRAWER_OFFSET_EXPLANATION')}
                    </BaseFormDescription>
                    <div className="tw-flex tw-gap-2 tw-justify-center">
                      <img
                        src={drawerOffsetSideImage}
                        width={602 / 2}
                        height={418 / 2}
                      />
                      <img
                        src={drawerOffsetTopImage}
                        width={732 / 2}
                        height={578 / 2}
                      />
                    </div>
                  </div>
                </div>
              );
            },
          },
          {
            id: 'GRID',
            label: t('GRID'),
            warning: hasError(GRID_TAB_FORM_FIELDS),
            content() {
              const staticGrids = cobotConfig.config.STATIC_GRIDS;

              return (
                <HalfWidthCenter>
                  <SelectField
                    register={() => form.register('config.STATIC_GRID_INDEX')}
                    label={t('STATIC_GRID_CONFIGURATION')}
                    options={staticGrids.map((staticGrid, index) => ({
                      value: index.toString(),
                      label: staticGrid.name,
                    }))}
                  />
                </HalfWidthCenter>
              );
            },
          },
          // {
          // id: 'GRID',
          // label: t('GRID'),
          // warning: hasError(GRID_TAB_FORM_FIELDS),
          // content() {
          //   const product = form.getValues();

          //   const maxProductsPerDrawer =
          //     calculateTotalProductsForMainDrawer(product);

          //   return (
          //     <div className="tw-grid tw-gap-4">
          //       <HalfWidthCenter>
          // {/* <InputField
          //   register={() =>
          //     form.register('config.DRAWER_AMOUNT_PRODUCT_Z')
          //   }
          //   type="text"
          //   label={t('STACK_AMOUNT')}
          //   description={t('STACK_AMOUNT_EXPLANATION')}
          // />

          // {!isStaticGrid ? (
          //   <InputField
          //     register={() =>
          //       form.register('config.POSITIONING_PIN_DIAMETER')
          //     }
          //     label={t('PIN_DIAMETER')}
          //     addon={t('MM')}
          //   />
          // ) : null} */}

          //         <ReachTestButton
          //           drawer="MAIN"
          //           form={form}
          //           cobotConfig={cobotConfig}
          //         />

          //         <div className="tw-flex tw-justify-end">
          //           <IconButton
          //             icon={OpenInFullIcon}
          //             onClick={() => setShowGridFullScreen(true)}
          //           />
          //         </div>
          //       </HalfWidthCenter>

          //       <div className="tw-flex tw-justify-center">
          //         <Grid
          //           cobotConfig={cobotConfig}
          //           product={product}
          //           productsOnDrawerAtStart={
          //             product.config.IO_MODE === 'OUTPUT'
          //               ? 0
          //               : maxProductsPerDrawer
          //           }
          //           productsPlaced={
          //             product.config.IO_MODE === 'OUTPUT'
          //               ? maxProductsPerDrawer
          //               : 0
          //           }
          //           scale={0.8}
          //           showFullScreen={showGridFullScreen}
          //           onExitFullScreen={() => setShowGridFullScreen(false)}
          //           drawer="MAIN"
          //         />
          //       </div>

          //       {!isStaticGrid ? (
          //         <HalfWidthCenter>
          //           <PinTable product={product} mode="large" />
          //         </HalfWidthCenter>
          //       ) : null}
          //     </div>
          //   );
          // },
          // },
        ]}
      />
    </Container>
  );
}
