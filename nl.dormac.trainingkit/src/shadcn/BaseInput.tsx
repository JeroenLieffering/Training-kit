import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from './utils/cn';
import { ReactNode } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
};

const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, addonRight, addonLeft, ...props }, ref) => {
    const input = (
      <input
        type={type}
        className={cn(
          'tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-solid tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-md tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-md file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
          {
            'tw-border-left-none tw-rounded-l-none tw-pl-20 ': addonLeft,
            'tw-border-right-none tw-rounded-r-none tw-pr-20': addonRight,
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );

    if (!addonRight && !addonLeft) {
      return input;
    } else {
      return (
        <div className="tw-relative">
          {addonLeft ? (
            <div className="tw-border-input tw-bg-background tw-absolute tw-left-0 tw-top-0 tw-grid tw-h-10 tw-w-16 tw-place-content-center tw-rounded-l-md tw-border tw-border-solid tw-bg-slate-100">
              {addonLeft}
            </div>
          ) : null}
          {input}
          {addonRight ? (
            <div className="tw-border-input tw-bg-background tw-absolute tw-right-0 tw-top-0 tw-grid tw-h-10 tw-w-16 tw-place-content-center tw-rounded-r-md tw-border tw-border-solid tw-bg-slate-100">
              {addonRight}
            </div>
          ) : null}
        </div>
      );
    }
  },
);
BaseInput.displayName = 'Input';

export { BaseInput };
