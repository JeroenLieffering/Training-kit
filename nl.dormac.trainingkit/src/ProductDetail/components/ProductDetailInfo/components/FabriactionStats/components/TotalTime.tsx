import { TFunction } from 'i18next';
import React from 'react';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  ms: number;
};

export function TotalTime({ ms }: Props) {
  const t = useT();

  return <>{msToTime(ms, t)}</>;
}

function msToTime(duration: number, t: TFunction) {
  const y = t('YEAR_UNIT');
  const d = t('DAY_UNIT');
  const h = t('HOUR_UNIT');
  const m = t('MINUTE_UNIT');
  const s = t('SECOND_UNIT');

  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor(hours / 24);
  const years = Math.floor(hours / 24);

  if (years !== 0) {
    return [years + y, days + d, hours + h]
      .filter((x) => !x.startsWith('0'))
      .join(' ');
  } else if (days !== 0) {
    return [days + d, hours + h, minutes + m]
      .filter((x) => !x.startsWith('0'))
      .join(' ');
  } else {
    return [hours + h, minutes + m, seconds + s]
      .filter((x) => !x.startsWith('0'))
      .join(' ');
  }
}
