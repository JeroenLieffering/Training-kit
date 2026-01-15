import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CategoryIcon from '@mui/icons-material/Category';
import FactoryIcon from '@mui/icons-material/Factory';
import GridOnIcon from '@mui/icons-material/GridOn';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TuneIcon from '@mui/icons-material/Tune';
import React, { useState } from 'react';
import { UseFormReturn, useFormState } from 'react-hook-form';

import { BackButton, SideBar } from '../../../components';
import { NavigationButton } from '../../../components/NavigationButton';
import { Product } from '../../../core/models/product-types';
import { useNavigate } from '../../../hooks/useNavigate';
import { useT } from '../../../hooks/useT';
import { getValidationErrorsWithInfo, makeHasError } from '../../../utils/form';
import { truncate } from '../../../utils/string';
import { ProductFormMode, ProductFormSubPage } from '../../types';
import { DRAWER_SUB_FORM_FIELDS } from '../ProductFormSwitch/components/DrawerSubForm';
import { GRIPPER_SUB_FORM_FIELDS } from '../ProductFormSwitch/components/GripperSubForm/GripperSubForm';
import { INFO_SUB_FORM_FIELDS } from '../ProductFormSwitch/components/InfoSubForm/InfoSubForm';
import { MACHINE_SUB_FORM_FIELDS } from '../ProductFormSwitch/components/MachineSubForm/MachineSubForm';
import { PROCESS_FLOW_SUB_FORM_FIELDS } from '../ProductFormSwitch/components/ProcessFlowSubForm/ProcessFlowSubForm';
import { PRODUCT_SUB_FORM_FIELDS } from '../ProductFormSwitch/components/ProductSubForm/ProductSubForm';
import { SECOND_DRAWER_SUB_FORM_FIELDS } from '../ProductFormSwitch/components/SecondDrawerSubForm';
import { ProductFormLeaveConfirmationModal } from './components/ProductFormLeaveConfirmationModal';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
  product: Product;
  subPage: ProductFormSubPage;
  setSubPage: (subPage: ProductFormSubPage) => void;
  mode: ProductFormMode;
};

export function ProductSideBar({
  form,
  product,
  subPage,
  setSubPage,
  mode,
}: Props) {
  const t = useT();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigateTo = useNavigate();

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const hasError = makeHasError<Product>(errors);

  const { isDirty } = useFormState();

  function backClicked() {
    if (isDirty) {
      setShowConfirmationModal(true);
    } else {
      navigateBack();
    }
  }

  function navigateBack() {
    if (mode === 'EDIT') {
      navigateTo({ page: 'PRODUCT_DETAIL', productID: product.id });
    } else {
      navigateTo({ page: 'PRODUCTS' });
    }
  }

  const placeFinishedProductOnSecondDrawer = form.watch(
    'config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
  );

  return (
    <SideBar
      hasErrors={errors.length > 0}
      gotoErrors={() => setSubPage({ page: 'ERRORS' })}
      backbutton={
        mode === 'EDIT' ? (
          <BackButton onClick={backClicked}>
            {truncate(product.name, 15)}
          </BackButton>
        ) : (
          <BackButton onClick={backClicked}>{t('PRODUCTS')}</BackButton>
        )
      }
    >
      {showConfirmationModal ? (
        <ProductFormLeaveConfirmationModal
          onConfirm={navigateBack}
          onClose={() => setShowConfirmationModal(false)}
        />
      ) : null}

      <NavigationButton
        active={subPage.page === 'INFO'}
        icon={BookmarksIcon}
        onClick={() => setSubPage({ page: 'INFO' })}
        warning={hasError(INFO_SUB_FORM_FIELDS)}
      >
        {t('INFO')}
      </NavigationButton>

      <NavigationButton
        active={subPage.page === 'PROCESS_FLOW'}
        icon={TuneIcon}
        onClick={() => setSubPage({ page: 'PROCESS_FLOW' })}
        warning={hasError(PROCESS_FLOW_SUB_FORM_FIELDS)}
      >
        {t('PROCESS_FLOW')}
      </NavigationButton>

      <NavigationButton
        active={subPage.page === 'PRODUCT'}
        icon={CategoryIcon}
        onClick={() => setSubPage({ page: 'PRODUCT' })}
        warning={hasError(PRODUCT_SUB_FORM_FIELDS)}
      >
        {t('PRODUCT')}
      </NavigationButton>

      <NavigationButton
        active={subPage.page === 'MACHINE'}
        icon={FactoryIcon}
        onClick={() => setSubPage({ page: 'MACHINE', tab: 'SPINDLE' })}
        warning={hasError(MACHINE_SUB_FORM_FIELDS)}
      >
        {t('MACHINE')}
      </NavigationButton>

      <NavigationButton
        active={subPage.page === 'GRIPPER'}
        icon={PrecisionManufacturingIcon}
        onClick={() => setSubPage({ page: 'GRIPPER', tab: 'GRIPPER_1' })}
        warning={hasError(GRIPPER_SUB_FORM_FIELDS)}
      >
        {t('GRIPPER')}
      </NavigationButton>

      <NavigationButton
        active={subPage.page === 'DRAWER'}
        icon={GridOnIcon}
        onClick={() =>
          setSubPage({
            page: 'DRAWER',
            tab: 'OFFSETS',
          })
        }
        warning={hasError(DRAWER_SUB_FORM_FIELDS)}
      >
        {t('DRAWER')}
      </NavigationButton>

      {placeFinishedProductOnSecondDrawer ? (
        <NavigationButton
          active={subPage.page === 'SECOND_DRAWER'}
          icon={GridOnIcon}
          onClick={() =>
            setSubPage({
              page: 'SECOND_DRAWER',
              tab: 'OFFSETS',
            })
          }
          warning={hasError(SECOND_DRAWER_SUB_FORM_FIELDS)}
        >
          {t('SECOND_DRAWER')}
        </NavigationButton>
      ) : null}
    </SideBar>
  );
}
