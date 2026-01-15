import { Context, IUserManager } from 'dart-api';
import { useModuleContext } from './useModuleContext';

export function useUserManager() {
  const moduleContext = useModuleContext();

  const programManager = moduleContext.getSystemManager(
    Context.USER_MANAGER,
  ) as IUserManager;

  return programManager;
}
