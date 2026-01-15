import { CobotConfig } from '../../../../../../../../core/models/cobot-config-types';
import { useDigitalOutput } from '../../../../../../../../hooks/useDigitalOutput';

export function useMachineHasStarted(cobotConfig: CobotConfig) {
  const [machineHasStarted] = useDigitalOutput(
    cobotConfig.config.DO_RUN_MACHINE,
  );

  return machineHasStarted;
}
