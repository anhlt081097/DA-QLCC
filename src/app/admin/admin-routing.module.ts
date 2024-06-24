import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "../shared/component/module/dashboard/dashboard.component";
import { ECommerceComponent } from "../shared/component/module/e-commerce/e-commerce.component";
import { NotFoundComponent } from "../shared/component/not-found/not-found.component";
import { AdminGuard } from "../shared/guard/admin.guard";
const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "manage-canho",
        loadChildren: () =>
          import("./manage-canho/manage-canho.module").then(
            (m) => m.ManageCanHoModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: "manage-dichvu",
        loadChildren: () =>
          import("./manage-dichvu/manage-dichvu.module").then(
            (m) => m.ManageHomeStayModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: "manage-hoadon",
        loadChildren: () =>
          import("./manage-hoadon/manage-hoadon.module").then(
            (m) => m.ManageUtilityModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: "manage-phongban",
        loadChildren: () =>
          import("./manage-phongban/manage-phongban.module").then(
            (m) => m.ManageHouseModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: "manage-post",
        loadChildren: () =>
          import("./manage-post/manage-post.module").then(
            (m) => m.ManagePostModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: "manage-statistics",
        loadChildren: () =>
          import("./manage-statistics/manage-statistics.module").then(
            (m) => m.ManageStatisticsModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: "dashboard",
        component: ECommerceComponent,
      },
      {
        path: "iot-dashboard",
        component: DashboardComponent,
      },
      {
        path: "layout",
        loadChildren: () =>
          import("../shared/component/module/layout/layout.module").then(
            (m) => m.LayoutModule
          ),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("../shared/component/module/forms/forms.module").then(
            (m) => m.FormsModule
          ),
      },
      {
        path: "ui-features",
        loadChildren: () =>
          import(
            "../shared/component/module/ui-features/ui-features.module"
          ).then((m) => m.UiFeaturesModule),
      },
      {
        path: "modal-overlays",
        loadChildren: () =>
          import(
            "../shared/component/module/modal-overlays/modal-overlays.module"
          ).then((m) => m.ModalOverlaysModule),
      },
      {
        path: "extra-components",
        loadChildren: () =>
          import(
            "../shared/component/module/extra-components/extra-components.module"
          ).then((m) => m.ExtraComponentsModule),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("../shared/component/module/charts/charts.module").then(
            (m) => m.ChartsModule
          ),
      },
      {
        path: "",
        redirectTo: "manage-statistics",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
