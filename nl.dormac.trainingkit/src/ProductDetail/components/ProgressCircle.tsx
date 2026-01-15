import React, { ReactNode } from 'react';
import { cn } from '../../shadcn/utils/cn';
import { ProgressStatus } from './ProgressIndicator/types';

type Props = {
  children: ReactNode;
  status: ProgressStatus;
  line?: boolean;
};

export function ProgressCirle({ children, status, line = true }: Props) {
  return (
    <>
      <div
        className={cn(
          'tw-h-14 tw-w-14 tw-flex tw-justify-center tw-items-center tw-rounded-full tw-border-2 tw-border-solid tw-border-slate-800 tw-shadow-md',
          getBgForProgressIcon(status),
          status === 'started' ? 'tw-animate-pulse' : null,
        )}
      >
        {children}
      </div>

      {line ? (
        <div className="tw-shrink-0 tw-w-4 tw-h-[2px] tw-bg-slate-800" />
      ) : null}
    </>
  );
}

function getBgForProgressIcon(status: ProgressStatus) {
  if (status === 'finished') {
    return 'tw-bg-lime-500';
  } else if (status === 'started') {
    return 'tw-bg-sky-500';
  } else if (status === 'error') {
    return 'tw-bg-red-500';
  } else {
    return 'tw-bg-gray-100';
  }
}
