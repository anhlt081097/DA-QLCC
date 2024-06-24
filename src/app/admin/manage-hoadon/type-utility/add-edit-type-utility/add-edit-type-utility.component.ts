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
export class hoaDonSuaChuaCT {
  donGia: any;
  soLuong: any;
  moTa: any;
  loaiSuaChua: any;
  hoaDonSuaChua: any;
}
@Component({
  selector: "ngx-add-edit-type-utility",
  templateUrl: "./add-edit-type-utility.component.html",
  styleUrls: ["./add-edit-type-utility.component.scss"],
})
export class AddEditTypeUtilityComponent implements OnInit {
  hoaDonSuaChuaChiTietForm: FormGroup;
  hoaDonSuaChuaChiTietForm2: FormGroup;
  hoaDonSuaChuaForm: FormGroup;
  hoaDonSuaChua: any;
  hoaDonSuaChuaCT: any;
  hoaDonSuaChuaCT2: hoaDonSuaChuaCT = new hoaDonSuaChuaCT();
  listHoaDonSuaChuaCT: hoaDonSuaChuaCT[] = [];
  idType: number;
  dichVuKhac: any;
  boPhan: any;
  nhanVien: any;
  canHo: any;
  type: string;
  idBoPhan: any;
  boPhan2: any;
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

    this.getAllBoPhan();
    this.getAllCanHo();
    this.listHoaDonSuaChuaCT.push(new hoaDonSuaChuaCT());
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
      LoaiSuaChua: null,
      hoaDonSuaChua: null,
    };
    this.hoaDonSuaChuaChiTietForm = new FormGroup({
      id: new FormControl(null),
      loaiSuaChua: new FormControl(null, Validators.required),
      soLuong: new FormControl(null, Validators.required),
      moTa: new FormControl(null, Validators.required),
    });
  }
  addNewCriteria() {
    this.listHoaDonSuaChuaCT.push(new hoaDonSuaChuaCT());
  }
  deleteNewCriteria(value) {
    this.listHoaDonSuaChuaCT.splice(value, 1);
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
    this.getAllDichVuKhacByIdBoPhan(id);
  }
  getAllDichVuKhacByIdBoPhan(id: any) {
    this.boPhanService.getLoaiSuaCHuaByBoPhanById(id).subscribe(
      (data) => {
        this.dichVuKhac = data;
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
      // this.createHDSCCT();
      this.listHoaDonSuaChuaCT.forEach((element) => {
        console.log(element);
        this.createHDSCCT2(element, this.data.hoaDon);
      });
    }
  }
  createHDSC() {
    this.hoaDonSuaChua.nhanVien = this.hoaDonSuaChuaForm.get("nhanVien").value;
    (this.hoaDonSuaChua.trangThai = false),
      (this.hoaDonSuaChua.canHo = this.hoaDonSuaChuaForm.get("canHo").value);
    this.dichVuService.createHDSC(this.hoaDonSuaChua).subscribe(
      (data) => {
        this.listHoaDonSuaChuaCT.forEach((element) => {
          console.log(element);
          this.createHDSCCT2(element, data);
        });
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
  createHDSCCT2(value: any, hoaDon: any) {
    console.log(value);
    this.hoaDonSuaChuaCT2.donGia = value.loaiSuaChua.donGia;
    this.hoaDonSuaChuaCT2.soLuong = value.soLuong;
    this.hoaDonSuaChuaCT2.moTa = value.moTa;
    this.hoaDonSuaChuaCT2.loaiSuaChua = value.loaiSuaChua;
    this.hoaDonSuaChuaCT2.hoaDonSuaChua = hoaDon;
    console.log(this.hoaDonSuaChuaCT2);
    this.dichVuService.createHDSCCT(this.hoaDonSuaChuaCT2).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thêm chi tiết thành công"
        );
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast(
          "danger",
          "Thất bại",
          "Thêm chi tiết thất bại"
        );
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
