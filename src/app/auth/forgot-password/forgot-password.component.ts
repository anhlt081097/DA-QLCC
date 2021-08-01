import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { ForgotPasswordRequest } from '../../shared/model/forgot-password/forgot-password-request';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordRequest: ForgotPasswordRequest;
  forgotPasswordForm: FormGroup;
  isError: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
     this.forgotPasswordRequest = {
      email: ''
    };
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
     });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.forgotPasswordRequest.email = this.forgotPasswordForm.get('email').value;
    this.authService.forgotPassword(this.forgotPasswordRequest)
      .subscribe(data => {
        this.isError= false;
        this.router.navigate(['/login'],
          { queryParams: { registered: 'forgot' } });
      }, error => {
        console.log(error);
        this.isError= true;
      });
  }

}
