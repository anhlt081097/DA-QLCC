import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, switchMap, take, filter } from "rxjs/operators";
import { AuthService } from "../service/auth.service";
import { LoginResponse } from "../model/login/login-response";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptor implements HttpInterceptor {
  //Nếu quá trình làm mới mã thông báo chưa bắt đầu,
  //thì isTokenRefreshing biến sẽ được đặt false theo mặc định và một null giá trị sẽ được gán cho refreshTokenSubject đối tượng.
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null); // BehaviorSubject ban đầu là null
  constructor(public authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf("refresh") !== -1 || req.url.indexOf("login") !== -1) {
      //Kiểm tra hết hạn
      return next.handle(req);
    }
    const jwtToken = this.authService.getJwtToken(); // lấy token thời điểm hiện tại
    if (jwtToken) {
      return next.handle(this.addToken(req, jwtToken)).pipe(
        catchError((error) => {
          // chạy lại vói token đó
          if (error instanceof HttpErrorResponse && error.status === 403) {
            // Nếu server có trả về lỗi hoặc lỗi 403
            return this.handleAuthErrors(req, next); //chạy  handleAuthErrors
          } else {
            return throwError(error);
          }
        })
      );
    }
    return next.handle(req); // chốt kết thúc quá trình xử lý
  }
  private handleAuthErrors(
    req: HttpRequest<any>,
    next: HttpHandler //Yêu cầu và xử lý http
  ): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      // nếu isTokenRefreshing tồn tại boolean false
      this.isTokenRefreshing = true; // đặt isTokenRefreshing true
      this.refreshTokenSubject.next(null); //Tẩy mảng BehaviorSubject
      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponse) => {
          //Lấy ra authenticationToken mới
          this.isTokenRefreshing = false; // đặt lại isTokenRefreshing false
          this.refreshTokenSubject.next(refreshTokenResponse.refreshToken); //đặt authenticationToken mới
          return next.handle(
            this.addToken(req, refreshTokenResponse.refreshToken)
          ); // trả lại trình xử lý thêm authenticationToken mới
        })
      );
    } else {
      // nếu isTokenRefreshing không tồn tại boolean false
      return this.refreshTokenSubject.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(
            this.addToken(req, this.authService.getJwtToken())
          ); //lấy lại refreshTokenSubject một lần nữa
        })
      );
    }
  }
  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set(
        "Authorization", //Thêm tiêu đề ủy quyền Authorization, Bearer với token
        "Bearer " + jwtToken
      ),
    });
  }
}
