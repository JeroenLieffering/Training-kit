import AppsIcon from '@mui/icons-material/Apps';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Extension from '@mui/icons-material/Extension';
import CableIcon from '@mui/icons-material/Cable';
import CategoryIcon from '@mui/icons-material/Category';
import ConstructionIcon from '@mui/icons-material/Construction';
import FactoryIcon from '@mui/icons-material/Factory';
import GridOnIcon from '@mui/icons-material/GridOn';
import LayersIcon from '@mui/icons-material/Layers';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import React, { useState } from 'react';
import { UseFormReturn, useFormState } from 'react-hook-form';
import {
  BackButton,
  NavigationButton,
  SideBar,
} from '../../../../../components';
import { CobotConfig } from '../../../../../core/models/cobot-config-types';
import { useNavigate } from '../../../../../hooks/useNavigate';
import { useT } from '../../../../../hooks/useT';
import {
  getErrorNames,
  getValidationErrorsWithInfo,
  makeHasError,
} from '../../../../../utils/form';
import { SetupSubPage } from '../../../../types';
import { COBOT_DIO_SUB_FORM_FIELDS } from '../CobotConfigFormSwitch/components/CobotDioSubForm/CobotDioSubForm';
import { COBOT_DRAWER_SUB_FORM_FIELDS } from '../CobotConfigFormSwitch/components/CobotDrawerSubForm';
import { COBOT_GRIPPER_SUB_FORM_FIELDS } from '../CobotConfigFormSwitch/components/CobotGripperSubForm';
import { COBOT_MACHINE_SUB_FORM_FIELDS } from '../CobotConfigFormSwitch/components/CobotMachineSubForm/CobotMachineSubForm';
import { COBOT_PRODUCT_SUB_FORM_FIELDS } from '../CobotConfigFormSwitch/components/CobotProductSubForm';
import { COBOT_SECOND_DRAWER_SUB_FORM_FIELDS } from '../CobotConfigFormSwitch/components/CobotSecondDrawerSubForm';
import { COBOT_SUB_FORM_FIELDS } from '../CobotConfigFormSwitch/components/CobotSubForm/CobotSubForm';
import { FEEDER_SUB_FORM_FIELDS } from '../CobotConfigFormSwitch/components/FeederSubForm/FeederSubForm';
import { CobotConfigFormLeaveConfirmationModal } from './components/CobotConfigFormLeaveConfirmationModal';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  subPage: SetupSubPage;
  setSubPage: (subPage: SetupSubPage) => void;
};

