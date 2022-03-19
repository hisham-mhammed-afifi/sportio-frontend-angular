import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbidden(name: RegExp): ValidatorFn {
  return (control: AbstractControl) => {
    const isForbidden = name.test(control.value);
    return isForbidden ? { forbidden: { value: control.value } } : null;
  };
}
