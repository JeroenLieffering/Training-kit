import { DrawerSubFormTab } from './components/ProductFormSwitch/components/DrawerSubForm';
import { GripperSubFormTab } from './components/ProductFormSwitch/components/GripperSubForm/GripperSubForm';
import { MachineSubFormTab } from './components/ProductFormSwitch/components/MachineSubForm/MachineSubForm';
import { SecondDrawerSubFormTab } from './components/ProductFormSwitch/components/SecondDrawerSubForm';

export type ProductFormMode = 'CREATE' | 'EDIT';

export type ProductFormSubPage =
  | { page: 'INFO' }
  | { page: 'PROCESS_FLOW' }
  | { page: 'PRODUCT' }
  | { page: 'MACHINE'; tab: MachineSubFormTab }
  | { page: 'GRIPPER'; tab: GripperSubFormTab }
  | { page: 'DRAWER'; tab: DrawerSubFormTab }
  | { page: 'SECOND_DRAWER'; tab: SecondDrawerSubFormTab }
  | { page: 'ERRORS' };
