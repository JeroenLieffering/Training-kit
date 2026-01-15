import React from 'react';
import { OpenCloseMaintenance } from '../../../components';
import { Alert } from '../../../components/Alert';
import { DEMO } from '../../../config';
import { CobotConfig } from '../../../core/models/cobot-config-types';
import { useCobotCanControlMachine } from '../../../hooks/useCobotCanControlMachine';
import { useT } from '../../../hooks/useT';
import { MaintenanceCard } from '../MaintenanceCard';
import { useSubSpindle } from './hooks/useSubSpindle';

type Props = {
  cobotConfig: CobotConfig;
};

export function SubSpindleMaintenance({ cobotConfig }: Props) {
  const t = useT();

  const cobotCanControlMachine = useCobotCanControlMachine(cobotConfig);

  const device = useSubSpindle(cobotConfig);

  return (
    <MaintenanceCard title={t('SUB_SPINDLE')}>
      {cobotCanControlMachine || DEMO ? (
        <OpenCloseMaintenance device={device} />
      ) : (
        <Alert title={t('MACHINE_NO_CONTROL_OVER_SPINDLE')} variant="default" />
      )}
    </MaintenanceCard>
  );
}
