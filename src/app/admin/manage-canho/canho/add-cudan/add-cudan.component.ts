import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { CanHo } from "../../../../shared/model/canHo/canho";
import { CuDan } from "../../../../shared/model/cuDan/cudan";
import { ProfileRequest } from "../../../../shared/model/profile/profile.request";
import { AuthService } from "../../../../shared/service/auth.service";
import { CanhoService } from "../../../../shared/service/canHo/canho.service";
import { CudanService } from "../../../../shared/service/cuDan/cudan.service";
import { ProfileService } from "../../../../shared/service/profile.service";
import { ToastService } from "../../../../shared/service/toast.service";

@Component({
  selector: "ngx-add-cudan",
  templateUrl: "./add-cudan.component.html",
  styleUrls: ["./add-cudan.component.scss"],
})
export class AddCudanComponent implements OnInit {
  profileEditForm: FormGroup;
  passwordEditForm: FormGroup;
  profileRequest: ProfileRequest;
  panelOpenState = false;
  hide = true;
  hide2 = true;
  cuDan: CuDan;
  cuDanAddForm: FormGroup;
  cuDanEditForm: FormGroup;
  canHo: CanHo;
  typeAction: string;
  readonly: boolean = false;
  role: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<AddCudanComponent>,
    private profileService: ProfileService,
    private toastrService: ToastService,
    private authService: AuthService,
    private router: Router,
    private cuDanService: CudanService,
    private canHoService: CanhoService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    if (this.role == "User") {
      this.readonly = true;
    }
    this.typeAction = this.data.type;
    this.cuDan = {
      id: undefined,
      hoTen: null,
      gioiTinh: null,
      ngaySinh: null,
      soCCCD: null,
      diaChi: null,
      hinhAnh: null,
      soDienThoai: null,
      email: null,
      chuCanHo: null,
      canHo: null,
    };

