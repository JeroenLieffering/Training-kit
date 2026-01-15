import React from 'react';
import { OpenCloseMaintenance } from '../../components';
import { CobotConfig } from '../../core/models/cobot-config-types';
import { useGripper2 } from '../../hooks/useGripper2';
import { useT } from '../../hooks/useT';
import { MaintenanceCard } from './MaintenanceCard';

type Props = {
  cobotConfig: CobotConfig;
};

export function Gripper2Maintenance({ cobotConfig }: Props) {
  const t = useT();

  const device = useGripper2(cobotConfig);

  return (
    <MaintenanceCard title={t('GRIPPER_NO_2')}>
      <OpenCloseMaintenance device={device} />
    </MaintenanceCard>
  );
}
