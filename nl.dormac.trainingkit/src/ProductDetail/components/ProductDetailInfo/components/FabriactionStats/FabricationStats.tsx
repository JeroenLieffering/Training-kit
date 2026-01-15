import React from 'react';
import { Fabrication } from '../../../../../core/models/fabrication-type';
import { getFabricationInfo } from '../../../../../core/services/fabrication-service';
import { InfoCard } from '../../../InfoCard';
import { Time } from '../../../../../components';
import { TotalTime } from './components/TotalTime';
import { useT } from '../../../../../hooks/useT';

type Props = {
  fabrications: Fabrication[];
};

export function FabricationStats({ fabrications }: Props) {
  const t = useT();

  if (fabrications.length === 0) {
    return (
      <>
        <InfoCard title={t('TOTAL_PRODUCED')}>-</InfoCard>

        <InfoCard title={t('TOTAL_RUNTIME')}>-</InfoCard>

        <InfoCard title={t('AVERAGE_CYCLE')}>-</InfoCard>

        <InfoCard title={t('SUCCESS_RATE')}>-</InfoCard>

        <InfoCard title={t('ALARMS')}>-</InfoCard>

        <InfoCard title={t('LAST_RUN')}>-</InfoCard>
      </>
    );
  }

  const info = getFabricationInfo(fabrications);

  return (
    <>
      <InfoCard title={t('TOTAL_PRODUCED')}>{fabrications.length}</InfoCard>

      <InfoCard title={t('TOTAL_RUNTIME')}>
        <TotalTime ms={info.totalDuration} />
      </InfoCard>

      <InfoCard title={t('AVERAGE_CYCLE')}>
        <Time ms={info.averageDuration} />
      </InfoCard>

      <InfoCard title={t('SUCCESS_RATE')}>{info.successRate}%</InfoCard>

      <InfoCard title={t('ALARMS')}>{info.errors}</InfoCard>

      <InfoCard title={t('LAST_RUN')}>
        {new Date(info.lastRun).toLocaleDateString()}
      </InfoCard>
    </>
  );
}
