import React from 'react';
import { Alert, OpenCloseMaintenance } from '../../../components';
import { DEMO } from '../../../config';
import { CobotConfig } from '../../../core/models/cobot-config-types';
import { useCobotCanControlMachine } from '../../../hooks/useCobotCanControlMachine';
import { useT } from '../../../hooks/useT';
import { MaintenanceCard } from '../MaintenanceCard';
import { useMainSpindle } from './hooks/useMainSpindle';

type Props = {
  cobotConfig: CobotConfig;
};

export function MainSpindleMaintenance({ cobotConfig }: Props) {
  const t = useT();

  const cobotCanControlMachine = useCobotCanControlMachine(cobotConfig);

  const device = useMainSpindle(cobotConfig);

  return (
    <MaintenanceCard title={t('MAIN_SPINDLE')}>
      {cobotCanControlMachine || DEMO ? (
        <OpenCloseMaintenance device={device} />
      ) : (
        <Alert title={t('MACHINE_NO_CONTROL_OVER_SPINDLE')} variant="default" />
      )}
    </MaintenanceCard>
  );
}
