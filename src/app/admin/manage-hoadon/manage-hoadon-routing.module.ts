import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../../shared/component/not-found/not-found.component";
import { HoaDonListComponent } from "./type-utility/hoadon-list.component";
import { ManageUntilityComponent } from "./manage-hoadon.component";

const routes: Routes = [
  {
    path: "",
    component: ManageUntilityComponent,
    children: [
      {
        path: "hoadon-list",
        component: HoaDonListComponent,
      },
      {
        path: "",
        redirectTo: "hoadon-list",
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
export class ManageUntilitRoutingModule {}
