import { Component } from "@angular/core";
import { AuthService } from "../shared/service/auth.service";

import { Admin_ITEMS } from "./admin-menu";
import { Employee_ITEMS } from "./employee-menu";

@Component({
  selector: "admin-root",
  styleUrls: ["admin.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="ActionMenu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class AdminComponent {
  ActionMenu: any;

  constructor(private authService: AuthService) {
    const getRole = this.authService.getRole();
    this.ActionMenu = this.menu;
    if (getRole === "ROLE_ADMIN") {
      this.ActionMenu = this.menu;
    } else if (getRole === "ROLE_USER") {
      this.ActionMenu = this.menu2;
    } else {
      return;
    }
  }

  menu = Admin_ITEMS;
  menu2 = Employee_ITEMS;
}
