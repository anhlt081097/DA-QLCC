import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PrintHoadonComponent } from "../print-hoadon/print-hoadon.component";

@Component({
  selector: "ngx-detail-dichvu",
  templateUrl: "./detail-dichvu.component.html",
  styleUrls: ["./detail-dichvu.component.scss"],
})
export class DetailDichvuComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openPrintHoaDonDichVu() {
    const dialogRef = this.dialog.open(PrintHoadonComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
  }
}
