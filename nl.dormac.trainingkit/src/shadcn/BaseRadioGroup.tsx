import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from './utils/cn';

const BaseRadioGroup = forwardRef<
  HTMLDivElement,
  InputHTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div className={cn('tw-grid tw-gap-4', className)} {...props} ref={ref} />
  );
});
BaseRadioGroup.displayName = 'BaseRadioGroup';

const BaseRadioGroupWrapper = forwardRef<
  HTMLDivElement,
  InputHTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn('tw-flex tw-items-center tw-gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
BaseRadioGroupWrapper.displayName = 'BaseRadioGroupWrapper';

const BaseRadioGroupItem = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn('metasuite-tint', className)}
      {...props}
      type="radio"
    />
  );
});
BaseRadioGroupItem.displayName = 'BaseRadioGroupItem';

export { BaseRadioGroup, BaseRadioGroupItem, BaseRadioGroupWrapper };
