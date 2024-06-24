import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { LoginRequest } from "../model/login/login-request";
import { LoginResponse } from "../model/login/login-response";
import { map, tap } from "rxjs/operators";
import { RegisterRequest } from "../model/register/register-request";
import { LocalStorageService } from "ngx-webstorage";
import { ForgotPasswordRequest } from "../model/forgot-password/forgot-password-request";
import { ResetPasswordRequest } from "../model/reset-password/reset-password.-request";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  @Output() image: EventEmitter<string> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() role: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>("/api/auth/login", loginRequest).pipe(
      map((data) => {
        this.localStorage.store("image", data.image);
        this.localStorage.store("userName", data.username);
        this.localStorage.store("refreshToken", data.refreshToken);
        this.localStorage.store("expiresAt", data.expiresAt);
        this.localStorage.store(
          "authenticationToken",
          data.authenticationToken
        );
        this.localStorage.store("role", data.role);
        this.localStorage.store("idCanHo", data.idCanHo);
        this.localStorage.store("id", data.id);
        this.localStorage.store("email", data.email);
        this.username.emit(data.username);
        this.role.emit(data.role);
        this.image.emit(
          "https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png"
        );
        return true;
      })
    );
  }

  checkAccount(): Observable<any> {
    return this.http.get("/api/profile/check", { responseType: "text" });
  }

  refreshToken(): Observable<any> {
    this.refreshTokenPayload.userName = this.getUserName();
    this.refreshTokenPayload.refreshToken = this.getRefreshToken();
    return this.http
      .post<LoginResponse>("/api/auth/refresh/token", this.refreshTokenPayload)
      .pipe(
        tap((response) => {
          this.localStorage.clear("authenticationToken");
          this.localStorage.clear("expiresAt");

          this.localStorage.store(
            "authenticationToken",
            response.authenticationToken
          );
          this.localStorage.store("expiresAt", response.expiresAt);
        })
      );
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post("/api/auth/register", registerRequest, {
      responseType: "text",
    });
  }
  createTaiKhoan(registerRequest: any): Observable<any> {
    return this.http.post("/api/auth/register", registerRequest, {
      responseType: "text",
    });
  }
  createTaiKhoanCanHo(registerRequest: any): Observable<any> {
    return this.http.post("/api/auth/register2", registerRequest, {
      responseType: "text",
    });
  }
  confirmEmail(token: string): Observable<any> {
    return this.http.get("/api/auth/accountVerification/" + token, {
      responseType: "text",
    });
  }

  forgotPassword(
    forgotPasswordRequest: ForgotPasswordRequest
  ): Observable<any> {
    return this.http.post("/api/auth/forgotPassword", forgotPasswordRequest, {
      responseType: "text",
    });
  }

  resetPassword(token: string): Observable<any> {
    return this.http.get("/api/auth/passwordVerification/" + token, {
      responseType: "text",
    });
  }

  editPassword(resetPasswordRequest: any): Observable<any> {
    return this.http.post("/api/auth/editPassword", resetPasswordRequest, {
      responseType: "text",
    });
  }

  logout() {
    this.refreshTokenPayload.userName = this.getUserName();
    this.refreshTokenPayload.refreshToken = this.getRefreshToken();
    this.http
      .post("/api/auth/logout", this.refreshTokenPayload, {
        responseType: "text",
      })
      .subscribe(
        (data) => {},
        (error) => {
          throwError(error);
        }
      );
    this.localStorage.clear("authenticationToken");
    this.localStorage.clear("username");
    this.localStorage.clear("tokenType");
    this.localStorage.clear("refreshToken");
    this.localStorage.clear("role");
    this.localStorage.clear("image");
    this.localStorage.clear("idCanHo");
    this.localStorage.clear("id");
    this.localStorage.clear("email");
  }

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    userName: this.getUserName(),
  };

  getUserName() {
    return this.localStorage.retrieve("username");
  }

  getRefreshToken() {
    return this.localStorage.retrieve("refreshToken");
  }

  getJwtToken() {
    return this.localStorage.retrieve("authenticationToken");
  }

  getRole() {
    return this.localStorage.retrieve("role");
  }

  getImage() {
    return this.localStorage.retrieve("image");
  }
  getIdCanHo() {
    return this.localStorage.retrieve("idCanHo");
  }
  getId() {
    return this.localStorage.retrieve("id");
  }
  getEmail() {
    return this.localStorage.retrieve("email");
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
