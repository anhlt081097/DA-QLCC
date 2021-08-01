import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";

import { AdminComponent } from "./admin.component";
import { DashboardModule } from "../shared/component/module/dashboard/dashboard.module";
import { ECommerceModule } from "../shared/component/module/e-commerce/e-commerce.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { ComponentModule } from "../shared/component/component.module";
import { ThemeModule } from "../shared/@theme/theme.module";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    ThemeModule,
    MatIconModule,
  ],
  declarations: [AdminComponent],
})
export class AdminModule {}
