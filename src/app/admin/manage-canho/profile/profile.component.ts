import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { CanHo } from "../../../shared/model/canHo/canho";
import { LoginResponse } from "../../../shared/model/login/login-response";
import { ProfileResponse } from "../../../shared/model/profile/profile.response";
import { AuthService } from "../../../shared/service/auth.service";
import { CanhoService } from "../../../shared/service/canHo/canho.service";
import { ProfileService } from "../../../shared/service/profile.service";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

@Component({
  selector: "ngx-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileResponse: ProfileResponse;
  canHo: any;
  loginResponse: LoginResponse;
  role: any;
  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog,
    private authService: AuthService,
    private canHoService: CanhoService
  ) {}

  ngOnInit(): void {
    // this.getUserById();
    this.loginResponse = {
      id: undefined,
      idCanHo: null,
      email: null,
      image: null,
      username: null,
      authenticationToken: null,
      expiresAt: null,
      refreshToken: null,
      role: null,
    };
    this.loginResponse.id = this.authService.getId();
    this.loginResponse.idCanHo = this.authService.getIdCanHo();
    this.loginResponse.email = this.authService.getEmail();
    this.loginResponse.image = this.authService.getImage();
    this.loginResponse.username = this.authService.getUserName();
    this.role = this.authService.getRole();
    if (this.role == "User") {
      this.getCanHoById();
    }
  }
  getCanHoById() {
    this.canHoService.getCanHoById(this.loginResponse.idCanHo).subscribe(
      (canHo) => {
        this.canHo = canHo;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  openEdit() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data: this.loginResponse,
      width: "750px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.ngOnInit();
      }
    });
  }
}
