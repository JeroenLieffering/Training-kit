import { Context, IMotionManager } from 'dart-api';
import { useModuleContext } from './useModuleContext';

export function useMotionManager() {
  const moduleContext = useModuleContext();

  return moduleContext.getSystemManager(
    Context.MOTION_MANAGER,
  ) as IMotionManager;
}
