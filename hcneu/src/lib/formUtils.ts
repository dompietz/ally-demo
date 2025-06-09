// src/lib/formUtils.ts
import type { RegisterOptions } from 'react-hook-form';

// Convert radio string values like "true"/"false" to boolean
export function booleanRadio<T>(): RegisterOptions<T> {
  return {
    setValueAs: (v: unknown) => {
      if (typeof v === 'boolean') return v;
      if (v === 'true' || v === '1') return true;
      return false;
    },
  } as RegisterOptions<T>;
}

// Parse checkbox values to boolean
export function booleanCheckbox<T>(): RegisterOptions<T> {
  return {
    setValueAs: (v: unknown) => Boolean(v),
  } as RegisterOptions<T>;
}

// Parse numeric input strings to numbers
export function numberValue<T>(): RegisterOptions<T> {
  return {
    setValueAs: (v: unknown) => {
      if (v === '' || v === null || v === undefined) return undefined;
      return Number(v);
    },
  } as RegisterOptions<T>;
}
