import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';
import { RegisterRequest } from '../../shared/model/register/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest;
  registerForm: FormGroup;
  isError: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerRequest = {
      userName: null,
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      phone: null,
    };
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/),
      ]),
    }, this.passwordsMatchValidator);
  }

  private passwordsMatchValidator(form: FormGroup) {
    if (form.get('password') && form.get('confirmPassword')) {
        return form.get('password').value === form.get('confirmPassword').value ? null : { mismatch: true };
    }
    return null;
}

public noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.registerRequest.email = this.registerForm.get('email').value;
    this.registerRequest.userName = this.registerForm.get('username').value;
    this.registerRequest.password = this.registerForm.get('password').value;
    this.registerRequest.lastName = this.registerForm.get('lastname').value;
    this.registerRequest.firstName = this.registerForm.get('firstname').value;
    this.registerRequest.phone = this.registerForm.get('phone').value;

    this.authService.register(this.registerRequest).subscribe(
      (data) => {
        this.isError = false;
        this.router.navigate(['/login'], {
          queryParams: { registered: 'login' },
        });
      },
      (error) => {
        throwError(error);
        this.isError = true;
      }
    );
  }
}
