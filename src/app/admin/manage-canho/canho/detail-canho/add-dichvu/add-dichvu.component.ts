import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { ThanhToanHDDV } from "../../../../../shared/model/dichVu/dichvu";
import { DichvuService } from "../../../../../shared/service/dichVu/dichvu.service";
import { ToastService } from "../../../../../shared/service/toast.service";

@Component({
  selector: "ngx-add-dichvu",
  templateUrl: "./add-dichvu.component.html",
  styleUrls: ["./add-dichvu.component.scss"],
})
export class AddDichvuComponent implements OnInit {
  thanhToanForm: FormGroup;
  thanhToan: ThanhToanHDDV;
  idHoaDon: any;
  type: string;
  constructor(
    private dichVuService: DichvuService,
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddDichvuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.idHoaDon = this.data.id;
    this.type = this.data.type;
    console.log(this.idHoaDon);
    this.thanhToan = {
      id: undefined,
      tenNguoiThanhToan: null,
      soDienThoai: null,
      loaiHinhThanhToan: undefined,
    };
    this.thanhToanForm = new FormGroup({
      tenNguoiThanhToan: new FormControl(null, Validators.required),
      soDienThoai: new FormControl(null, Validators.required),
      loaiHinhThanhToan: new FormControl(null, Validators.required),
    });
  }
  createThanhToanSc() {
    this.thanhToan.id = this.idHoaDon;
    this.thanhToan.tenNguoiThanhToan =
      this.thanhToanForm.get("tenNguoiThanhToan").value;
    this.thanhToan.soDienThoai = this.thanhToanForm.get("soDienThoai").value;
    this.thanhToan.loaiHinhThanhToan =
      this.thanhToanForm.get("loaiHinhThanhToan").value;
    console.log(this.thanhToan);
    this.dichVuService.thanhToanHDSC(this.thanhToan).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thanh toán thành công"
        );
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast(
          "danger",
          "Thất bại",
          "Thanh toán thất bại"
        );
      }
    );
  }
  createThanhToanDv() {
    this.thanhToan.id = this.idHoaDon;
    this.thanhToan.tenNguoiThanhToan =
      this.thanhToanForm.get("tenNguoiThanhToan").value;
    this.thanhToan.soDienThoai = this.thanhToanForm.get("soDienThoai").value;
    this.thanhToan.loaiHinhThanhToan =
      this.thanhToanForm.get("loaiHinhThanhToan").value;
    console.log(this.thanhToan);
    this.dichVuService.thanhToanHDDV(this.thanhToan).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thanh toán thành công"
        );
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast(
          "danger",
          "Thất bại",
          "Thanh toán thất bại"
        );
      }
    );
  }
  createThanhToan() {
    if (this.type == "DVCD") {
      this.createThanhToanDv();
    } else if (this.type == "DCSC") {
      this.createThanhToanSc();
    }
  }
}
