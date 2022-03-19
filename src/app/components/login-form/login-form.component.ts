import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { confirmPasswordValidator } from 'src/app/custom/password.validator';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  // isAdmin = new BehaviorSubject<boolean>(false);
  wrong: boolean = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private _usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(e: any) {
    this._usersService.login(this.loginForm.value).subscribe(
      (result: any) => {
        console.log(result);

        sessionStorage.setItem('token', result.token);
        const decoded: { role: string } = jwt_decode(result.token!);
        if (decoded.role === 'admin') {
          this._usersService.setLoggedIn(true);
          this._usersService.setAdmin(true);
        } else {
          this._usersService.setLoggedIn(true);
        }
        this.router.navigate(['/']);
      },
      (err) => {
        if (err.status == 404) {
          e.preventDefault();
          this.wrong = true;
        }
        console.log('Error Getting Location: ', err);
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  isInvalid(control: any) {
    return control && control.touched && control.invalid;
  }
  isValid(control: any) {
    return control && control.touched && control.valid;
  }
}
