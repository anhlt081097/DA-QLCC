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
export class AdminGuard implements CanActivate {
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

    if (isAuthenticated && getRole === "Admin") {
      return true;
    } else if (isAuthenticated && getRole === "User") {
      this.router.navigateByUrl("/admin/manage-house");
    } else {
      this.router.navigateByUrl("/user");
    }
  }
}
