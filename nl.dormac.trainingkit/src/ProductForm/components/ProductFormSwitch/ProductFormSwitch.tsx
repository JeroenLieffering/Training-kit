import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CobotConfig } from '../../../core/models/cobot-config-types';
import { Product } from '../../../core/models/product-types';
import { CobotInfo } from '../../../types';
import { ProductFormMode, ProductFormSubPage } from '../../types';
import { DrawerSubForm } from './components/DrawerSubForm';
import { ErrorsOverview } from './components/ErrorsOverview';
import { GripperSubForm } from './components/GripperSubForm/GripperSubForm';
import { InfoSubForm } from './components/InfoSubForm/InfoSubForm';
import { MachineSubForm } from './components/MachineSubForm/MachineSubForm';
import { ProcessFlowSubForm } from './components/ProcessFlowSubForm/ProcessFlowSubForm';
import { ProductSubForm } from './components/ProductSubForm/ProductSubForm';
import { SecondDrawerSubForm } from './components/SecondDrawerSubForm';

type Props = {
  subPage: ProductFormSubPage;
  setSubPage: (subPage: ProductFormSubPage) => void;
  form: UseFormReturn<Product, any, undefined>;
  cobotConfig: CobotConfig;
  cobotInfo: CobotInfo;
  mode: ProductFormMode;
};

export function ProductFormSwitch({
  subPage,
  setSubPage,
  form,
  cobotConfig,
  cobotInfo,
  mode,
}: Props) {
  if (subPage.page === 'PROCESS_FLOW') {
    return <ProcessFlowSubForm form={form} cobotConfig={cobotConfig} />;
  } else if (subPage.page === 'PRODUCT') {
    return (
      <ProductSubForm
        form={form}
        cobotConfig={cobotConfig}
        cobotInfo={cobotInfo}
      />
    );
  } else if (subPage.page === 'MACHINE') {
    return (
      <MachineSubForm form={form} cobotConfig={cobotConfig} tab={subPage.tab} />
    );
  } else if (subPage.page === 'GRIPPER') {
    return (
      <GripperSubForm form={form} cobotConfig={cobotConfig} tab={subPage.tab} />
    );
  } else if (subPage.page === 'DRAWER') {
    return (
      <DrawerSubForm form={form} cobotConfig={cobotConfig} tab={subPage.tab} />
    );
  } else if (subPage.page === 'SECOND_DRAWER') {
    return (
      <SecondDrawerSubForm
        form={form}
        cobotConfig={cobotConfig}
        tab={subPage.tab}
      />
    );
  } else if (subPage.page === 'ERRORS') {
    return <ErrorsOverview form={form} setSubPage={setSubPage} />;
  }

  return <InfoSubForm form={form} mode={mode} />;
}
