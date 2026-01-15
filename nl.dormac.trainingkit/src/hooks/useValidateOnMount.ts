import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export function useValidateOnMount<T extends FieldValues>(
  form: UseFormReturn<T, any, undefined>,
) {
  // Validate the form again when navigating to this page.
  useEffect(() => {
    form.trigger();
  }, []);
}
