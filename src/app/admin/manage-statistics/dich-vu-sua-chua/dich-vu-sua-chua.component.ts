import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { throwError } from "rxjs";
import { CuDan } from "../../../shared/model/cuDan/cudan";
import { AuthService } from "../../../shared/service/auth.service";
import { DichvuService } from "../../../shared/service/dichVu/dichvu.service";
import { ToastService } from "../../../shared/service/toast.service";
import { AddDichvuComponent } from "../../manage-canho/canho/detail-canho/add-dichvu/add-dichvu.component";
import { DetailDichvuComponent } from "../../manage-canho/canho/detail-canho/detail-dichvu/detail-dichvu.component";

@Component({
  selector: "ngx-dich-vu-sua-chua",
  templateUrl: "./dich-vu-sua-chua.component.html",
  styleUrls: ["./dich-vu-sua-chua.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class DichVuSuaChuaComponent implements OnInit {
  @ViewChild("TableTwoPaginator", { static: true })
  tableTwoPaginator: MatPaginator;
  @ViewChild("TableTwoSort", { static: true }) tableTwoSort: MatSort;
  idCanHo: number = 0;
  dichVuSuaChuaList = new MatTableDataSource();
  role: any;
  expandedElement: CuDan | null;
  columnsToDisplayDichVu = ["stt", "ngayTao", "trangThai", "canHo", "id"];
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private dichVuService: DichvuService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<DichVuSuaChuaComponent>
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();

    if (this.data.type == "Chua") {
      this.findAllHdscByChuaThanhToanTrongThang();
    } else {
      this.findAllHdscByDaThanhToanTrongThang();
    }
  }
  convertDateToTimeStamp(date: any) {
    return new Date(date[0], date[1] - 1, date[2]);
  }
  applyFilterDichVuKhac(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dichVuSuaChuaList.filter = filterValue.trim().toLowerCase();
    if (this.dichVuSuaChuaList.paginator) {
      this.dichVuSuaChuaList.paginator.firstPage();
    }
  }
  openAddDichVu(idHoaDon) {
    const id = idHoaDon;
    const type = "DVSC";
    const dialogRef = this.dialog.open(AddDichvuComponent, {
      data: { id, type },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // this.getAllDichVuByCanHo();
      }
    });
  }
  openDetailDichVu(hoaDon: any) {
    const type = "HDSC";
    const idCanHo = hoaDon.canHo.id;
    const idHoaDon = hoaDon.id;
    const month = hoaDon.ngayTao[1];
    const dialogRef = this.dialog.open(DetailDichvuComponent, {
      data: { type, idHoaDon, idCanHo, month, hoaDon },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // this.getAllTheCuDanByCanHo();
      }
    });
  }
  findAllHdscByChuaThanhToanTrongThang() {
    this.dichVuService
      .findAllHdscByChuaThanhToanTrongThang(this.data.nam, this.data.thang)
      .subscribe(
        (data) => {
          this.dichVuSuaChuaList.data = data;
          console.log(this.dichVuSuaChuaList.data);
        },
        (error) => {
          throwError(error);
        }
      );
  }
  findAllHdscByDaThanhToanTrongThang() {
    this.dichVuService
      .findAllHdscByDaThanhToanTrongThang(this.data.nam, this.data.thang)
      .subscribe(
        (data) => {
          this.dichVuSuaChuaList.data = data;
        },
        (error) => {
          throwError(error);
        }
      );
  }
}
