import { Context, IFilePicker } from 'dart-api';
import { useModuleContext } from './useModuleContext';

export function useFilepicker() {
  const moduleContext = useModuleContext();

  return moduleContext.getSystemLibrary(Context.FILE_PICKER) as IFilePicker;
}
