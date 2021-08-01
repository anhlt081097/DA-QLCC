import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { ConfirmAccountEmailComponent } from "./auth/confirm-account-email/confirm-account-email.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { AuthGuard } from "./shared/guard/auth.guard";
import { ErrorComponent } from "./shared/component/error/error.component";
import { PaypalComponent } from "./shared/component/paypal/paypal.component";
import { MemberSharedGuard } from "./shared/guard/memberShared.guard";

export const routes: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    // canActivate: [AuthGuard],
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
    // canActivate: [MemberSharedGuard],
  },
  { path: "banking/:id", component: PaypalComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "accountVerification/:id", component: ConfirmAccountEmailComponent },
  { path: "passwordVerification/:id", component: ResetPasswordComponent },
  { path: "error/404", component: ErrorComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