export function SetupSideBar({ form, subPage, setSubPage }: Props) {
  const t = useT();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigateTo = useNavigate();

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const errorNames = getErrorNames(errors);
  const hasError = makeHasError<CobotConfig>(errors);

  const { isDirty } = useFormState();

  const feeder = form.watch('config.FEEDER');
  const hasSecondDrawer = form.watch('config.EASY_LOADER.HAS_SECOND_DRAWER');

  function backClicked() {
    if (isDirty) {
      setShowConfirmationModal(true);
    } else {
      navigateBack();
    }
  }

  function navigateBack() {
    navigateTo({ page: 'PRODUCTS' });
  }

  return (
    <SideBar
      hasErrors={errors.length > 0}
      gotoErrors={() => setSubPage({ page: 'ERRORS' })}
      backbutton={
        <BackButton onClick={backClicked}>{t('PRODUCTS')}</BackButton>
      }
    >
      {showConfirmationModal ? (
        <CobotConfigFormLeaveConfirmationModal
          onConfirm={navigateBack}
          onClose={() => setShowConfirmationModal(false)}
        />
      ) : null}

      <NavigationButton
        active={subPage.page === 'COBOT'}
        icon={PrecisionManufacturingIcon}
        onClick={() => setSubPage({ page: 'COBOT' })}
        warning={hasError(COBOT_SUB_FORM_FIELDS)}
      >
        {t('COBOT')}
      </NavigationButton>

      <NavigationButton
        active={subPage.page === 'PRODUCT'}
        icon={CategoryIcon}
        onClick={() => setSubPage({ page: 'PRODUCT' })}
        warning={hasError(COBOT_PRODUCT_SUB_FORM_FIELDS)}
      >
        {t('PRODUCT')}
      </NavigationButton>

      <NavigationButton
        active={subPage.page === 'MACHINE'}
        icon={FactoryIcon}
        onClick={() => setSubPage({ page: 'MACHINE', tab: 'CONFIG' })}
        warning={
          hasError(COBOT_MACHINE_SUB_FORM_FIELDS) ||
          errorNames.some((error) =>
            error.startsWith('config.MACHINE_PICK_POSITIONS'),
          ) ||
          errorNames.some((error) =>
            error.startsWith('config.MACHINE_PLACE_POSITIONS'),
          )
        }
      >
        {t('MACHINE')}
      </NavigationButton>

      <NavigationButton
        active={subPage.page === 'GRIPPER'}
        icon={ConstructionIcon}
        onClick={() => setSubPage({ page: 'GRIPPER', tab: 'GRIPPER_1' })}
        warning={hasError(COBOT_GRIPPER_SUB_FORM_FIELDS)}
      >
        {t('GRIPPER')}
      </NavigationButton>

      {/* <NavigationButton
        active={subPage.page === 'FEEDER'}
        icon={LayersIcon}
        onClick={() => setSubPage({ page: 'FEEDER' })}
        warning={hasError(FEEDER_SUB_FORM_FIELDS)}
      >
        {t('FEEDER')}
      </NavigationButton> */}

      <NavigationButton
        active={subPage.page === 'DRAWER'}
        icon={GridOnIcon}
        onClick={() => setSubPage({ page: 'DRAWER', tab: 'PATH' })}
        // onClick={() => setSubPage({ page: 'DRAWER', tab: 'CONFIG' })}
        warning={hasError(COBOT_DRAWER_SUB_FORM_FIELDS)}
      >
        {t('DRAWER')}
      </NavigationButton>

      {feeder === 'EASY_LOADER' && hasSecondDrawer ? (
        <NavigationButton
          active={subPage.page === 'SECOND_DRAWER'}
          icon={GridOnIcon}
          onClick={() => setSubPage({ page: 'SECOND_DRAWER', tab: 'CONFIG' })}
          warning={hasError(COBOT_SECOND_DRAWER_SUB_FORM_FIELDS)}
        >
          {t('SECOND_DRAWER')}
        </NavigationButton>
      ) : null}

      <NavigationButton
        active={subPage.page === 'STATIC_GRIDS'}
        icon={AppsIcon}
        onClick={() => setSubPage({ page: 'STATIC_GRIDS', index: '0' })}
        warning={errorNames.some((error) =>
          error.startsWith('config.STATIC_GRIDS'),
        )}
      >
        {t('STATIC_GRIDS')}
      </NavigationButton>

      {/* <NavigationButton
        active={subPage.page === 'DROP_OFF_POSITIONS'}
        icon={GpsFixedIcon}
        onClick={() => setSubPage({ page: 'DROP_OFF_POSITIONS', index: '0' })}
        warning={errorNames.some((error) =>
          error.startsWith('config.DROP_OFF_POSITIONS'),
        )}
      >
        {t('DROP_OFF_POSITIONS')}
      </NavigationButton> */}

      <NavigationButton
        active={subPage.page === 'DIO'}
        icon={CableIcon}
        onClick={() => setSubPage({ page: 'DIO', tab: 'PER_ACTION' })}
        warning={hasError(COBOT_DIO_SUB_FORM_FIELDS)}
      >
        {t('DIGITAL_IO')}
      </NavigationButton>

      <NavigationButton
        active={subPage.page === 'DEBUG'}
        icon={Extension}
        onClick={() => setSubPage({ page: 'DEBUG' })}
        warning={errorNames.some((error) => error.startsWith('config.DEBUG'))}
      >
        {t('DEBUG')}
      </NavigationButton>
    </SideBar>
  );
}
