import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import React, { useEffect, useState } from 'react';
import { MetaSuiteProgramState } from '../../../../../../drl/main/types';
import { ProgressIcon } from '../../../../ProgressIcon';
import { ProgressStatus } from '../../../../ProgressIndicator/types';
import { useT } from '../../../../../../hooks/useT';
import { ProgressWithLabel } from './ProgressWithLabel';

type Props = {
  status: MetaSuiteProgramState;
  isPlaying: boolean;
};

export function DoorStatus({ status, isPlaying }: Props) {
  const t = useT();

  const [progressStatus, setProgressStatus] =
    useState<ProgressStatus>('pending');

  useEffect(() => {
    if (!isPlaying) {
      setProgressStatus('pending');
    } else if (status === 'WAIT_DOOR_OPEN') {
      setProgressStatus('started');
    } else if (status === 'MACHINE_DOOR_OPEN') {
      setProgressStatus('finished');
    } else {
      setProgressStatus('pending');
    }
  }, [status, isPlaying]);

  return (
    <ProgressWithLabel label={t('DOOR')}>
      <ProgressIcon
        icon={SensorDoorOutlinedIcon}
        status={progressStatus}
        line={false}
      />
    </ProgressWithLabel>
  );
}
