import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { DichVuCoDinh } from "../../../../shared/model/dichVu/dichvu";
import { BoPhanService } from "../../../../shared/service/boPhan/bo-phan.service";
import { DichvuService } from "../../../../shared/service/dichVu/dichvu.service";
import { ToastService } from "../../../../shared/service/toast.service";

@Component({
  selector: "ngx-add-dich-vu-co-dinh",
  templateUrl: "./add-dich-vu-co-dinh.component.html",
  styleUrls: ["./add-dich-vu-co-dinh.component.scss"],
})
export class AddDichVuCoDinhComponent implements OnInit {
  typeAction: any;
  dichVuForm: FormGroup;
  dichVuCoDinh: DichVuCoDinh = new DichVuCoDinh();
  editDichVuForm: FormGroup;
  boPhan: any;
  constructor(
    private dichVuService: DichvuService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddDichVuCoDinhComponent>,
    private boPhanService: BoPhanService
  ) {}

  ngOnInit(): void {
    this.typeAction = this.data.typeAction;
    this.dichVuForm = new FormGroup({
      tenDichVu: new FormControl(null, Validators.required),
      donGia: new FormControl(null, Validators.required),
      boPhan: new FormControl(null, Validators.required),
    });
    this.editDichVuForm = new FormGroup({
      ten: new FormControl(null, Validators.required),
      donGia: new FormControl(null, Validators.required),
    });
    if (this.typeAction == "editDvCoDinh" || this.typeAction == "editDvKhac") {
      this.editDichVuForm.patchValue(this.data.data);
    }
    this.getAllBoPhan();
  }

  private getAllBoPhan() {
    this.boPhanService.getAllBoPhan().subscribe(
      (data) => {
        this.boPhan = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  createDichVuKhac() {
    this.dichVuCoDinh.ten = this.dichVuForm.get("tenDichVu").value;
    this.dichVuCoDinh.donGia = this.dichVuForm.get("donGia").value;
    this.dichVuCoDinh.boPhan = this.dichVuForm.get("boPhan").value;
    this.dichVuService.createDvKhac(this.dichVuCoDinh).subscribe(
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
  createDichVu() {
    // this.dichVuCoDinh.id = this.data.data.id;
    this.dichVuCoDinh.ten = this.dichVuForm.get("tenDichVu").value;
    this.dichVuCoDinh.donGia = this.dichVuForm.get("donGia").value;
    this.dichVuService.createDvCoDinh(this.dichVuCoDinh).subscribe(
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
  updateDichVuKhac() {
    this.dichVuCoDinh.id = this.data.data.id;
    this.dichVuCoDinh.ten = this.editDichVuForm.get("ten").value;
    this.dichVuCoDinh.donGia = this.editDichVuForm.get("donGia").value;
    this.dichVuCoDinh.boPhan = this.data.data.boPhan;
    this.dichVuService.updateDvKhac(this.dichVuCoDinh).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast("success", "Thành công", "Sửa thành công");
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Sửa thất bại");
      }
    );
  }
  updateDichVu() {
    this.dichVuCoDinh.id = this.data.data.id;
    this.dichVuCoDinh.ten = this.editDichVuForm.get("ten").value;
    this.dichVuCoDinh.donGia = this.editDichVuForm.get("donGia").value;
    this.dichVuService.updateDvCoDinh(this.dichVuCoDinh).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast("success", "Thành công", "Sửa thành công");
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Sửa thất bại");
      }
    );
  }
}
