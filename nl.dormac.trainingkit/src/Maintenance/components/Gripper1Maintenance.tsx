import React from 'react';
import { OpenCloseMaintenance } from '../../components';
import { CobotConfig } from '../../core/models/cobot-config-types';
import { useGripper1 } from '../../hooks/useGripper1';
import { useT } from '../../hooks/useT';
import { MaintenanceCard } from './MaintenanceCard';

type Props = {
  cobotConfig: CobotConfig;
};

export function Gripper1Maintenance({ cobotConfig }: Props) {
  const t = useT();

  const device = useGripper1(cobotConfig);

  return (
    <MaintenanceCard title={t('GRIPPER_NO_1')}>
      <OpenCloseMaintenance device={device} />
    </MaintenanceCard>
  );
}
