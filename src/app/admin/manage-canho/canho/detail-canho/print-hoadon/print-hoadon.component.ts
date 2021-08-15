import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "ngx-print-hoadon",
  templateUrl: "./print-hoadon.component.html",
  styleUrls: ["./print-hoadon.component.scss"],
})
export class PrintHoadonComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<PrintHoadonComponent>) {}

  ngOnInit(): void {
    this.printTransfer();
    this.dialogRef.close();
  }
  printTransfer(): void {
    window.print();
  }
}
