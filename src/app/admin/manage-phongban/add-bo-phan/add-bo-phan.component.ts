import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { BoPhanService } from "../../../shared/service/boPhan/bo-phan.service";
import { ToastService } from "../../../shared/service/toast.service";

@Component({
  selector: "ngx-add-bo-phan",
  templateUrl: "./add-bo-phan.component.html",
  styleUrls: ["./add-bo-phan.component.scss"],
})
export class AddBoPhanComponent implements OnInit {
  boPhanForm: FormGroup;
  boPhan: any;
  type: string;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddBoPhanComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private boPhanService: BoPhanService
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.boPhan = {
      id: null,
      ten: null,
    };
    this.boPhanForm = new FormGroup({
      ten: new FormControl(null, Validators.required),
    });
    if (this.type == "edit") {
      this.boPhanForm.patchValue(this.data.boPhan);
    }
  }
  createBoPhan() {
    this.boPhan.ten = this.boPhanForm.get("ten").value;

    this.boPhanService.createBoPhan(this.boPhan).subscribe(
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
  editBoPhan() {
    this.boPhan.id = this.data.boPhan.id;
    this.boPhan.ten = this.boPhanForm.get("ten").value;

    this.boPhanService.editBoPhan(this.boPhan).subscribe(
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
      this.createBoPhan();
    }
    if (this.type == "edit") {
      this.editBoPhan();
    }
  }
}
