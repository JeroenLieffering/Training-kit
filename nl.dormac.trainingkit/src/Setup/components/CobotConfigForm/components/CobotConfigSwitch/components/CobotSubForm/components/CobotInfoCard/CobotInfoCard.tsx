import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '../../../../../../../../../components';
import {
  AIR_PURGE_TCP,
  GRIPPER_1_TCP,
  GRIPPER_2_TCP,
  TOOL_WEIGHT_NAME,
} from '../../../../../../../../../config';
import { useT } from '../../../../../../../../../hooks/useT';
import { useTCPStatus } from '../../../../../../../../../hooks/useTCPStatus';
import { CobotInfo } from '../../../../../../../../../types';
import { Status } from './components/Status';
import { useToolWeight } from '../../../../../../../../../hooks/useToolWeight';
import { useIsUsingUserHomePosition } from '../../../../../../../../../hooks/useIsUsingUserHomePosition';
import { useCobotConfig } from '../../../../../../../../../hooks/useCobotConfig';

type Props = {
  cobotInfo: CobotInfo;
};

export function CobotInfoCard({ cobotInfo }: Props) {
  const t = useT();

  const tcpStatus = useTCPStatus();
  const toolWeight = useToolWeight();
  const isUsingUserHomePosition = useIsUsingUserHomePosition();
  const [cobotConfig] = useCobotConfig();

  if (!cobotConfig) {
    return null;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cobotInfo.model}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl>
          <div className="tw-flex tw-gap-1">
            <dt className="tw-font-semibold">{t('CARRY_WEIGHT')}:</dt>
            <dd>
              {cobotInfo.carryWeight}
              {t('KG')}
            </dd>
          </div>
          <div className="tw-flex tw-gap-1">
            <dt className="tw-font-semibold">{t('MAX_CARRY_WEIGHT')}:</dt>
            <dd>
              {cobotInfo.carryWeightMax}
              {t('KG')}
            </dd>
          </div>
        </dl>

        <Separator orientation="horizontal" className="tw-my-4" />

        <div className="tw-grid tw-gap-4">
          <Status
            text={t('IS_USING_USER_HOME_POSITION')}
            valid={isUsingUserHomePosition}
          />
          <Status
            text={t('IS_TCP_CONFIGURED', { name: GRIPPER_1_TCP })}
            valid={tcpStatus.gripper1}
          />
          {cobotConfig.config.HAS_SECOND_GRIPPER ? (
            <Status
              text={t('IS_TCP_CONFIGURED', { name: GRIPPER_2_TCP })}
              valid={tcpStatus.gripper2}
            />
          ) : null}
          <Status
            text={t('IS_TCP_CONFIGURED', { name: AIR_PURGE_TCP })}
            valid={tcpStatus.airpurge}
          />
          <Status
            text={t('IS_TOOL_WEIGHT_CONFIGURED', { name: TOOL_WEIGHT_NAME })}
            valid={!!toolWeight}
          />
        </div>
      </CardContent>
    </Card>
  );
}
