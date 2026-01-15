import { Context, IDartDatabase } from 'dart-api';
import { useModuleContext } from './useModuleContext';

export function useDatabase() {
  const moduleContext = useModuleContext();

  return moduleContext.getSystemLibrary(Context.DART_DATABASE) as IDartDatabase;
}
