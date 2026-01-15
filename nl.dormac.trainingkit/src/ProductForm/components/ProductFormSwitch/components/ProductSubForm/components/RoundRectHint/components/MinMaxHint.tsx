import React from 'react';

type Props = {
  min: number;
  max: number;
};

export function MinMaxHint({ min, max }: Props) {
  return (
    <span>
      {min} / {max}
    </span>
  );
}
