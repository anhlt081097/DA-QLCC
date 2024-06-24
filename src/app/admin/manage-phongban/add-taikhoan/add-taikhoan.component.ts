import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { TaiKhoan } from "../../../shared/model/taikhoan/taikhoan";
import { AuthService } from "../../../shared/service/auth.service";
import { BoPhanService } from "../../../shared/service/boPhan/bo-phan.service";
import { ToastService } from "../../../shared/service/toast.service";

@Component({
  selector: "ngx-add-taikhoan",
  templateUrl: "./add-taikhoan.component.html",
  styleUrls: ["./add-taikhoan.component.scss"],
})
export class AddTaikhoanComponent implements OnInit {
  taiKhoan: any;
  taiKhoanForm: FormGroup;
  isError: boolean;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddTaikhoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.taiKhoan = {
      id: undefined,
      email: undefined,
      password: undefined,
      username: undefined,
      enabled: undefined,
      created: undefined,
      role: undefined,
      image: undefined,
    };
    this.taiKhoanForm = new FormGroup(
      {
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null),
        image: new FormControl(null),
      },
      this.passwordsMatchValidator
    );
  }
  private passwordsMatchValidator(form: FormGroup) {
    if (form.get("password") && form.get("confirmPassword")) {
      return form.get("password").value === form.get("confirmPassword").value
        ? null
        : { mismatch: true };
    }
    return null;
  }
  createTaiKhoan() {
    if (this.taiKhoanForm.invalid) {
      return;
    }
    //https://firebasestorage.googleapis.com/v0/b/angular-56426.appspot.com/o/test%2F1629284253249_71287.jpg?alt=media&token=f0133c71-a906-41a9-9fd9-452deaa356dd
    this.taiKhoan.image = this.taiKhoanForm.get("image").value;
    this.taiKhoan.email = this.taiKhoanForm.get("email").value;
    this.taiKhoan.username = this.taiKhoanForm.get("username").value;
    this.taiKhoan.password = this.taiKhoanForm.get("password").value;
    this.taiKhoan.enabled = false;
    this.taiKhoan.role = "Staff_bql";
    console.log(this.taiKhoan);
    this.authService.createTaiKhoan(this.taiKhoan).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thêm thành công"
        );
        this.isError = false;
      },
      (error) => {
        throwError(error);
        this.isError = true;
      }
    );
  }
  getImage(url: string) {
    this.taiKhoanForm.get("image").setValue(url);
  }
}
