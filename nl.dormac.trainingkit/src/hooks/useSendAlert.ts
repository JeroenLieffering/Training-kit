import { CobotConfig } from '../core/models/cobot-config-types';
import { useDigitalOutput } from './useDigitalOutput';

export function useSendAlert(cobotConfig: CobotConfig) {
  const [isHigh, sendAlert] = useDigitalOutput(
    cobotConfig.config.DO_SEND_ALERT,
  );

  function on() {
    sendAlert(true);
  }

  function off() {
    sendAlert(false);
  }

  return { on, off, isHigh, isLow: !isHigh } as const;
}
