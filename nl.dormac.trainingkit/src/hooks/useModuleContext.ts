import { ModuleContext } from 'dart-api';
import { createContext, useContext } from 'react';

export const ModuleContextInjector = createContext<ModuleContext | null>(null);

export function useModuleContext(): ModuleContext {
  return useContext(ModuleContextInjector) as ModuleContext;
}
