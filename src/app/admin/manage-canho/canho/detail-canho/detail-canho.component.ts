import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { DatePipe, formatDate } from "@angular/common";
import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { throwError } from "rxjs";
import { DialogSubmitLockComponent } from "../../../../shared/component/dialog-submit-lock/dialog-submit-lock.component";
import { CuDan } from "../../../../shared/model/cuDan/cudan";
import { TheCuDan } from "../../../../shared/model/theCuDan/theCuDan";
import { XeCo } from "../../../../shared/model/xeCo/xeco";
import { AuthService } from "../../../../shared/service/auth.service";
import { CudanService } from "../../../../shared/service/cuDan/cudan.service";
import { DichvuService } from "../../../../shared/service/dichVu/dichvu.service";
import { ThecudanService } from "../../../../shared/service/theCuDan/thecudan.service";
import { ToastService } from "../../../../shared/service/toast.service";
import { XecoService } from "../../../../shared/service/xeCo/xeco.service";
import { AddCanHoComponent } from "../add-canho/add-canho.component";
import { AddCudanComponent } from "../add-cudan/add-cudan.component";
import { AddDichvuComponent } from "./add-dichvu/add-dichvu.component";
import { AddThecudanComponent } from "./add-thecudan/add-thecudan.component";
import { AddXecoComponent } from "./add-xeco/add-xeco.component";
import { DetailDichvuComponent } from "./detail-dichvu/detail-dichvu.component";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
];

