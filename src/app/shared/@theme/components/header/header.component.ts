import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMenuService,
  NbSidebarService,
  NbThemeService,
  NbWindowService,
} from "@nebular/theme";
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject, Subscription, throwError } from "rxjs";
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { UpdateProfileComponent } from "../../../component/update-profile/update-profile.component";
import { MatDialog } from "@angular/material/dialog";
import { NotHomestayComponent } from "../../../component/not-homestay/not-homestay.component";
import { ProfileService } from "../../../service/profile.service";
import { TranslateService } from "@ngx-translate/core";
import { DialogSubmitLockComponent } from "../../../component/dialog-submit-lock/dialog-submit-lock.component";
import { ProfileResponse } from "../../../model/profile/profile.response";
import { SearchOrderComponent } from "../../../../user/component/search-order/search-order.component";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userName: string;
  action: string;
  image: string;
  role: string;
  test: Subscription;

  themes = [
    {
      value: "default",
      name: "Trắng",
    },
    {
      value: "dark",
      name: "Đen",
    },
    {
      value: "cosmic",
      name: "Tím",
    },
    {
      value: "corporate",
      name: "Trắng nhẹ",
    },
  ];

  currentTheme = "default";

  userMenu = [{ title: "Trang cá nhân" }, { title: "Đăng xuất" }];
  userMenu2 = [
    { title: "Đăng nhập" },
    { title: "Đăng ký" },
    { title: "Tra cứu đơn" },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private profileService: ProfileService,
    public translateService: TranslateService
  ) {
    translateService.addLangs(["en", "vn"]);
    translateService.setDefaultLang("vn");
    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|vn/) ? browserLang : "vn");
  }

  ngOnInit() {
    this.authService.username.subscribe(
      (data: string) => (this.userName = data)
    );

    this.authService.image.subscribe((data: string) => (this.image = data));
    this.authService.role.subscribe((data: string) => (this.role = data));
    this.image = this.authService.getImage();
    this.role = this.authService.getRole();
    this.userName = this.authService.getUserName();

    // if (this.userName) {
    //   this.authService.checkAccount().subscribe(
    //     (data) => {
    //       if (data === "EmployeeNot") {
    //         this.openWindowNotHomeStayForm();
    //       } else if (data === "Employee") {
    //         this.openWindowUpdateForm();
    //       } else if (data === "Admin") {
    //         this.openWindowUpdateForm();
    //       } else if (data === "Member") {
    //         this.openWindowUpdateForm();
    //       } else {
    //       }
    //     },
    //     (error) => {
    //       throwError(error);
    //     }
    //   );
    // }

    this.currentTheme = this.themeService.currentTheme;

    this.test = this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === "my-context-menu"),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        if (title === "Đăng xuất") {
          this.logout();
        } else if (title === "Trang cá nhân") {
          if (this.role === "Member") {
            this.router.navigateByUrl("/user/profile");
          } else {
            this.router.navigateByUrl("/admin/manage-canho/profile");
          }
        } else if (title === "Đăng nhập") {
          this.router.navigateByUrl("/login");
        } else if (title === "Đăng ký") {
          this.router.navigateByUrl("/register");
        } else if (title === "Tra cứu đơn") {
          this.openSeachBook();
        }
      });

    this.themeService
      .onThemeChange()
      .pipe(map(({ name }) => name))
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.test.unsubscribe();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  openWindowUpdateForm() {
    this.dialog.open(UpdateProfileComponent);
  }

  openWindowNotHomeStayForm() {
    this.dialog.open(NotHomestayComponent, { disableClose: true });
  }

  private openSeachBook() {
    this.dialog.open(SearchOrderComponent, { width: "1000px" });
  }
}
