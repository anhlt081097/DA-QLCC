import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../../shared/component/not-found/not-found.component";
import { ListEmployeeComponent } from "./employee/employer.component";
import { ManageUserComponent } from "./manage-user.component";
import { MemberComponent } from "./member/member.component";
import { ProfileComponent } from "./profile/profile.component";
import { AdminGuard } from "../../shared/guard/admin.guard";
import { DetailEmployeeComponent } from "./employee/detail-employee/detail-employee.component";

const routes: Routes = [
  {
    path: "",
    component: ManageUserComponent,
    children: [
      {
        path: "employee",
        component: ListEmployeeComponent,
        // canActivate: [AdminGuard],
      },
      {
        path: "member",
        component: MemberComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "detail/:id",
        component: DetailEmployeeComponent,
      },
      {
        path: "",
        redirectTo: "member",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUserRoutingModule {}
