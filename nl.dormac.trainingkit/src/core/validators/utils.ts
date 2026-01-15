import { FieldErrors, Path } from 'react-hook-form';
import { setPath } from '../../utils/object';
import { ValidationError } from './validators';

export type Validator<T> = {
  name: Path<T>;
  label: string;
  validator: () =>
    | (ValidationError | undefined)[]
    | ValidationError
    | undefined;
};

export function getErrors<T>(validators: Validator<T>[]) {
  const errors: FieldErrors = {};

  validators.forEach((field) => {
    const fieldErrors: (ValidationError | undefined)[] = [];

    const result = field.validator();

    if (Array.isArray(result)) {
      fieldErrors.push(...result.filter((item) => item !== undefined));
    } else if (result) {
      fieldErrors.push(result);
    }

    if (fieldErrors.length > 0) {
      const types: Record<string, string> = {};
      fieldErrors.forEach((error) => {
        // @ts-expect-error This will work, but is hard to type right due to it being so dynamic
        types[error.type] = {
          ...error,
          name: field.name,
          label: field.label,
        };
      });

      // @ts-expect-error This will work, but is hard to type right due to it being so dynamic
      setPath(errors, field.name, { types });
    }
  });

  return errors;
}
