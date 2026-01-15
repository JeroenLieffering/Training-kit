import { COBOTS } from '../config';
import { useRobotManager } from './useRobotManager';

export function useCobotInfo() {
  const robotManager = useRobotManager();

  const model = robotManager.getRobotModel();

  return COBOTS.find((cobot) => cobot.model === model);
}
