import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { AuthService } from "../../../../shared/service/auth.service";
import { ProfileRequest } from "../../../../shared/model/profile/profile.request";
import { ProfileService } from "../../../../shared/service/profile.service";
import { ToastService } from "../../../../shared/service/toast.service";
import { LoginResponse } from "../../../../shared/model/login/login-response";
import { Console } from "console";
import { LocalStorageService } from "ngx-webstorage";

@Component({
  selector: "ngx-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  profileEditForm: FormGroup;
  passwordEditForm: FormGroup;
  profileRequest: any;
  loginResponse: LoginResponse;
  panelOpenState = false;
  hide = true;
  hide2 = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private profileService: ProfileService,
    private toastrService: ToastService,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.profileRequest = {
      id: undefined,
      password: null,
      passwordEdit: null,
      email: null,
      image: null,
    };
    this.profileEditForm = new FormGroup({
      id: new FormControl(null),
      image: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    this.passwordEditForm = new FormGroup(
      {
        id: new FormControl(null),
        password: new FormControl(null, Validators.required),
        passwordEdit: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(""),
      },
      this.passwordsMatchValidator
    );

    this.profileEditForm.patchValue(this.data);
    this.passwordEditForm.get("id").setValue(this.data.id);
  }

  private passwordsMatchValidator(form: FormGroup) {
    if (form.get("passwordEdit") && form.get("confirmPassword")) {
      return form.get("passwordEdit").value ===
        form.get("confirmPassword").value
        ? null
        : { mismatch: true };
    }
    return null;
  }

  updateProfile() {
    this.profileRequest.id = this.profileEditForm.get("id").value;
    this.profileRequest.image = this.profileEditForm.get("image").value;
    this.profileRequest.email = this.profileEditForm.get("email").value;
    this.localStorage.clear("email");
    this.localStorage.store("email", this.profileRequest.email);
    this.localStorage.clear("image");
    this.localStorage.store("image", this.profileRequest.image);
    console.log(this.profileRequest);
    this.profileService.editAccount(this.profileRequest).subscribe(
      (data) => {
        this.toastrService.showToast("success", "Thành công", "Sửa thành công");
        this.dialogRef.close(true);
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Sửa thất bại");
      }
    );
  }

  editPassword() {
    this.profileRequest.id = this.passwordEditForm.get("id").value;
    this.profileRequest.password = this.passwordEditForm.get("password").value;
    this.profileRequest.passwordEdit =
      this.passwordEditForm.get("passwordEdit").value;
    console.log(this.profileRequest);
    this.profileService.editAccountPass(this.profileRequest).subscribe(
      (data) => {
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Đổi mật khẩu thành công"
        );
        this.toastrService.showToast(
          "warning",
          "Thông báo",
          "Bạn sẽ phải đăng nhập lại !"
        );
        setTimeout(
          () => (
            this.authService.logout(), this.router.navigateByUrl("/login")
          ),
          4000
        );
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast(
          "danger",
          "Thất bại",
          "Đổi mật khẩu thất bại"
        );
      }
    );
  }

  getImage(url: string) {
    this.profileEditForm.get("image").setValue(url);
    console.log("hello");
    console.log(url);
  }
}
