import { CobotConfig } from '../core/models/cobot-config-types';
import { useDigitalInput } from './useDigitalnput';

export function useCobotCanControlMachine(cobotConfig: CobotConfig) {
  return useDigitalInput(cobotConfig.config.DI_COBOT_IS_CALLED);
}
