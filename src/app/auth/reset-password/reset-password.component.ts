import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { throwError } from "rxjs";
import { AuthService } from "../../shared/service/auth.service";
import { ResetPasswordResponse } from "../../shared/model/reset-password/reset-password-response";
import { ResetPasswordRequest } from "../../shared/model/reset-password/reset-password.-request";

@Component({
  selector: "app-rest-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  resetPasswordRequest: any;
  resetPasswordResponse: ResetPasswordResponse;
  resetPasswordForm: FormGroup;
  isError: boolean = false;
  username: string;

  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.activateRoute.snapshot.params.id;
    this.authService.resetPassword(this.token).subscribe(
      (data) => {
        this.username = data;
      },
      (error) => {
        this.router.navigateByUrl("error/404");
        throwError(error);
      }
    );
    this.resetPasswordRequest = {
      username: "",
      password: "",
    };
    this.resetPasswordForm = new FormGroup(
      {
        password: new FormControl("", Validators.required),
        confirmPassword: new FormControl(""),
      },
      this.passwordsMatchValidator
    );
  }

  private passwordsMatchValidator(form: FormGroup) {
    if (form.get("password") && form.get("confirmPassword")) {
      return form.get("password").value === form.get("confirmPassword").value
        ? null
        : { mismatch: true };
    }
    return null;
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.resetPasswordRequest.password =
      this.resetPasswordForm.get("password").value;
    this.resetPasswordRequest.username = this.username;
    console.log(this.resetPasswordRequest);
    this.authService.editPassword(this.resetPasswordRequest).subscribe(
      (data) => {
        this.isError = false;
        this.router.navigate(["/login"], {
          queryParams: { registered: "reset" },
        });
      },
      (error) => {
        this.isError = true;
        throwError(error);
      }
    );
  }
}
