import { CobotConfig } from '../core/models/cobot-config-types';
import { useOpenCloseHighLow } from './useOpenCloseHighLow';

export function useGripper2(cobotConfig: CobotConfig) {
  return useOpenCloseHighLow({
    openDigitalInput: cobotConfig.config.DO_GRIPPER2_OPEN,
    closeDigitalInput: cobotConfig.config.DO_GRIPPER2_CLOSE,
    isOpenedDigitalOutput: cobotConfig.config.DI_GRIPPER2_IS_OPENED,
    isClosedDigitalOutput: cobotConfig.config.DI_GRIPPER2_IS_CLOSED,
  });
}
