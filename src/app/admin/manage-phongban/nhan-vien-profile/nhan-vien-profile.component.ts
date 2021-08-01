import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { ProfileResponse } from "../../../shared/model/profile/profile.response";
import { ProfileService } from "../../../shared/service/profile.service";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

@Component({
  selector: "ngx-nhan-vien-profile",
  templateUrl: "./nhan-vien-profile.component.html",
  styleUrls: ["./nhan-vien-profile.component.scss"],
})
export class NhanVienProfileComponent implements OnInit {
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
        "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/161506894_1606686932873599_4183308946398566952_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=3j5A-FTRLF4AX8CpD40&tn=bKpZwZEgUKAWPVdP&_nc_ht=scontent-hkg4-1.xx&oh=ade5a6224fc31c65d6ee369c937f87f4&oe=60FBD51F",
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
