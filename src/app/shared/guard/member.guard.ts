import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class MemberGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.authService.isLoggedIn();
    const getRole = this.authService.getRole();

    if (isAuthenticated && getRole === "Staff_bql") {
      this.router.navigateByUrl("/admin");
    } else if (isAuthenticated && getRole === "User") {
      this.router.navigateByUrl("/admin");
    } else if (isAuthenticated && getRole === "Member") {
      return true;
    } else {
      this.router.navigateByUrl("/login");
    }
  }
}
