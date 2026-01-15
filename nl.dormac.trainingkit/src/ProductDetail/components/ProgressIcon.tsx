import React from 'react';
import { Icon } from '../../components/types';
import { ProgressCirle } from './ProgressCircle';
import { ProgressStatus } from './ProgressIndicator/types';

type Props = {
  icon: Icon;
  status: ProgressStatus;
  line?: boolean;
};

export function ProgressIcon({ icon, status, line }: Props) {
  const Icon = icon;

  return (
    <ProgressCirle status={status} line={line}>
      <Icon className="tw-h-10 tw-w-10" />
    </ProgressCirle>
  );
}
