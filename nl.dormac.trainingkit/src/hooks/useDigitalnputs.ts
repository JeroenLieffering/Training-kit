import { SixNumArray, TwentyNumArray } from 'dart-api';
import { useEffect, useState } from 'react';
import { useCommunicationManager } from './useCommunicationManager';
import { useModuleContext } from './useModuleContext';

export type UseDigitalInputsResult = {
  controller: TwentyNumArray;
  flange: SixNumArray;
};

export function useDigitalInputs(): UseDigitalInputsResult {
  const moduleContext = useModuleContext();
  const communicationManager = useCommunicationManager();

  const [controller, setController] = useState(
    communicationManager.dio.input.value,
  );

  const [flange, setFlange] = useState(
    communicationManager.dio.flangeInput.value,
  );

  useEffect(() => {
    communicationManager.dio.input.register(moduleContext, setController);
    communicationManager.dio.flangeInput.register(moduleContext, setFlange);

    return () => {
      communicationManager.dio.input.unregister(moduleContext, setController);
      communicationManager.dio.flangeInput.unregister(moduleContext, setFlange);
    };
  }, []);

  return { controller, flange };
}
