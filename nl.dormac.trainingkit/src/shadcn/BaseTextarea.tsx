import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from './utils/cn';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const BaseTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
BaseTextarea.displayName = 'BaseTextarea';

export { BaseTextarea };
