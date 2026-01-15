import { Context, IPositionManager } from 'dart-api';
import { useModuleContext } from './useModuleContext';

export function usePositionManager() {
  const moduleContext = useModuleContext();

  return moduleContext.getSystemManager(
    Context.POSITION_MANAGER,
  ) as IPositionManager;
}
