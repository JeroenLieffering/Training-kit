import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CobotConfig } from '../../../../../core/models/cobot-config-types';
import { SetupSubPage } from '../../../../types';
import { CobotDioSubForm } from './components/CobotDioSubForm/CobotDioSubForm';
import { CobotDrawerSubForm } from './components/CobotDrawerSubForm';
import { CobotErrorsOverview } from './components/CobotErrorsOverview';
import { CobotGripperSubForm } from './components/CobotGripperSubForm';
import { CobotMachineSubForm } from './components/CobotMachineSubForm/CobotMachineSubForm';
import { CobotProductSubForm } from './components/CobotProductSubForm';
import { CobotSecondDrawerSubForm } from './components/CobotSecondDrawerSubForm';
import { CobotSubForm } from './components/CobotSubForm/CobotSubForm';
import { FeederSubForm } from './components/FeederSubForm/FeederSubForm';
import { CobotDropOffPositionsSubForm } from './components/CobotDropOffPositionsSubForm/CobotDropOffPositionsSubForm';
import { CobotDebugSubForm } from './components/CobotDebugSubForm/CobotDebugSubForm';
import { CobotStaticGridConfigSubForm } from './components/CobotStaticGridConfigSubForm/CobotStaticGridConfigSubForm';

type Props = {
  subPage: SetupSubPage;
  setSubPage: (subPage: SetupSubPage) => void;
  form: UseFormReturn<CobotConfig, any, undefined>;
};

export function CobotConfigFormSwitch({ subPage, setSubPage, form }: Props) {
  if (subPage.page === 'COBOT') {
    return <CobotSubForm form={form} />;
  } else if (subPage.page === 'MACHINE') {
    return <CobotMachineSubForm form={form} tab={subPage.tab} />;
  } else if (subPage.page === 'GRIPPER') {
    return <CobotGripperSubForm form={form} tab={subPage.tab} />;
  } else if (subPage.page === 'FEEDER') {
    return <FeederSubForm form={form} />;
  } else if (subPage.page === 'PRODUCT') {
    return <CobotProductSubForm form={form} />;
  } else if (subPage.page === 'DIO') {
    return <CobotDioSubForm form={form} tab={subPage.tab} />;
  } else if (subPage.page === 'DRAWER') {
    return <CobotDrawerSubForm form={form} tab={subPage.tab} />;
  } else if (subPage.page === 'SECOND_DRAWER') {
    return <CobotSecondDrawerSubForm form={form} tab={subPage.tab} />;
  } else if (subPage.page === 'DEBUG') {
    return <CobotDebugSubForm form={form} />;
  } else if (subPage.page === 'DROP_OFF_POSITIONS') {
    return (
      <CobotDropOffPositionsSubForm
        form={form}
        initialSelectedIndex={subPage.index}
      />
    );
  } else if (subPage.page === 'STATIC_GRIDS') {
    return (
      <CobotStaticGridConfigSubForm
        form={form}
        initialSelectedIndex={subPage.index}
      />
    );
  }

  return <CobotErrorsOverview form={form} setSubPage={setSubPage} />;
}
