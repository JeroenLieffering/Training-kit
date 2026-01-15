import { useEffect, useState } from 'react';
import { useCommunicationManager } from './useCommunicationManager';
import { useModuleContext } from './useModuleContext';
import { SixNumArray, SixteenNumArray } from 'dart-api';

export type UseDigitalOutputsResult = {
  controller: SixteenNumArray;
  flange: SixNumArray;
};

export function useDigitalOutputs(): UseDigitalOutputsResult {
  const moduleContext = useModuleContext();
  const communicationManager = useCommunicationManager();

  const [controller, setController] = useState(
    communicationManager.dio.output.value,
  );

  const [flange, setFlange] = useState(
    communicationManager.dio.flangeOutput.value,
  );

  useEffect(() => {
    communicationManager.dio.output.register(moduleContext, setController);
    communicationManager.dio.flangeOutput.register(moduleContext, setFlange);

    return () => {
      communicationManager.dio.output.unregister(moduleContext, setController);
      communicationManager.dio.flangeOutput.unregister(
        moduleContext,
        setFlange,
      );
    };
  }, []);

  return { controller, flange };
}