@Component({
  selector: "ngx-detail-employee",
  templateUrl: "./detail-canho.component.html",
  styleUrls: ["./detail-canho.component.scss"],
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
export class DetailEmployeeComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  @ViewChild("TablePaginator", { static: true })
  tablePaginator: MatPaginator;
  @ViewChild("TableSort", { static: true }) tableSort: MatSort;
  @ViewChild("TableOnePaginator", { static: true })
  tableOnePaginator: MatPaginator;
  @ViewChild("TableOneSort", { static: true }) tableOneSort: MatSort;
  @ViewChild("TableTwoPaginator", { static: true })
  tableTwoPaginator: MatPaginator;
  @ViewChild("TableTwoSort", { static: true }) tableTwoSort: MatSort;
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  columnsToDisplay = ["image", "userName", "fullName", "email", "phone", "id"];
  columnsToDisplayDichVu = ["stt", "ngayTao", "trangThai", "id"];
  columnsToDisplayDichVuSuaChua = [
    "stt",
    "ngayTao",
    "trangThai",
    "nhanVien",
    "id",
  ];
  // dataSource = new MatTableDataSource();
  expandedElement: CuDan | null;
  theCuDanList: TheCuDan[] = [];
  xeCoList: XeCo[] = [];
  cuDanList = new MatTableDataSource();
  dichVuList = new MatTableDataSource();
  dichVuKhacList = new MatTableDataSource();
  idCanHo: number;
  role: string;
  constructor(
    private dialog: MatDialog,
    private theCuDanService: ThecudanService,
    private activateRoute: ActivatedRoute,
    private xeCoService: XecoService,
    private cuDanService: CudanService,
    private toastrService: ToastService,
    private dichVuService: DichvuService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    if (this.role == "Staff_bql") {
      this.idCanHo = this.activateRoute.snapshot.params.id;
    } else if (this.role == "User") {
      this.idCanHo = this.authService.getIdCanHo();
    }

    // this.dataSource.data = ELEMENT_DATA;
    this.getAllTheCuDanByCanHo();
    this.getAllXeCoByCanHo();
    this.getAllCuDanByCanHo();
    this.getAllDichVuByCanHo();
    this.getAllDichVuKhacByCanHo();
  }
  thanhToanPayPalHddv(id: any) {
    this.router.navigateByUrl("/banking/hddv/" + id);
  }
  thanhToanPayPalHdsc(id: any) {
    this.router.navigateByUrl("/banking/hdsc/" + id);
  }
  setDateTime(dateTime) {
    let pipe = new DatePipe("en-US");

    const time = pipe.transform(dateTime, "mediumTime", "UTC");

    const date = pipe.transform(dateTime, "MM/dd/yyyy", "UTC");

    return date + " " + time;
  }
  convertDateToTimeStamp(date: any) {
    return new Date(date[0], date[1] - 1, date[2]);
  }

  openAddTheCuDan() {
    const type = "add";
    const id = this.idCanHo;
    const dialogRef = this.dialog.open(AddThecudanComponent, {
      data: { type, id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTheCuDanByCanHo();
      }
    });
  }
  openEditTheCuDan(maThe: any) {
    const type = "edit";
    const id = this.idCanHo;
    const dialogRef = this.dialog.open(AddThecudanComponent, {
      data: { type, id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTheCuDanByCanHo();
      }
    });
  }
  onDeleteTheCuDan(id: number) {
    const dialogRef = this.dialog.open(DialogSubmitLockComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.theCuDanService.deleteTheCuDan(id).subscribe(
          (data) => {
            this.getAllTheCuDanByCanHo();
            this.toastrService.showToast(
              "success",
              "Thành công",
              "Khóa thành công"
            );
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast("danger", "Thất bại", "Khóa thất bại");
          }
        );
      }
    });
  }
  onDeletePhuongTien(id: number) {
    const dialogRef = this.dialog.open(DialogSubmitLockComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.xeCoService.deletePhuongTien(id).subscribe(
          (data) => {
            this.getAllXeCoByCanHo();
            this.toastrService.showToast(
              "success",
              "Thành công",
              "Khóa thành công"
            );
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast("danger", "Thất bại", "Khóa thất bại");
          }
        );
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
        this.getAllDichVuByCanHo();
      }
    });
  }
  openAddXeCo() {
    const type = "add";
    const id = this.idCanHo;
    const dialogRef = this.dialog.open(AddXecoComponent, {
      data: { type, id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllXeCoByCanHo();
      }
    });
  }
  openAddCuDan() {
    const type = "add";
    const id = this.idCanHo;
    const dialogRef = this.dialog.open(AddCudanComponent, {
      data: { type, id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllCuDanByCanHo();
      }
    });
  }
  openDetailDichVu(hoaDon: any) {
    const type = "HDDV";
    const idCanHo = this.idCanHo;
    const idHoaDon = hoaDon.id;
    const month = hoaDon.ngayTao[1];
    const dialogRef = this.dialog.open(DetailDichvuComponent, {
      data: { type, idHoaDon, idCanHo, month },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTheCuDanByCanHo();
      }
    });
  }
  openDetailSuaChua(hoaDon: any) {
    const type = "HDSC";
    const idCanHo = this.idCanHo;
    const idHoaDon = hoaDon.id;
    const month = hoaDon.ngayTao[1];
    const dialogRef = this.dialog.open(DetailDichvuComponent, {
      data: { type, idHoaDon, idCanHo, month, hoaDon },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTheCuDanByCanHo();
      }
    });
  }
  openEditCuDan(cuDan: CuDan) {
    const type = "edit";
    const id = this.idCanHo;
    const dataCuDan = cuDan;
    const dialogRef = this.dialog.open(AddCudanComponent, {
      data: { type, id, dataCuDan },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllCuDanByCanHo();
      }
    });
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator.toArray()[0];
    // this.dataSource.sort = this.sort.toArray()[0];
    this.cuDanList.paginator = this.tablePaginator;
    this.cuDanList.sort = this.tableSort;
    this.dichVuList.paginator = this.tableOnePaginator;
    this.dichVuList.sort = this.tableOneSort;
    this.dichVuKhacList.paginator = this.tableTwoPaginator;
    this.dichVuKhacList.sort = this.tableTwoSort;
    // this.dichVuList.paginator = this.paginator.toArray()[0];
    // this.dichVuList.sort = this.sort.toArray()[0];
  }
  applyFilterDichVu(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dichVuList.filter = filterValue.trim().toLowerCase();
    if (this.dichVuList.paginator) {
      this.dichVuList.paginator.firstPage();
    }
  }
  applyFilterDichVuKhac(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dichVuKhacList.filter = filterValue.trim().toLowerCase();
    if (this.dichVuKhacList.paginator) {
      this.dichVuKhacList.paginator.firstPage();
    }
  }
  applyFilterCuDan(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cuDanList.filter = filterValue.trim().toLowerCase();

    if (this.cuDanList.paginator) {
      this.cuDanList.paginator.firstPage();
    }
  }
  getAllTheCuDanByCanHo() {
    this.theCuDanService.getAllTheCuDanByCanHo(this.idCanHo).subscribe(
      (data) => {
        this.theCuDanList = data;
        console.log(this.theCuDanList);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getAllDichVuByCanHo() {
    this.dichVuService.getAllDichVuByIdCanHo(this.idCanHo).subscribe(
      (data) => {
        this.dichVuList.data = data;
        console.log(this.dichVuList.data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getAllDichVuKhacByCanHo() {
    this.dichVuService.getAllDichVuKhacByIdCanHo(this.idCanHo).subscribe(
      (data) => {
        this.dichVuKhacList.data = data;
        console.log(this.dichVuKhacList.data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getAllXeCoByCanHo() {
    this.xeCoService.getAllPhuongTienByCanHo(this.idCanHo).subscribe(
      (data) => {
        this.xeCoList = data;
        console.log(this.xeCoList);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getAllCuDanByCanHo() {
    this.cuDanService.getAllCuDanCanHo(this.idCanHo).subscribe(
      (data) => {
        this.cuDanList.data = data;
        console.log(this.cuDanList.data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
}
