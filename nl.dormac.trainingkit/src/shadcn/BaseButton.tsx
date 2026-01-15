import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from './utils/class-variant-authority';
import { cn } from './utils/cn';

const baseButtonVariants = cva(
  'tw-inline-flex tw-items-center tw-whitespace-nowrap tw-rounded-md tw-text-md tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50',
  {
    variants: {
      variant: {
        default:
          'tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90',
        destructive:
          'tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90',
        outline:
          'tw-border tw-border-solid tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground',
        secondary:
          'tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80',
        ghost: 'hover:tw-bg-accent hover:tw-text-accent-foreground',
        link: 'tw-text-primary tw-underline-offset-4 hover:tw-underline',
      },
      size: {
        default: 'tw-h-10 tw-px-4 tw-py-2',
        sm: 'tw-h-9 tw-rounded-md tw-px-3',
        lg: 'tw-h-11 tw-rounded-md tw-px-8',
        icon: 'tw-h-10 tw-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof baseButtonVariants> {}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const buttonClasses = cn(baseButtonVariants({ variant, size, className }));

    return <button className={buttonClasses} ref={ref} {...props} />;
  },
);
BaseButton.displayName = 'BaseButton';

export { BaseButton, baseButtonVariants };
