import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { useOpenCloseHighLow } from '../../../../hooks/useOpenCloseHighLow';

export function useSubSpindle(cobotConfig: CobotConfig) {
  return useOpenCloseHighLow({
    openDigitalInput: cobotConfig.config.DO_SUB_SPINDLE_OPEN,
    closeDigitalInput: cobotConfig.config.DO_SUB_SPINDLE_CLOSE,
    isOpenedDigitalOutput: cobotConfig.config.DI_SUB_SPINDLE_IS_OPENED,
    isClosedDigitalOutput: cobotConfig.config.DI_SUB_SPINDLE_IS_CLOSED,
  });
}
