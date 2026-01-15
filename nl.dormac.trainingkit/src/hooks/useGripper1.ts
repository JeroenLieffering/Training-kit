import { CobotConfig } from '../core/models/cobot-config-types';
import { useOpenCloseHighLow } from './useOpenCloseHighLow';

export function useGripper1(cobotConfig: CobotConfig) {
  return useOpenCloseHighLow({
    openDigitalInput: cobotConfig.config.DO_GRIPPER1_OPEN,
    closeDigitalInput: cobotConfig.config.DO_GRIPPER1_CLOSE,
    isOpenedDigitalOutput: cobotConfig.config.DI_GRIPPER1_IS_OPENED,
    isClosedDigitalOutput: cobotConfig.config.DI_GRIPPER1_IS_CLOSED,
  });
}
