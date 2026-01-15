import React from 'react';
import { Badge, MonoText } from '../../../../../../../components';
import { FabricationState, Timer } from '../../../../../../types';
import { TimerView } from '../../../TimerView';
import { useT } from '../../../../../../../hooks/useT';

type Props = {
  fabricationState: FabricationState;
  productTimer: Timer;
  fabricationTimer: Timer;
};

export function FabricationStatus({
  fabricationState,
  productTimer,
  fabricationTimer,
}: Props) {
  const t = useT();

  const errors = t('ERRORS', {
    count: fabricationState.pickupFails,
  });

  return (
    <div className="tw-flex tw-flex-col tw-gap-1 tw-items-end">
      <MonoText>
        {fabricationState.totalProductsFabricated} / {fabricationState.amount}
      </MonoText>

      {fabricationState.pickupFails > 0 ? (
        <Badge variant="destructive" className="tw-self-end">
          {errors}
        </Badge>
      ) : null}

      <MonoText>
        <TimerView timer={productTimer} />
      </MonoText>

      <MonoText>
        <TimerView timer={fabricationTimer} />
      </MonoText>
    </div>
  );
}
