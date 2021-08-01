import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { ErrorComponent } from "../shared/component/error/error.component";
import { ProfileUserComponent } from "./profile/profile-user.component";
import { MemberGuard } from "../shared/guard/member.guard";
import { HomestayUserComponent } from "./homestay-user/homestay-user.component";
import { HouseUserComponent } from "./house-user/house-user.component";
import { DetailHouseUserComponent } from "./detail-house-user/detail-house-user.component";
import { PostUserComponent } from "./post-user/post-user.component";
import { DetailPostUserComponent } from "./detail-post-user/detail-post-user.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "about",
        component: AboutComponent,
      },
      {
        path: "contact",
        component: ContactComponent,
      },
      {
        path: "profile",
        component: ProfileUserComponent,
        // canActivate: [MemberGuard],
      },
      {
        path: "homestay",
        component: HomestayUserComponent,
      },
      {
        path: "house",
        component: HouseUserComponent,
      },
      {
        path: "post",
        component: PostUserComponent,
      },
      {
        path: "house/:id",
        component: HouseUserComponent,
      },
      {
        path: "post/:id",
        component: DetailPostUserComponent,
      },
      {
        path: "house/detail/:id",
        component: DetailHouseUserComponent,
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "**",
        component: ErrorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
