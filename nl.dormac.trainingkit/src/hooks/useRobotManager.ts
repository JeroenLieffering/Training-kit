import { Context, IRobotManager } from 'dart-api';
import { useModuleContext } from './useModuleContext';

export function useRobotManager() {
  const moduleContext = useModuleContext();

  return moduleContext.getSystemManager(Context.ROBOT_MANAGER) as IRobotManager;
}
