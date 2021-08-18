import {
  Component,
  Inject,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { throwError } from "rxjs";
import { CanHo } from "../../../../../shared/model/canHo/canho";
import { DichVuChiTiet } from "../../../../../shared/model/dichVu/dichvu";
import { CanhoService } from "../../../../../shared/service/canHo/canho.service";
import { DichvuService } from "../../../../../shared/service/dichVu/dichvu.service";
import { PrintHoadonComponent } from "../print-hoadon/print-hoadon.component";

@Component({
  selector: "ngx-detail-dichvu",
  templateUrl: "./detail-dichvu.component.html",
  styleUrls: ["./detail-dichvu.component.scss"],
})
export class DetailDichvuComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  columnsToDisplay = ["stt", "ten", "donGia", "soLuong", "id"];
  expandedElement: DichVuChiTiet | null;
  chiTietDichVu = new MatTableDataSource();
  canHo: CanHo = new CanHo();
  constructor(
    private dialog: MatDialog,
    private dichVuService: DichvuService,
    private canHoService: CanhoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getChiTietHoaDonDichVu();
    this.getCanHoById();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator.toArray()[0];
    // this.dataSource.sort = this.sort.toArray()[0];
    this.chiTietDichVu.paginator = this.paginator.toArray()[0];
    this.chiTietDichVu.sort = this.sort.toArray()[0];
  }
  openPrintHoaDonDichVu() {
    const dataDichVu = this.chiTietDichVu.data;
    const dataCanHo = this.canHo;
    const month = this.data.month;
    const dialogRef = this.dialog.open(PrintHoadonComponent, {
      data: { dataDichVu, dataCanHo, month },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
  }
  getChiTietHoaDonDichVu() {
    this.dichVuService.getChiTietHoaDonDichVu(this.data.idHoaDon).subscribe(
      (data) => {
        this.chiTietDichVu.data = data;
        console.log(this.chiTietDichVu.data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getCanHoById() {
    this.canHoService.getCanHoById(this.data.idCanHo).subscribe(
      (data) => {
        this.canHo = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  applyFilterDichVu(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.chiTietDichVu.filter = filterValue.trim().toLowerCase();
    if (this.chiTietDichVu.paginator) {
      this.chiTietDichVu.paginator.firstPage();
    }
  }
}
