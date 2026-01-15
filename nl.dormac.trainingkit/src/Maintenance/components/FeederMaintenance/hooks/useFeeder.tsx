import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { useDigitalOutput } from '../../../../hooks/useDigitalOutput';

export function useRequestNewDrawer(cobotConfig: CobotConfig) {
  const [isHigh, set] = useDigitalOutput(
    cobotConfig.config.DO_REQUEST_NEW_DRAWER,
  );

  async function requestDrawer() {
    await set(true);

    setTimeout(() => {
      set(false);
    }, 2000);
  }

  return { requestDrawer, isHigh, isLow: !isHigh } as const;
}
