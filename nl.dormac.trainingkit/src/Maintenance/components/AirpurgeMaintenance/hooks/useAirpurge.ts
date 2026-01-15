import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { useDigitalOutput } from '../../../../hooks/useDigitalOutput';

export function useAirpurge(cobotConfig: CobotConfig) {
  const [isHigh, airpurge] = useDigitalOutput(cobotConfig.config.DO_AIRPURGE);

  function on() {
    airpurge(true);
  }

  function off() {
    airpurge(false);
  }

  return { on, off, isHigh, isLow: !isHigh } as const;
}
