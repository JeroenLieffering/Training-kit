import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import React, { useEffect, useState } from 'react';
import { CobotConfig } from '../../../../../../../core/models/cobot-config-types';
import { useCobotCanControlMachine } from '../../../../../../../hooks/useCobotCanControlMachine';
import { ProgressIcon } from '../../../../../ProgressIcon';
import { ProgressStatus } from '../../../../../ProgressIndicator/types';
import { useMachineHasStarted } from './hooks/useMachineHasStarted';
import { ProgressWithLabel } from '../ProgressWithLabel';
import { useT } from '../../../../../../../hooks/useT';

type Props = {
  cobotConfig: CobotConfig;
};

export function MachineStatus({ cobotConfig }: Props) {
  const t = useT();

  const [status, setStatus] = useState<ProgressStatus>('pending');

  const cobotCanControlMachine = useCobotCanControlMachine(cobotConfig);
  const machineHasStarted = useMachineHasStarted(cobotConfig);

  useEffect(() => {
    if (machineHasStarted) {
      setStatus('started');
    } else if (cobotCanControlMachine) {
      setStatus('finished');
    } else {
      setStatus('pending');
    }
  }, [cobotCanControlMachine, machineHasStarted]);

  return (
    <ProgressWithLabel label={t('MACHINE')}>
      <ProgressIcon icon={FactoryOutlinedIcon} status={status} line={false} />
    </ProgressWithLabel>
  );
}
