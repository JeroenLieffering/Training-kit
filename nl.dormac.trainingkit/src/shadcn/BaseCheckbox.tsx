import React, { forwardRef, HTMLAttributes } from 'react';
import { Label } from '../components/Label';
import { cn } from './utils/cn';

const BaseCheckbox = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLInputElement>
>(({ className, children, ...props }, ref) => (
  <Label className="tw-flex tw-gap-2 tw-items-center">
    <input
      ref={ref}
      className={cn('metasuite-tint', className)}
      {...props}
      // eslint-disable-next-line react/no-children-prop
      type="checkbox"
    />
    {children ? <span className="tw-font-normal">{children}</span> : null}
  </Label>
));
BaseCheckbox.displayName = 'BaseCheckbox';

export { BaseCheckbox };
