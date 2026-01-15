import { Context, IProgramManager } from 'dart-api';
import { useModuleContext } from './useModuleContext';

export function useProgamManager() {
  const moduleContext = useModuleContext();

  const programManager = moduleContext.getSystemManager(
    Context.PROGRAM_MANAGER,
  ) as IProgramManager;

  return programManager;
}
