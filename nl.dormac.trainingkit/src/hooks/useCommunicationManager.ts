import { Context, ICommunicationManager } from 'dart-api';
import { useModuleContext } from './useModuleContext';

export function useCommunicationManager() {
  const moduleContext = useModuleContext();

  return moduleContext.getSystemManager(
    Context.COMMUNICATION_MANAGER,
  ) as ICommunicationManager;
}
