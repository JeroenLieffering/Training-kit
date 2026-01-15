import { CobotDioSubFormTab } from './components/CobotConfigForm/components/CobotConfigFormSwitch/components/CobotDioSubForm/CobotDioSubForm';
import { CobotDrawerSubFormTab } from './components/CobotConfigForm/components/CobotConfigFormSwitch/components/CobotDrawerSubForm';
import { CobotGripperSubFormTab } from './components/CobotConfigForm/components/CobotConfigFormSwitch/components/CobotGripperSubForm';
import { CobotMachineSubFormTab } from './components/CobotConfigForm/components/CobotConfigFormSwitch/components/CobotMachineSubForm/CobotMachineSubForm';
import { CobotSecondDrawerSubFormTab } from './components/CobotConfigForm/components/CobotConfigFormSwitch/components/CobotSecondDrawerSubForm';

export type SetupSubPage =
  | { page: 'COBOT' }
  | { page: 'PRODUCT' }
  | { page: 'MACHINE'; tab: CobotMachineSubFormTab }
  | { page: 'GRIPPER'; tab: CobotGripperSubFormTab }
  | { page: 'FEEDER' }
  | { page: 'DRAWER'; tab: CobotDrawerSubFormTab }
  | { page: 'SECOND_DRAWER'; tab: CobotSecondDrawerSubFormTab }
  | { page: 'STATIC_GRIDS'; index: string }
  | { page: 'DIO'; tab: CobotDioSubFormTab }
  | { page: 'DROP_OFF_POSITIONS'; index: string }
  | { page: 'DEBUG' }
  | { page: 'ERRORS' };
