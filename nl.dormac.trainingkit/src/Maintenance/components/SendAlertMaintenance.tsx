import React from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  IOButton,
} from '../../components';
import { CobotConfig } from '../../core/models/cobot-config-types';
import { useSendAlert } from '../../hooks/useSendAlert';
import { useT } from '../../hooks/useT';

type Props = {
  cobotConfig: CobotConfig;
};

export function SendAlertMaintenance({ cobotConfig }: Props) {
  const t = useT();

  const { on, off, isHigh, isLow } = useSendAlert(cobotConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('SEND_ALERT')}</CardTitle>
      </CardHeader>
      <CardFooter className="tw-gap-4">
        <IOButton onClick={off} value={isLow}>
          {t('OFF')}
        </IOButton>
        <IOButton onClick={on} value={isHigh}>
          {t('ON')}
        </IOButton>
      </CardFooter>
    </Card>
  );
}
