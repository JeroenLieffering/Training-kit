import React from 'react';
import { IOButton } from '../../../components';
import { CobotConfig } from '../../../core/models/cobot-config-types';
import { useT } from '../../../hooks/useT';
import { MaintenanceCard } from '../MaintenanceCard';
import { useAirpurge } from './hooks/useAirpurge';

type Props = {
  cobotConfig: CobotConfig;
};

export function AirpurgeMaintenance({ cobotConfig }: Props) {
  const t = useT();

  const { on, off, isHigh, isLow } = useAirpurge(cobotConfig);

  return (
    <MaintenanceCard title={t('AIRPURGE')}>
      <IOButton onClick={off} value={isLow}>
        {t('OFF')}
      </IOButton>
      <IOButton onClick={on} value={isHigh}>
        {t('ON')}
      </IOButton>
    </MaintenanceCard>
  );
}
