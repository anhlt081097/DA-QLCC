import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { throwError } from "rxjs";
import { EmployeeResponse } from "../../../shared/model/employee/employee-response";
import { EmployeeService } from "../../../shared/service/employee-service.service";
import { AddCanHoComponent } from "./add-canho/add-canho.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { DialogSubmitLockComponent } from "../../../shared/component/dialog-submit-lock/dialog-submit-lock.component";
import { DialogSubmitUnlockComponent } from "../../../shared/component/dialog-submit-unlock/dialog-submit-unlock.component";
import { ToastService } from "../../../shared/service/toast.service";
import { CanhoService } from "../../../shared/service/canHo/canho.service";
import { AddCudanComponent } from "./add-cudan/add-cudan.component";
import { CanHo } from "../../../shared/model/canHo/canho";
import { AddTaikhoanCanhoComponent } from "./add-taikhoan-canho/add-taikhoan-canho.component";

@Component({
  selector: "ngx-list-employee",
  templateUrl: "./canho.component.html",
  styleUrls: ["./canho.component.scss"],
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
export class CanHoComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  employee = new MatTableDataSource();
  employeeLock = new MatTableDataSource();
  canHo = new MatTableDataSource();
  canHoKhongHoatDong = new MatTableDataSource();
  columnsToDisplay = [
    "userName",
    "fullName",
    "email",
    "phone",
    "account",
    "id",
  ];
  columnsToDisplayKhongHoatDong = [
    "userName",
    "fullName",
    "email",
    "phone",
    "id",
  ];
  expandedElement: EmployeeResponse | null;
  check: EmployeeResponse[] = [];

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private toastrService: ToastService,
    private canHoService: CanhoService
  ) {}

  ngOnInit(): void {
    // this.getAllEmployeeLock();
    // this.getAllEmployee();
    // this.checkEmployee();
    this.getAllCanHo();
    this.getAllCanHoKhongHoatDong();
  }

  checkEmployee() {
    this.employeeService.checkEmployeeWait().subscribe(
      (data) => {
        this.check = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  private getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe(
      (data) => {
        this.employee.data = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  private getAllCanHo() {
    this.canHoService.getAllCanHo().subscribe(
      (data) => {
        this.canHo.data = data;
        console.log(data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  private getAllCanHoKhongHoatDong() {
    this.canHoService.getAllCanHoKhongHoatDong().subscribe(
      (data) => {
        this.canHoKhongHoatDong.data = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  private getAllEmployeeLock() {
    this.employeeService.getAllEmployeeLock().subscribe(
      (data) => {
        this.employeeLock.data = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  ngAfterViewInit() {
    this.employee.paginator = this.paginator.toArray()[0];
    this.employee.sort = this.sort.toArray()[0];
    this.employeeLock.paginator = this.paginator.toArray()[1];
    this.employeeLock.sort = this.sort.toArray()[1];

    this.canHo.paginator = this.paginator.toArray()[0];
    this.canHo.sort = this.sort.toArray()[0];
    this.canHoKhongHoatDong.paginator = this.paginator.toArray()[1];
    this.canHoKhongHoatDong.sort = this.sort.toArray()[1];
  }

  openAdd() {
    const type = "add";
    const dialogRef = this.dialog.open(AddCanHoComponent, {
      data: { type },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllCanHoKhongHoatDong();
      }
    });
  }

  openEdit(id: number) {
    const type = "edit";
    const dialogRef = this.dialog.open(AddCanHoComponent, {
      data: { type, id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllCanHoKhongHoatDong();
      }
    });
  }
  openAddTaiKhoan(id: number) {
    const dialogRef = this.dialog.open(AddTaikhoanCanhoComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllCanHo();
      }
    });
  }
  openAddChuSoHuu(canHo: CanHo) {
    const type = "addCSH";
    const id = canHo.id;
    const dialogRef = this.dialog.open(AddCudanComponent, {
      data: { type, id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.updateCanHo(canHo);
        this.getAllCanHoKhongHoatDong();
        this.getAllCanHo();
      }
    });
  }
  updateCanHo(canHo: CanHo) {
    canHo.trangThai = true;
    console.log(canHo);
    this.canHoService.updateCanHo(canHo).subscribe(
      (data) => {
        this.getAllCanHoKhongHoatDong();
        this.getAllCanHo();
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Sửa thất bại");
      }
    );
  }
  onUnlock(id): void {
    const dialogRef = this.dialog.open(DialogSubmitUnlockComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.employeeService.uplockEmployee(id).subscribe(
          (data) => {
            this.getAllEmployee();
            this.getAllEmployeeLock();
            this.toastrService.showToast(
              "success",
              "Success",
              "Unlock successfully"
            );
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast(
              "danger",
              "Unsuccessful",
              "Unlock unsuccessfully"
            );
          }
        );
      }
    });
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(DialogSubmitLockComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.employeeService.deleteEmployee(id).subscribe(
          (data) => {
            this.getAllEmployee();
            this.getAllEmployeeLock();
            this.toastrService.showToast(
              "success",
              "Success",
              "Lock successfully"
            );
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast(
              "danger",
              "Unsuccessful",
              "Lock unsuccessfully"
            );
          }
        );
      }
    });
  }

  applyFilterEmployee(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employee.filter = filterValue.trim().toLowerCase();

    if (this.employee.paginator) {
      this.employee.paginator.firstPage();
    }
  }
  applyFilterCanHo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.canHo.filter = filterValue.trim().toLowerCase();

    if (this.canHo.paginator) {
      this.canHo.paginator.firstPage();
    }
  }
  applyFilterCanHoKhongHoatDong(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.canHoKhongHoatDong.filter = filterValue.trim().toLowerCase();

    if (this.canHoKhongHoatDong.paginator) {
      this.canHoKhongHoatDong.paginator.firstPage();
    }
  }
  applyFilterEmployeeLock(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeLock.filter = filterValue.trim().toLowerCase();

    if (this.employeeLock.paginator) {
      this.employeeLock.paginator.firstPage();
    }
  }
}
