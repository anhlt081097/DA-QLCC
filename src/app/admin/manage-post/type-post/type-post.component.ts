import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { AuthService } from "../../../shared/service/auth.service";
import { TypePostResponse } from "../../../shared/model/type-post/type-post-response";
import { TypePostService } from "../../../shared/service/type-post.service";
import { AddEditTypePostComponent } from "./add-edit-type-post/add-edit-type-post.component";
import { DialogDeleteSubmitComponent } from "../../../shared/component/dialog-submit-delete/dialog-submit-delete.component";
import { ToastService } from "../../../shared/service/toast.service";

@Component({
  selector: "ngx-type-post",
  templateUrl: "./type-post.component.html",
  styleUrls: ["./type-post.component.scss"],
})
export class TypePostComponent implements OnInit {
  typePosts: TypePostResponse[];
  auth: boolean = false;
  constructor(
    private typePostService: TypePostService,
    private toastrService: ToastService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    if (this.authService.getRole() === "ROLE_ADMIN") {
      this.auth = true;
    }
  }

  ngOnInit(): void {
    this.getAllTypePost();
  }

  getAllTypePost() {
    this.typePostService.getAllTypePost().subscribe(
      (data) => {
        this.typePosts = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  addTypePost() {
    const dialogRef = this.dialog.open(AddEditTypePostComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTypePost();
      }
    });
  }

  editTypePost(idTypePost) {
    const dialogRef = this.dialog.open(AddEditTypePostComponent, {
      data: idTypePost,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTypePost();
      }
    });
  }

  deleteType(id) {
    const dialogRef = this.dialog.open(DialogDeleteSubmitComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.typePostService.deleteTypePost(id).subscribe(
          (data) => {
            this.getAllTypePost();
            this.toastrService.showToast(
              "success",
              "Thành công",
              "Xóa thành công"
            );
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast("danger", "Thất bại", "Xóa thất bại");
          }
        );
      }
    });
  }
}
