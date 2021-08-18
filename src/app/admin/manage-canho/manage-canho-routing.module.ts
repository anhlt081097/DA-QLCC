import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../../shared/component/not-found/not-found.component";
import { CanHoComponent } from "./canho/canho.component";
import { ManageCanHoComponent } from "./manage-canho.component";
import { ThePhuongTienComponent } from "./the-phuongtien/the-phuongtien.component";
import { ProfileComponent } from "./profile/profile.component";
import { AdminGuard } from "../../shared/guard/admin.guard";
import { DetailEmployeeComponent } from "./canho/detail-canho/detail-canho.component";

const routes: Routes = [
  {
    path: "",
    component: ManageCanHoComponent,
    children: [
      {
        path: "canho",
        component: CanHoComponent,
        // canActivate: [AdminGuard],
      },
      {
        path: "the-phuongtien",
        component: ThePhuongTienComponent,
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
export class ManageCanHoRoutingModule {}
