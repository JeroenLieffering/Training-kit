import { Context, IRobotParameterManager } from 'dart-api';
import { useModuleContext } from './useModuleContext';

export function useRobotParameterManager() {
  const moduleContext = useModuleContext();

  return moduleContext.getSystemManager(
    Context.ROBOT_PARAMETER_MANAGER,
  ) as IRobotParameterManager;
}
