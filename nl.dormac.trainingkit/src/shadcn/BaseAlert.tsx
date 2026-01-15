import React, { forwardRef, HTMLAttributes } from 'react';
import { cva, VariantProps } from './utils/class-variant-authority';
import { cn } from './utils/cn';

const baseAlertVariants = cva(
  'tw-relative tw-w-full tw-rounded-lg tw-border tw-border-solid tw-p-4',
  {
    variants: {
      variant: {
        default: 'tw-bg-background tw-text-foreground',
        destructive:
          'tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive',
        warning:
          'tw-border-amber-600/50 tw-text-amber-600 dark:tw-border-amber-600 [&>svg]:tw-text-amber-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type AlertVariantProps = VariantProps<typeof baseAlertVariants>;

export type AlertVariant = AlertVariantProps['variant'];

const BaseAlert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & AlertVariantProps
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(baseAlertVariants({ variant }), className)}
    {...props}
  />
));
BaseAlert.displayName = 'BaseAlert';

const BaseAlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('tw-font-bold tw-leading-none tw-tracking-tight', className)}
    {...props}
  />
));
BaseAlertTitle.displayName = 'BaseAlertTitle';

const BaseAlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('[&_p]:tw-leading-relaxed', className)}
    {...props}
  />
));
BaseAlertDescription.displayName = 'BaseAlertDescription';

export { BaseAlert, BaseAlertDescription, BaseAlertTitle };
