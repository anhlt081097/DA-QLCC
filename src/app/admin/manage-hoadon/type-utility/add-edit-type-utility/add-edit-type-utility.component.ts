import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { TypeUtilityRequest } from "../../../../shared/model/type-utility/type-utility-request";
import { TypeUtilityService } from "../../../../shared/service/type-utility.service";
import { ToastService } from "../../../../shared/service/toast.service";
import { DichvuService } from "../../../../shared/service/dichVu/dichvu.service";
import { BoPhanService } from "../../../../shared/service/boPhan/bo-phan.service";
import { CanhoService } from "../../../../shared/service/canHo/canho.service";

@Component({
  selector: "ngx-add-edit-type-utility",
  templateUrl: "./add-edit-type-utility.component.html",
  styleUrls: ["./add-edit-type-utility.component.scss"],
})
export class AddEditTypeUtilityComponent implements OnInit {
  hoaDonSuaChuaChiTietForm: FormGroup;
  hoaDonSuaChuaForm: FormGroup;
  hoaDonSuaChua: any;
  hoaDonSuaChuaCT: any;
  idType: number;
  dichVuKhac: any;
  boPhan: any;
  nhanVien: any;
  canHo: any;
  type: string;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddEditTypeUtilityComponent>,
    private typeUtilityService: TypeUtilityService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dichVuService: DichvuService,
    private boPhanService: BoPhanService,
    private canHoService: CanhoService
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.getAllDichVuKhac();
    this.getAllBoPhan();
    this.getAllCanHo();
    this.hoaDonSuaChua = {
      trangThai: null,
      canHo: null,
      nhanVien: null,
    };
    this.hoaDonSuaChuaForm = new FormGroup({
      id: new FormControl(null),
      canHo: new FormControl(null, Validators.required),
      boPhan: new FormControl(null, Validators.required),
      nhanVien: new FormControl(null, Validators.required),
    });
    this.hoaDonSuaChuaCT = {
      donGia: null,
      soLuong: null,
      moTa: null,
      loaiSuaChua: null,
      hoaDonSuaChua: null,
    };
    this.hoaDonSuaChuaChiTietForm = new FormGroup({
      id: new FormControl(null),
      loaiSuaChua: new FormControl(null, Validators.required),
      soLuong: new FormControl(null, Validators.required),
      moTa: new FormControl(null, Validators.required),
    });
  }
  private getAllCanHo() {
    this.canHoService.getAllCanHo().subscribe(
      (data) => {
        this.canHo = data;
        console.log(this.canHo);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  private getAllBoPhan() {
    this.boPhanService.getAllBoPhan().subscribe(
      (data) => {
        this.boPhan = data;
        console.log(this.dichVuKhac);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getAllNhanVien(id: any) {
    this.boPhanService.getAllNhanVienByIdBoPhan(id).subscribe(
      (data) => {
        this.nhanVien = data;
        console.log(this.dichVuKhac);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  private getAllDichVuKhac() {
    this.dichVuService.getAllLoaiSuaChua().subscribe(
      (data) => {
        this.dichVuKhac = data;
        console.log(this.dichVuKhac);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getTypeUtilityById() {
    // this.typeUtilityService.getTypeUtilityById(this.id).subscribe(
    //   (data) => {
    //     this.typeUtilityForm.patchValue(data);
    //   },
    //   (error) => {
    //     throwError(error);
    //   }
    // );
  }

  submitAction() {
    if (this.type == "HDSC") {
      this.createHDSC();
    } else if (this.type == "HDSCCT") {
      this.createHDSCCT();
    }
  }
  createHDSC() {
    this.hoaDonSuaChua.nhanVien = this.hoaDonSuaChuaForm.get("nhanVien").value;
    (this.hoaDonSuaChua.trangThai = false),
      (this.hoaDonSuaChua.canHo = this.hoaDonSuaChuaForm.get("canHo").value);
    console.log(this.hoaDonSuaChua);
    this.dichVuService.createHDSC(this.hoaDonSuaChua).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thêm thành công"
        );
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Thêm thất bại");
      }
    );
  }
  createHDSCCT() {
    this.hoaDonSuaChuaCT.donGia =
      this.hoaDonSuaChuaChiTietForm.get("loaiSuaChua").value.donGia;
    this.hoaDonSuaChuaCT.soLuong =
      this.hoaDonSuaChuaChiTietForm.get("soLuong").value;
    this.hoaDonSuaChuaCT.moTa = this.hoaDonSuaChuaChiTietForm.get("moTa").value;
    this.hoaDonSuaChuaCT.loaiSuaChua =
      this.hoaDonSuaChuaChiTietForm.get("loaiSuaChua").value;
    this.hoaDonSuaChuaCT.hoaDonSuaChua = this.data.hoaDon;
    console.log(this.hoaDonSuaChuaCT);
    this.dichVuService.createHDSCCT(this.hoaDonSuaChuaCT).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thêm thành công"
        );
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Thêm thất bại");
      }
    );
  }
}
