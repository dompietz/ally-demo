import type { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

export function registerField<T extends FieldValues>(
  register: UseFormRegister<T>,
  name: Path<T>,
  options?: RegisterOptions<T>
) {
  return register(name, options);
}

export function hasError<T extends FieldValues>(errors: FieldErrors<T>, name: Path<T>) {
  return Boolean(errors[name]);
}

export function getErrorMessage<T extends FieldValues>(errors: FieldErrors<T>, name: Path<T>) {
  const fieldError = errors[name];
  if (!fieldError) return undefined;
  return fieldError.message as string | undefined;
}
