import { SafetyMode } from 'dart-api';
import { useEffect, useState } from 'react';
import { useRobotManager } from './useRobotManager';
import { useModuleContext } from './useModuleContext';

export function useSafetyMode(): SafetyMode {
  const moduleContext = useModuleContext();
  const robotManager = useRobotManager();

  const [safetyMode, setSafetyMode] = useState<SafetyMode>(
    robotManager.safetyMode.value,
  );

  useEffect(() => {
    robotManager.safetyMode.register(moduleContext, setSafetyMode);

    return () => {
      robotManager.safetyMode.unregister(moduleContext, setSafetyMode);
    };
  }, []);

  return safetyMode;
}
