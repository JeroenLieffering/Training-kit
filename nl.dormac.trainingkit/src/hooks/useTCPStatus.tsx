import { useEffect, useState } from 'react';
import { AIR_PURGE_TCP, GRIPPER_1_TCP, GRIPPER_2_TCP } from '../config';
import { useRobotParameterManager } from './useRobotParameterManager';
import { useModuleContext } from './useModuleContext';

export function useTCPStatus() {
  const moduleContext = useModuleContext();
  const robotParameterManager = useRobotParameterManager();

  const [tcps, setTcps] = useState(robotParameterManager.tcp.items.value);

  useEffect(() => {
    robotParameterManager.tcp.items.register(moduleContext, setTcps);

    return () => {
      robotParameterManager.tcp.items.unregister(moduleContext, setTcps);
    };
  }, []);

  const result = {
    gripper1: false,
    gripper2: false,
    airpurge: false,
    clean: false,
  };

  for (const tcp of tcps) {
    if (tcp.symbol === GRIPPER_1_TCP) {
      result.gripper1 = true;
    } else if (tcp.symbol === GRIPPER_2_TCP) {
      result.gripper2 = true;
    } else if (tcp.symbol === AIR_PURGE_TCP) {
      result.airpurge = true;
    }
  }

  return result;
}
