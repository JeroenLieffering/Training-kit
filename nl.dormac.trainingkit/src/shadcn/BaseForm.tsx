import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
} from 'react';
import { FieldErrors, useFormState } from 'react-hook-form';
import { Label, LabelProps } from '../components/Label';
import { ValidationErrorWithInfo } from '../core/validators/validators';
import { getPath } from '../utils/object';
import { cn } from './utils/cn';
import { useT } from '../hooks/useT';

const BaseFormItemContext = createContext('');

type BaseFormItemProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
};

function useFieldName() {
  return useContext(BaseFormItemContext);
}

const BaseFormItem = forwardRef<HTMLDivElement, BaseFormItemProps>(
  ({ className, name, ...props }, ref) => {
    return (
      <BaseFormItemContext.Provider value={name}>
        <BaseFormItemWrapper ref={ref} className={cn(className)} {...props} />
      </BaseFormItemContext.Provider>
    );
  },
);
BaseFormItem.displayName = 'BaseFormItem';

const BaseFormItemWrapper = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('tw-grid tw-gap-2', className)} {...props} />
  );
});
BaseFormItemWrapper.displayName = 'BaseFormItemWrapper';

const BaseFormLabel = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    const { errors } = useFormState();
    const name = useFieldName();

    // @ts-expect-error This works as errors is an object
    const fieldErrors = getPath(errors, name) as FieldErrors;

    const hasError = fieldErrors || fieldErrors !== undefined;

    return (
      <Label
        ref={ref}
        className={cn(hasError ? 'tw-text-destructive' : null, className)}
        htmlFor={name}
        {...props}
      />
    );
  },
);
BaseFormLabel.displayName = 'BaseFormLabel';

const BaseFormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('tw-text-md tw-text-muted-foreground', className)}
      {...props}
    />
  );
});
BaseFormDescription.displayName = 'BaseFormDescription';

type BaseFormMessageProps = {
  className?: string;
};

function BaseFormMessage({ className }: BaseFormMessageProps) {
  const t = useT();

  const { errors } = useFormState();
  const name = useFieldName();

  // @ts-expect-error This works as errors is an object
  const fieldErrors = getPath(errors, name) as FieldErrors;

  if (!fieldErrors || fieldErrors.types === undefined) {
    return null;
  }

  // We do not use react-hook-form standard errors but have created
  // our own.
  const validationErrors = Object.values(
    fieldErrors.types,
  ) as ValidationErrorWithInfo[];

  return (
    <>
      {validationErrors.map((error) => (
        <BaseErrorMessage key={error.type} className={className}>
          {t(error.type, { ...error, name: t(error.label) })}
        </BaseErrorMessage>
      ))}
    </>
  );
}

type BaseErrorMessageProps = {
  children: ReactNode;
  className?: string;
};

function BaseErrorMessage({ children, className }: BaseErrorMessageProps) {
  return (
    <p
      className={cn('tw-text-md tw-font-medium tw-text-destructive', className)}
    >
      {children}
    </p>
  );
}

export {
  BaseFormDescription,
  BaseFormItem,
  BaseFormItemContext,
  BaseFormItemWrapper,
  BaseFormLabel,
  BaseErrorMessage,
  BaseFormMessage,
};
