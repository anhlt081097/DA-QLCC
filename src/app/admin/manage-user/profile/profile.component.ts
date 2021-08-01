import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { ProfileResponse } from "../../../shared/model/profile/profile.response";
import { ProfileService } from "../../../shared/service/profile.service";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

@Component({
  selector: "ngx-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileResponse: ProfileResponse;

  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.getUserById();
    this.profileResponse = {
      id: 1,
      userName: "toppdogg42",
      password: "string",
      email: "anhlt@gmail.com",
      firstName: "Lê",
      lastName: "Tuấn Anh",
      phone: "0967789822",
      address: "Ngọc Hoà - Chương Mỹ - Hà Nội",
      image:
        "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/167934949_1615809051961387_3833935916652416449_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=IohtC3jJCR8AX87NFDE&_nc_ht=scontent-hkg4-2.xx&oh=c8eb7d3875ec7c5a24a1fff423b45dcb&oe=60FB19E2",
      role: "admin",
      createdDate: "20/07/2021",
      sex: "Nam",
      enabled: false,
      status: false,
      dateOfBirth: "08/10/1992",
      id_creator: 1,
      id_homeStay: 1,
      homeStayName: "Mock",
    };
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
}
