import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { throwError } from "rxjs";
import { AuthService } from "../../shared/service/auth.service";
import { LoginRequest } from "../../shared/model/login/login-request";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequest: LoginRequest;
  loginSuccessMessage: string = "";
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginRequest = {
      username: null,
      password: null,
    };

    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === "login") {
        this.loginSuccessMessage =
          "Đăng ký thành công, vui lòng kiểm tra email để kích hoạt tài khoản!";
      }
      if (params.registered !== undefined && params.registered === "forgot") {
        this.loginSuccessMessage =
          "Mã xác nhận đã được gửi, vui lòng kiểm tra email để đặt lại mật khẩu tài khoản!";
      }
      if (params.registered !== undefined && params.registered === "reset") {
        this.loginSuccessMessage =
          "Đặt lại mật khẩu thành công, vui lòng đăng nhập lại để kiểm tra tài khoản!";
      }
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginRequest.username = this.loginForm.get("username").value;
    this.loginRequest.password = this.loginForm.get("password").value;
    this.authService.login(this.loginRequest).subscribe(
      (data) => {
        this.isError = false;
        this.router.navigateByUrl("admin");
      },
      (error) => {
        this.isError = true;
        throwError(error);
      }
    );
  }
}
