import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  label: string;
};

export function ProgressWithLabel({ children, label }: Props) {
  return (
    <div className="tw-grid tw-place-items-center tw-gap-2 tw-w-14">
      {children}

      <span className="tw-font-mono tw-uppercase">{label}</span>
    </div>
  );
}
