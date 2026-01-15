import React, { useEffect, useState } from 'react';
import { Timer } from '../../../types';
import { Time } from '../../../../components';

type Props = {
  timer: Timer;
};

export function TimerView({ timer }: Props) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDuration(timer.getDuration());
    }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return <Time ms={duration} />;
}
