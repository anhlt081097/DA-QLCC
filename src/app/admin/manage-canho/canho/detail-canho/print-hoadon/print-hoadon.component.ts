import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CanHo } from "../../../../../shared/model/canHo/canho";
import { DichVuChiTiet } from "../../../../../shared/model/dichVu/dichvu";

@Component({
  selector: "ngx-print-hoadon",
  templateUrl: "./print-hoadon.component.html",
  styleUrls: ["./print-hoadon.component.scss"],
})
export class PrintHoadonComponent implements OnInit {
  canHo: any;
  chiTietDichVu: any;
  tongTien: number = 0;
  type: string;
  constructor(
    private dialogRef: MatDialogRef<PrintHoadonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.canHo = this.data.dataCanHo;
    this.chiTietDichVu = this.data.dataDichVu;
  }

  ngOnInit(): void {
    this.type = this.data.type;
  }
  ngAfterViewInit() {
    this.printTransfer();
    this.dialogRef.close();
  }
  sum() {
    for (let i = 0; i < this.chiTietDichVu.length; i++) {
      this.tongTien +=
        this.chiTietDichVu[i].donGia * this.chiTietDichVu[i].soLuong;
    }
    return this.tongTien;
  }
  printTransfer(): void {
    window.print();
  }
}
