import { AbstractControl } from '@angular/forms';

export function confirmPasswordValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.untouched || confirmPassword?.untouched) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value
    ? { misMatch: true }
    : null;
}
