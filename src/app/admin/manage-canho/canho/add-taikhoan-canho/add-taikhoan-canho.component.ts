import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TaiKhoan } from "../../../../shared/model/taikhoan/taikhoan";
import { ToastService } from "../../../../shared/service/toast.service";

@Component({
  selector: "ngx-add-taikhoan-canho",
  templateUrl: "./add-taikhoan-canho.component.html",
  styleUrls: ["./add-taikhoan-canho.component.scss"],
})
export class AddTaikhoanCanhoComponent implements OnInit {
  taiKhoan: TaiKhoan;
  taiKhoanForm: FormGroup;
  isError: boolean;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddTaikhoanCanhoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.taiKhoan = {
      id: undefined,
      email: undefined,
      password: undefined,
      username: undefined,
      enabled: undefined,
      created: undefined,
    };
    this.taiKhoanForm = new FormGroup(
      {
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null),
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
    this.taiKhoan.email = this.taiKhoanForm.get("email").value;
    this.taiKhoan.username = this.taiKhoanForm.get("username").value;
    this.taiKhoan.password = this.taiKhoanForm.get("password").value;
    this.taiKhoan.enabled = false;
    console.log(this.taiKhoan);
    // this.authService.register(this.registerRequest).subscribe(
    //   (data) => {
    //     this.isError = false;
    //     this.router.navigate(['/login'], {
    //       queryParams: { registered: 'login' },
    //     });
    //   },
    //   (error) => {
    //     throwError(error);
    //     this.isError = true;
    //   }
    // );
  }
}
