import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from 'src/app/custom/password.validator';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z_ ]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validator: confirmPasswordValidator }
  );

  constructor(
    private fb: FormBuilder,
    private _usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this._usersService.register(this.registerForm.value).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['/login']);
  }

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  isInvalid(control: any) {
    return control && control.touched && control.invalid;
  }
  isValid(control: any) {
    return control && control.touched && control.valid;
  }
}
