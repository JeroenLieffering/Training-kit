import { useEffect, useState } from 'react';
import { useModuleContext } from './useModuleContext';
import { useRobotManager } from './useRobotManager';

export function useIsServoOn() {
  const moduleContext = useModuleContext();
  const robotManager = useRobotManager();
  const [isServoOn, setServoOn] = useState(robotManager.isServoOn());

  useEffect(() => {
    robotManager.servoState.register(moduleContext, setServoOn);

    return () => {
      robotManager.servoState.unregister(moduleContext, setServoOn);
    };
  }, []);

  return isServoOn;
}
