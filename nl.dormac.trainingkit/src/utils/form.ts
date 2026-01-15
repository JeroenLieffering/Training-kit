import { FieldErrors, Path } from 'react-hook-form';
import { ValidationErrorWithInfo } from '../core/validators/validators';

export function getValidationErrorsWithInfo(
  errors: FieldErrors,
  collected: ValidationErrorWithInfo[] = [],
) {
  Object.values(errors).forEach((value) => {
    if (value?.types) {
      collected.push(...Object.values(value.types));
    } else {
      getValidationErrorsWithInfo(value as FieldErrors, collected);
    }
  });

  return collected;
}

export function makeHasError<T>(errors: ValidationErrorWithInfo[]) {
  const errorNames = getErrorNames(errors);

  function hasError(fieldNames: Path<T>[]) {
    return fieldNames.some((name) => errorNames.includes(name));
  }

  return hasError;
}

export function getErrorNames(errors: ValidationErrorWithInfo[]): string[] {
  return errors.map((errors) => errors.name);
}
