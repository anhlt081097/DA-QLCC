import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { ProfileResponse } from "../../shared/model/profile/profile.response";
import { ProfileService } from "../../shared/service/profile.service";
import { EditProfileComponent } from "../../admin/manage-canho/profile/edit-profile/edit-profile.component";
import { OrderUserComponent } from "../component/order-user/order-user.component";

@Component({
  selector: "ngx-profile",
  templateUrl: "./profile-user.component.html",
  styleUrls: ["./profile-user.component.scss"],
})
export class ProfileUserComponent implements OnInit {
  profileResponse: ProfileResponse;

  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profileResponse = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  openEdit() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data: this.profileResponse,
      width: "750px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getUserById();
      }
    });
  }

  order() {
    const dialogRef = this.dialog.open(OrderUserComponent, {
      width: "1200px",
    });
  }
}
