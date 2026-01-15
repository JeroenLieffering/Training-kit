import React from 'react';
import { Alert, BackButton, Container, Title, TopBar } from '../components';
import { isConfiguredWithSupportForMultipleDrawers } from '../core/services/cobot-config-service';
import { useCobotConfig } from '../hooks/useCobotConfig';
import { useNavigate } from '../hooks/useNavigate';
import { useT } from '../hooks/useT';
import { cn } from '../shadcn/utils/cn';
import { AirpurgeMaintenance } from './components/AirpurgeMaintenance/AirpurgeMaintenance';
import { FeederMaintenance } from './components/FeederMaintenance/FeederMaintenance';
import { Gripper1Maintenance } from './components/Gripper1Maintenance';
import { Gripper2Maintenance } from './components/Gripper2Maintenance';
import { MainSpindleMaintenance } from './components/MainSpindleMaintenance/MainSpindleMaintenance';
import { SendAlertMaintenance } from './components/SendAlertMaintenance';
import { SubSpindleMaintenance } from './components/SubSpindleMaintenance/SubSpindleMaintenance';

export function Maintenance() {
  const t = useT();

  const navigateTo = useNavigate();

  const [cobotConfig] = useCobotConfig();

  if (!cobotConfig) {
    return null;
  }

  return (
    <Container>
      <TopBar>
        <BackButton onClick={() => navigateTo({ page: 'PRODUCTS' })}>
          {t('PRODUCTS')}
        </BackButton>

        <Title>{t('MAINTENANCE')}</Title>
      </TopBar>

      <div className="tw-mx-auto">
        <Alert
          title={t('MAINTENANCE_MODE_WARNING')}
          className="tw-max-w-xl"
          variant="destructive"
        />
      </div>

      <div className={cn('tw-grid tw-grid-cols-3 tw-gap-4')}>
        <Gripper1Maintenance cobotConfig={cobotConfig} />

        {cobotConfig.config.HAS_SECOND_GRIPPER ? (
          <Gripper2Maintenance cobotConfig={cobotConfig} />
        ) : null}

        <AirpurgeMaintenance cobotConfig={cobotConfig} />

        <SendAlertMaintenance cobotConfig={cobotConfig} />

        {isConfiguredWithSupportForMultipleDrawers(cobotConfig) ? (
          <FeederMaintenance cobotConfig={cobotConfig} />
        ) : null}

        <MainSpindleMaintenance cobotConfig={cobotConfig} />

        {cobotConfig.config.MACHINE_HAS_SUB_SPINDLE ? (
          <SubSpindleMaintenance cobotConfig={cobotConfig} />
        ) : null}
      </div>
    </Container>
  );
}
