import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { useOpenCloseHighLow } from '../../../../hooks/useOpenCloseHighLow';

export function useMainSpindle(cobotConfig: CobotConfig) {
  return useOpenCloseHighLow({
    openDigitalInput: cobotConfig.config.DO_MAIN_SPINDLE_OPEN,
    closeDigitalInput: cobotConfig.config.DO_MAIN_SPINDLE_CLOSE,
    isOpenedDigitalOutput: cobotConfig.config.DI_MAIN_SPINDLE_IS_OPENED,
    isClosedDigitalOutput: cobotConfig.config.DI_MAIN_SPINDLE_IS_CLOSED,
  });
}
