import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from './utils/cn';

export type SelectProps = InputHTMLAttributes<HTMLSelectElement>;

const BaseSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          'tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-pl-2 tw-pr-5 tw-py-2 tw-text-md tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-md file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
BaseSelect.displayName = 'BaseSelect';

export { BaseSelect };