    this.cuDanAddForm = new FormGroup({
      id: new FormControl(null),
      hoTen: new FormControl(null, Validators.required),
      gioiTinh: new FormControl(null, Validators.required),
      ngaySinh: new FormControl(null, Validators.required),
      soCCCD: new FormControl(null, Validators.required),
      diaChi: new FormControl(null, Validators.required),
      hinhAnh: new FormControl(null),
      soDienThoai: new FormControl(null, [
        Validators.required,
        Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    this.cuDanEditForm = new FormGroup({
      id: new FormControl(null),
      hoTen: new FormControl(null, Validators.required),
      gioiTinh: new FormControl(null, Validators.required),
      ngaySinh: new FormControl(null, Validators.required),
      soCCCD: new FormControl(null, Validators.required),
      diaChi: new FormControl(null, Validators.required),
      hinhAnh: new FormControl(null),
      soDienThoai: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    if (this.data.id) {
      this.canHoService.getCanHoById(this.data.id).subscribe(
        (data) => {
          this.canHo = data;
        },
        (error) => {
          throwError(error);
        }
      );
    }
    // this.passwordEditForm = new FormGroup(
    //   {
    //     id: new FormControl(null),
    //     password: new FormControl(null, Validators.required),
    //     passwordEdit: new FormControl(null, Validators.required),
    //     confirmPassword: new FormControl(""),
    //   },
    //   this.passwordsMatchValidator
    // );

    if (this.data.dataCuDan) {
      // this.data.dataCuDan.ngaySinh = this.convertDateToTimeStamp(
      //   this.data.dataCuDan.ngaySinh
      // );
      this.cuDanEditForm.patchValue(this.data.dataCuDan);
    }
    // this.passwordEditForm.get("id").setValue(this.data.id);
  }
  // convertDateToTimeStamp(date: any) {
  //   const ngaySinh = date[2] + "/" + date[1] + "/" + date[0];
  //   return ngaySinh;
  // }
  // private passwordsMatchValidator(form: FormGroup) {
  //   if (form.get("passwordEdit") && form.get("confirmPassword")) {
  //     return form.get("passwordEdit").value ===
  //       form.get("confirmPassword").value
  //       ? null
  //       : { mismatch: true };
  //   }
  //   return null;
  // }
  createCuDan() {
    this.cuDan.hoTen = this.cuDanAddForm.get("hoTen").value;
    this.cuDan.gioiTinh = this.cuDanAddForm.get("gioiTinh").value;
    this.cuDan.ngaySinh = this.cuDanAddForm.get("ngaySinh").value;
    this.cuDan.soCCCD = this.cuDanAddForm.get("soCCCD").value;
    this.cuDan.diaChi = this.cuDanAddForm.get("diaChi").value;
    this.cuDan.hinhAnh = this.cuDanAddForm.get("hinhAnh").value;
    this.cuDan.soDienThoai = this.cuDanAddForm.get("soDienThoai").value;
    this.cuDan.email = this.cuDanAddForm.get("email").value;
    this.cuDan.chuCanHo = false;
    this.cuDan.canHo = this.canHo;
    this.cuDanService.createCuDan(this.cuDan).subscribe(
      (data) => {
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thêm thành công"
        );
        this.dialogRef.close(true);
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Thêm thất bại");
      }
    );
  }
  updateCuDan() {
    this.cuDan.id = this.data.dataCuDan.id;
    this.cuDan.hoTen = this.cuDanEditForm.get("hoTen").value;
    this.cuDan.gioiTinh = this.cuDanEditForm.get("gioiTinh").value;
    this.cuDan.ngaySinh = this.cuDanEditForm.get("ngaySinh").value;
    this.cuDan.soCCCD = this.cuDanEditForm.get("soCCCD").value;
    this.cuDan.diaChi = this.cuDanEditForm.get("diaChi").value;
    this.cuDan.hinhAnh = this.cuDanEditForm.get("hinhAnh").value;
    this.cuDan.soDienThoai = this.cuDanEditForm.get("soDienThoai").value;
    this.cuDan.email = this.cuDanEditForm.get("email").value;
    this.cuDan.chuCanHo = this.data.dataCuDan.chuCanHo;
    this.cuDan.canHo = this.canHo;
    this.cuDanService.updateCuDan(this.cuDan).subscribe(
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
  createChuSoHuu() {
    this.cuDan.hoTen = this.cuDanAddForm.get("hoTen").value;
    this.cuDan.gioiTinh = this.cuDanAddForm.get("gioiTinh").value;
    this.cuDan.ngaySinh = this.cuDanAddForm.get("ngaySinh").value;
    this.cuDan.soCCCD = this.cuDanAddForm.get("soCCCD").value;
    this.cuDan.diaChi = this.cuDanAddForm.get("diaChi").value;
    this.cuDan.hinhAnh = this.cuDanAddForm.get("hinhAnh").value;

    // "https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png";
    this.cuDan.soDienThoai = this.cuDanAddForm.get("soDienThoai").value;
    this.cuDan.email = this.cuDanAddForm.get("email").value;
    this.cuDan.chuCanHo = true;
    this.cuDan.canHo = this.canHo;
    this.cuDanService.createCuDan(this.cuDan).subscribe(
      (data) => {
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thêm thành công"
        );
        this.dialogRef.close(true);
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Thêm thất bại");
      }
    );
  }
  // updateProfile() {
  //   this.profileRequest.id = this.profileEditForm.get("id").value;
  //   this.profileRequest.firstName = this.profileEditForm.get("firstName").value;
  //   this.profileRequest.lastName = this.profileEditForm.get("lastName").value;
  //   this.profileRequest.address = this.profileEditForm.get("address").value;
  //   this.profileRequest.dateOfBirth =
  //     this.profileEditForm.get("dateOfBirth").value;
  //   this.profileRequest.sex = this.profileEditForm.get("sex").value;
  //   this.profileRequest.image = this.profileEditForm.get("image").value;
  //   this.profileRequest.phone = this.profileEditForm.get("phone").value;
  //   this.profileRequest.email = this.profileEditForm.get("email").value;

  //   this.profileService.editProfile(this.profileRequest).subscribe(
  //     (data) => {
  //       this.toastrService.showToast("success", "Thành công", "Sửa thành công");
  //       this.dialogRef.close(true);
  //     },
  //     (error) => {
  //       throwError(error);
  //       this.toastrService.showToast("danger", "Thất bại", "Sửa thất bại");
  //     }
  //   );
  // }
  getImage(url: string) {
    this.cuDanAddForm.get("hinhAnh").setValue(url);
  }
  getImageEdit(url: string) {
    this.cuDanEditForm.get("hinhAnh").setValue(url);
  }
  // editPassword() {
  //   this.profileRequest.id = this.passwordEditForm.get("id").value;
  //   this.profileRequest.password = this.passwordEditForm.get("password").value;
  //   this.profileRequest.passwordEdit =
  //     this.passwordEditForm.get("passwordEdit").value;

  //   this.profileService.editPassword(this.profileRequest).subscribe(
  //     (data) => {
  //       this.toastrService.showToast(
  //         "success",
  //         "Thành công",
  //         "Đổi mật khẩu thành công"
  //       );
  //       this.toastrService.showToast(
  //         "warning",
  //         "Thông báo",
  //         "Bạn sẽ phải đăng nhập lại !"
  //       );
  //       setTimeout(
  //         () => (
  //           this.authService.logout(), this.router.navigateByUrl("/login")
  //         ),
  //         4000
  //       );
  //     },
  //     (error) => {
  //       throwError(error);
  //       this.toastrService.showToast(
  //         "danger",
  //         "Thất bại",
  //         "Đổi mật khẩu thất bại"
  //       );
  //     }
  //   );
  // }
}
