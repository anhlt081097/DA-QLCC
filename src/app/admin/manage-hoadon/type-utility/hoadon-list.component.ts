import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { throwError } from "rxjs";
import { TypeUtilityResponse } from "../../../shared/model/type-utility/type-utility-response";
import { TypeUtilityService } from "../../../shared/service/type-utility.service";
import { AddEditUtilityComponent } from "./add-edit-utility/add-edit-utility.component";
import { AddEditTypeUtilityComponent } from "./add-edit-type-utility/add-edit-type-utility.component";
import { DialogDeleteSubmitComponent } from "../../../shared/component/dialog-submit-delete/dialog-submit-delete.component";
import { ToastService } from "../../../shared/service/toast.service";
import { UtilityService } from "../../../shared/service/utility.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { DichVu, DichVuCoDinh } from "../../../shared/model/dichVu/dichvu";
import { DichvuService } from "../../../shared/service/dichVu/dichvu.service";
import { MatSort } from "@angular/material/sort";
import { DetailDichvuComponent } from "../../manage-canho/canho/detail-canho/detail-dichvu/detail-dichvu.component";
import { AddDichvuComponent } from "../../manage-canho/canho/detail-canho/add-dichvu/add-dichvu.component";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "ngx-list-type-utility",
  templateUrl: "./hoadon-list.component.html",
  styleUrls: ["./hoadon-list.component.scss"],
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
export class HoaDonListComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  @ViewChild("TableOnePaginator", { static: true })
  tableOnePaginator: MatPaginator;
  @ViewChild("TableOneSort", { static: true }) tableOneSort: MatSort;
  @ViewChild("TableTwoPaginator", { static: true })
  tableTwoPaginator: MatPaginator;
  @ViewChild("TableTwoSort", { static: true }) tableTwoSort: MatSort;

  employee = new MatTableDataSource();
  employeeLock = new MatTableDataSource();
  dichVuCoDinh = new MatTableDataSource();
  dichVuKhac = new MatTableDataSource();
  hoaDonDichVu = new MatTableDataSource();
  hoaDonSuaChua = new MatTableDataSource();
  columnsToDisplay = ["stt", "tenDichVu", "donGia", "id"];
  columnsToDisplayDichVu = ["stt", "ngayTao", "trangThai", "canHo", "id"];
  columnsToDisplaySuaChua = [
    "stt",
    "ngayTao",
    "trangThai",
    "nhanVien",
    "canHo",
    "id",
  ];
  expandedElement: DichVu | null;
  expandedElementSuaChua: DichVu | null;
  constructor(
    private dialog: MatDialog,
    private toastrService: ToastService,
    private dichVuService: DichvuService
  ) {}

  ngOnInit(): void {
    this.getAllHoaDonDichVu();
    this.getAllDichVuKhac();
    this.getAllHoaDonSuaChua();
  }
  private getAllHoaDonDichVu() {
    this.dichVuService.getAllDichVu().subscribe(
      (data) => {
        console.log(data);
        this.hoaDonDichVu.data = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  private getAllHoaDonSuaChua() {
    this.dichVuService.getAllDichVuKhac().subscribe(
      (data) => {
        this.hoaDonSuaChua.data = data;
        console.log(data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  convertDateToTimeStamp(date: any) {
    return new Date(date[0], date[1] - 1, date[2]);
  }

  openDetailDichVu(hoaDon: any, type: string) {
    const idCanHo = hoaDon.canHo.id;
    const idHoaDon = hoaDon.id;
    const month = hoaDon.ngayTao[1];
    const dialogRef = this.dialog.open(DetailDichvuComponent, {
      data: { type, idHoaDon, idCanHo, month, hoaDon },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllHoaDonDichVu();
      }
    });
  }
  openAddDichVu(idHoaDon, type: string) {
    const id = idHoaDon;
    const dialogRef = this.dialog.open(AddDichvuComponent, {
      data: { id, type },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // this.dataSource;
      }
    });
  }
  openAddHoaDonSuaChua() {
    const type = "HDSC";
    const dialogRef = this.dialog.open(AddEditTypeUtilityComponent, {
      data: { type },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllHoaDonSuaChua();
      }
    });
  }
  private getAllDichVuKhac() {
    this.dichVuService.getAllDichVuKhac().subscribe(
      (data) => {
        this.dichVuKhac.data = data;
        console.log(this.dichVuKhac);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  ngAfterViewInit(): void {
    // this.smartTable.edit.subscribe((node: any) => {
    //   this.openEdit(node.data.id);
    // });
    // this.smartTable.delete.subscribe((node: any) => {
    //   this.onDelete(node.data.id);
    // });
    // this.smartTable.create.subscribe((node: any) => {
    //   this.openAdd();
    // });
    this.hoaDonDichVu.paginator = this.tableOnePaginator;
    this.hoaDonDichVu.sort = this.tableOneSort;
    this.hoaDonSuaChua.paginator = this.tableTwoPaginator;
    this.hoaDonSuaChua.sort = this.tableTwoSort;
  }
}
