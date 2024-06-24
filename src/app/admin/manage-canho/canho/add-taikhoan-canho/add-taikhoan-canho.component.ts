import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { TaiKhoan } from "../../../../shared/model/taikhoan/taikhoan";
import { AuthService } from "../../../../shared/service/auth.service";
import { ToastService } from "../../../../shared/service/toast.service";

@Component({
  selector: "ngx-add-taikhoan-canho",
  templateUrl: "./add-taikhoan-canho.component.html",
  styleUrls: ["./add-taikhoan-canho.component.scss"],
})
export class AddTaikhoanCanhoComponent implements OnInit {
  taiKhoan: any;
  taiKhoanForm: FormGroup;
  isError: boolean;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddTaikhoanCanhoComponent>,
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
      idCanHo: undefined,
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
  getImage(url: string) {
    this.taiKhoanForm.get("image").setValue(url);
  }
  createTaiKhoan() {
    if (this.taiKhoanForm.invalid) {
      return;
    }
    this.taiKhoan.idCanHo = this.data;
    this.taiKhoan.email = this.taiKhoanForm.get("email").value;
    this.taiKhoan.username = this.taiKhoanForm.get("username").value;
    this.taiKhoan.password = this.taiKhoanForm.get("password").value;
    this.taiKhoan.enabled = false;
    this.taiKhoan.role = "User";
    this.taiKhoan.image = this.taiKhoanForm.get("image").value;
    console.log(this.taiKhoan);
    this.authService.createTaiKhoanCanHo(this.taiKhoan).subscribe(
      (data) => {
        this.isError = false;
        this.dialogRef.close(true);
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thêm thành công"
        );
      },
      (error) => {
        throwError(error);
        this.isError = true;
      }
    );
  }
}
