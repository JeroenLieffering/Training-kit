import React from 'react';
import { MetaSuiteProgramSpindleStatus } from '../../../../../../drl/main/types';
import { useT } from '../../../../../../hooks/useT';
import { ProgressCirle } from '../../../../ProgressCircle';
import { ProgressWithLabel } from './ProgressWithLabel';
import { getColorForStatus } from './utils';

type Props = {
  roundProduct: boolean;
  gripperStatus: MetaSuiteProgramSpindleStatus;
  isPlaying: boolean;
  spindle: 'MAIN' | 'SUB'; // Matches translation key
};

export function SpindleStatus({
  gripperStatus,
  isPlaying,
  roundProduct,
  spindle,
}: Props) {
  const t = useT();

  const color = getColorForStatus(gripperStatus, isPlaying);

  const rotation = spindle === 'MAIN' ? 90 : -90;

  return (
    <ProgressWithLabel label={t(spindle)}>
      <ProgressCirle status="pending" line={false}>
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            scale: 1.3,
            position: 'relative',
            left: spindle === 'MAIN' ? 2 : -1,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '50% 50%;',
          }}
        >
          <path
            id="Path"
            fill="#000000"
            stroke="none"
            d="M 9.86576 17.572121 L 7.625881 12.772378 L 10.732379 9.665878 L 12.598948 9.665878 L 15.705448 12.772378 L 13.465568 17.572121 C 13.22558 18.078758 13.452234 18.665394 13.945539 18.90538 C 14.452181 19.145369 15.038816 18.918715 15.278801 18.425407 L 17.718674 13.199021 C 17.958658 12.692383 17.851997 12.092414 17.452019 11.692437 L 15.132145 9.372561 C 15.452127 9.132574 15.665449 8.75926 15.665449 8.332617 C 15.665449 7.599321 15.065479 6.999355 14.332188 6.999355 L 12.998925 6.999355 C 12.998925 6.999355 11.626688 6.866674 12 7 L 10.332402 6.999355 L 8.99914 6.999355 C 8.265846 6.999355 7.665878 7.599321 7.665878 8.332617 C 7.665878 8.75926 7.8792 9.132574 8.199183 9.372561 L 5.879308 11.692437 C 5.479329 12.092414 5.372668 12.692383 5.612656 13.199021 L 8.052525 18.425407 C 8.292512 18.932047 8.879147 19.145369 9.385786 18.90538 C 9.879092 18.665394 10.105747 18.078758 9.86576 17.572121"
          />
          {roundProduct ? (
            <circle cx="11.7" cy="14" r="3" fill={color} />
          ) : (
            <rect x="9.4" y="11.4" width="4.5" height="5" fill={color} />
          )}
        </svg>
      </ProgressCirle>
    </ProgressWithLabel>
  );
}
