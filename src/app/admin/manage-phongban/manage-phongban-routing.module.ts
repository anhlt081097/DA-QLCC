import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../../shared/component/not-found/not-found.component";
import { ManageHouseComponent } from "./manage-phongban.component";
import { PhongBanComponent } from "./phongBan/phongban.component";
import { EmployeeGuard } from "../../shared/guard/employee.guard";
import { NhanVienComponent } from "./nhan-vien/nhan-vien.component";
import { NhanVienProfileComponent } from "./nhan-vien-profile/nhan-vien-profile.component";
import { ListTaikhoanComponent } from "./list-taikhoan/list-taikhoan.component";

const routes: Routes = [
  {
    path: "",
    component: ManageHouseComponent,
    children: [
      {
        path: "phongBan",
        component: PhongBanComponent,
      },
      {
        path: "taiKhoan",
        component: ListTaikhoanComponent,
      },
      {
        path: "detail/:id",
        component: NhanVienComponent,
      },
      {
        path: "nhanvien-edit/:id",
        component: NhanVienProfileComponent,
      },
      {
        path: "",
        redirectTo: "phongBan",
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
export class ManageHouseRoutingModule {}
