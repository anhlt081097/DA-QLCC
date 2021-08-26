import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { BoPhanService } from "../../../shared/service/boPhan/bo-phan.service";
import { ToastService } from "../../../shared/service/toast.service";

@Component({
  selector: "ngx-add-nhan-vien",
  templateUrl: "./add-nhan-vien.component.html",
  styleUrls: ["./add-nhan-vien.component.scss"],
})
export class AddNhanVienComponent implements OnInit {
  nhanVienForm: FormGroup;
  nhanVien: any;
  type: string;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddNhanVienComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private boPhanService: BoPhanService
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.nhanVien = {
      id: null,
      hoTen: null,
      soDienThoai: null,
      email: null,
      boPhan: null,
    };
    this.nhanVienForm = new FormGroup({
      hoTen: new FormControl(null, Validators.required),
      soDienThoai: new FormControl(null, [
        Validators.required,
        Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    if (this.type == "edit") {
      this.nhanVienForm.patchValue(this.data.nhanVien);
    }
    console.log(this.data.idBoPhan);
  }
  createNhanVien() {
    this.nhanVien.hoTen = this.nhanVienForm.get("hoTen").value;
    this.nhanVien.soDienThoai = this.nhanVienForm.get("soDienThoai").value;
    this.nhanVien.email = this.nhanVienForm.get("email").value;
    this.nhanVien.boPhan = this.data.idBoPhan;
    this.boPhanService.createNhanVien(this.nhanVien).subscribe(
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
  editNhanVien() {
    this.nhanVien.hoTen = this.nhanVienForm.get("hoTen").value;
    this.nhanVien.soDienThoai = this.nhanVienForm.get("soDienThoai").value;
    this.nhanVien.email = this.nhanVienForm.get("email").value;
    this.nhanVien.boPhan = this.data.nhanVien.boPhan;
    this.nhanVien.id = this.data.nhanVien.id;

    this.boPhanService.editNhanVien(this.nhanVien).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast("success", "Thành công", "Sữa thành công");
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Sữa thất bại");
      }
    );
  }
  submitAction() {
    if (this.type == "add") {
      this.createNhanVien();
    }
    if (this.type == "edit") {
      this.editNhanVien();
    }
  }
}
