import React from 'react';
import { IOButton } from '../../../components';
import { CobotConfig } from '../../../core/models/cobot-config-types';
import { useT } from '../../../hooks/useT';
import { MaintenanceCard } from '../MaintenanceCard';
import { useRequestNewDrawer } from './hooks/useFeeder';

type Props = {
  cobotConfig: CobotConfig;
};

export function FeederMaintenance({ cobotConfig }: Props) {
  const t = useT();

  const { requestDrawer, isHigh } = useRequestNewDrawer(cobotConfig);

  return (
    <MaintenanceCard title={t('FEEDER')}>
      <IOButton onClick={requestDrawer} value={isHigh}>
        {t('NEW_DRAWER')}
      </IOButton>
    </MaintenanceCard>
  );
}
