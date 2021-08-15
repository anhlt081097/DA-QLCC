import { formatDate } from "@angular/common";
import { Component, Inject, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { CanHo } from "../../../../../shared/model/canHo/canho";
import { TheCuDan } from "../../../../../shared/model/theCuDan/theCuDan";
import { CanhoService } from "../../../../../shared/service/canHo/canho.service";
import { ThecudanService } from "../../../../../shared/service/theCuDan/thecudan.service";
import { ToastService } from "../../../../../shared/service/toast.service";

@Component({
  selector: "ngx-add-thecudan",
  templateUrl: "./add-thecudan.component.html",
  styleUrls: ["./add-thecudan.component.scss"],
})
export class AddThecudanComponent implements OnInit {
  theCuDan: TheCuDan;
  theCuDanForm: FormGroup;
  typeAction: string;
  canHo: CanHo = new CanHo();
  currenDate: Date = new Date();
  today: number = Date.now();

  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddThecudanComponent>,
    private theCuDanService: ThecudanService,
    private canHoService: CanhoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // this.getAllHomeStay();
    this.typeAction = this.data.type;
    this.theCuDan = {
      id: undefined,
      maThe: null,
      ngayTao: null,
      kichHoat: undefined,
      canHo: null,
    };
    this.theCuDanForm = new FormGroup({
      maThe: new FormControl(null, Validators.required),
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
  }

  createTheCuDan() {
    this.theCuDan.maThe = this.theCuDanForm.get("maThe").value;
    this.theCuDan.ngayTao = null;
    this.theCuDan.kichHoat = true;
    this.theCuDan.canHo = this.canHo;
    console.log(this.theCuDan);
    this.theCuDanService.createTheCuDan(this.theCuDan).subscribe(
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
