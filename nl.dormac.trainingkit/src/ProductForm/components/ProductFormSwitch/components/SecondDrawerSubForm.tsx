import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import React, { useState } from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  HalfWidthCenter,
  IconButton,
  InputField,
  Separator,
  StaticGrid,
  SubTitle,
  Tabs,
  Title,
} from '../../../../components';
import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { Product } from '../../../../core/models/product-types';
import { calculateTotalProductsForSecondDrawer } from '../../../../core/services/drawer-service';
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
import { CobotInfo } from '../../../../types';

export type SecondDrawerSubFormTab = 'GRID' | 'OFFSETS';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
  cobotConfig: CobotConfig;
  cobotInfo: CobotInfo;
  tab: SecondDrawerSubFormTab;
};

// All fields that are part of the grid tab
const GRID_TAB_FORM_FIELDS: Path<Product>[] = [
  'config.SECOND_DRAWER_AMOUNT_PRODUCT_X',
  'config.SECOND_DRAWER_AMOUNT_PRODUCT_Y',
  'config.SECOND_DRAWER_AMOUNT_PRODUCT_Z',
  'config.SECOND_DRAWER_REACH_TESTED',
];

// All fields that are part of the offsets tab
const OFFSET_TAB_FORM_FIELDS: Path<Product>[] = [
  'config.DRAWER_PLACE_OFFSET_X',
  'config.DRAWER_PLACE_OFFSET_Y',
  'config.DRAWER_PLACE_OFFSET_Z',
];

// All fields that are part of this sub form, used to show warning icon.
export const SECOND_DRAWER_SUB_FORM_FIELDS: Path<Product>[] = [
  ...GRID_TAB_FORM_FIELDS,
  ...OFFSET_TAB_FORM_FIELDS,
];

export function getSecondDrawerSubFormTabForField(
  name: Path<Product>,
): SecondDrawerSubFormTab {
  if (OFFSET_TAB_FORM_FIELDS.includes(name)) {
    return 'OFFSETS';
  }

  return 'GRID';
}

export function SecondDrawerSubForm({
  form,
  cobotConfig,
  cobotInfo,
  tab,
}: Props) {
  const t = useT();

  useValidateOnMount(form);

  const [showGridFullScreen, setShowGridFullScreen] = useState(false);

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const hasError = makeHasError<Product>(errors);

  return (
    <Container>
      <Title center>{t('SECOND_DRAWER')}</Title>

      <Tabs
        initialTab={tab}
        tabs={[
          {
            id: 'OFFSETS',
            label: t('OFFSETS'),
            warning: hasError(OFFSET_TAB_FORM_FIELDS),
            content() {
              return (
                <div className="tw-grid tw-gap-4">
                  <HalfWidthCenter>
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
                  </HalfWidthCenter>

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
              const product = form.getValues();

              const maxProductsPerDrawer =
                calculateTotalProductsForSecondDrawer(product);

              return (
                <div className="tw-grid tw-gap-4">
                  <HalfWidthCenter>
                    <InputField
                      register={() =>
                        form.register('config.SECOND_DRAWER_AMOUNT_PRODUCT_Z')
                      }
                      type="text"
                      label={t('STACK_AMOUNT')}
                      description={t('STACK_AMOUNT_EXPLANATION')}
                    />

                    <ReachTestButton
                      drawer="SECOND"
                      form={form}
                      cobotConfig={cobotConfig}
                      cobotInfo={cobotInfo}
                    />

                    <div className="tw-flex tw-justify-end">
                      <IconButton
                        icon={OpenInFullIcon}
                        onClick={() => setShowGridFullScreen(true)}
                      />
                    </div>
                  </HalfWidthCenter>

                  <div className="tw-flex tw-justify-center">
                    <StaticGrid
                      cobotConfig={cobotConfig}
                      product={product}
                      productsOnDrawerAtStart={0}
                      productsPlaced={maxProductsPerDrawer}
                      scale={0.8}
                      showFullScreen={showGridFullScreen}
                      onExitFullScreen={() => setShowGridFullScreen(false)}
                      drawer="SECOND"
                    />
                  </div>
                </div>
              );
            },
          },
        ]}
      />
    </Container>
  );
}
