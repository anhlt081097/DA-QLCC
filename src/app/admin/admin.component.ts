import { Component } from "@angular/core";
import { AuthService } from "../shared/service/auth.service";

import { Admin_ITEMS } from "./admin-menu";
import { Employee_ITEMS } from "./employee-menu";
import { Staff_ITEMS } from "./staff-menu";
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
    if (getRole === "Staff_bql") {
      this.ActionMenu = this.menu;
    } else if (getRole === "User") {
      this.ActionMenu = this.menu2;
    } else if (getRole === "Admin") {
      this.ActionMenu = this.menu3;
    } else {
      return;
    }
  }

  menu = Staff_ITEMS;
  menu2 = Employee_ITEMS;
  menu3 = Admin_ITEMS;
}
