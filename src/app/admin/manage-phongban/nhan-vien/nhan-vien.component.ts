import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { BookingResponse } from "../../../shared/model/booking/booking-response";
import { EmployeeResponse } from "../../../shared/model/employee/employee-response";
import { TransactionResponse } from "../../../shared/model/transaction/transaction.response";
import { ToastService } from "../../../shared/service/toast.service";
import { TransactionService } from "../../../shared/service/transaction.service";
import { Images } from "../../manage-dichvu/home-stay/add-edit-home-stay/add-edit-home-stay.component";
import { AddCanHoComponent } from "../../manage-canho/canho/add-canho/add-canho.component";
import { BoPhanService } from "../../../shared/service/boPhan/bo-phan.service";
import { throwError } from "rxjs";
import { AddNhanVienComponent } from "../add-nhan-vien/add-nhan-vien.component";

@Component({
  selector: "ngx-nhan-vien",
  templateUrl: "./nhan-vien.component.html",
  styleUrls: ["./nhan-vien.component.scss"],
})
export class NhanVienComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "fullname",
    "dateIn",
    "dateOut",
    "action",
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  image: Images[] = [];
  bookingResponses: BookingResponse[];
  booking: BookingResponse;
  transactionResponses: TransactionResponse[];
  check: EmployeeResponse[] = [];
  id: number;
  idBoPhan: any;
  constructor(
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private toastrService: ToastService,
    private activateRoute: ActivatedRoute,
    private boPhanService: BoPhanService
  ) {}

  ngOnInit(): void {
    // this.getAllTransaction();
    this.id = this.activateRoute.snapshot.params.id;
    this.getAllNhanVienByIdBoPhan();
    this.getBoPhanById();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getAllNhanVienByIdBoPhan() {
    this.boPhanService.getAllNhanVienByIdBoPhan(this.id).subscribe(
      (data) => {
        this.dataSource.data = data;
        console.log(data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getBoPhanById() {
    this.boPhanService.getBoPhanById(this.id).subscribe(
      (data) => {
        this.idBoPhan = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  openAdd() {
    const type = "add";
    const idBoPhan = this.idBoPhan;
    const dialogRef = this.dialog.open(AddNhanVienComponent, {
      data: { type, idBoPhan },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllNhanVienByIdBoPhan();
      }
    });
  }
  openEdit(nhanVien: any) {
    const type = "edit";
    const dialogRef = this.dialog.open(AddNhanVienComponent, {
      data: { type, nhanVien },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllNhanVienByIdBoPhan();
      }
    });
  }
  deleteNhanVien(nhanVien: any) {
    this.boPhanService.deleteNhanVien(nhanVien).subscribe(
      (data) => {
        this.toastrService.showToast("success", "Thành công", "Xoá thành công");
        this.getAllNhanVienByIdBoPhan();
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Xoá thất bại");
      }
    );
  }
  history(id) {
    // const dialogRef = this.dialog.open(HistoryOrderComponent, {
    //   data: {
    //     bookingHistory: this.bookingResponses.find((value) => {
    //       if (value.id === id) {
    //         return value.bookingHistoryResponses;
    //       }
    //     }),
    //   },
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadOrder(id: number) {
    if (id) {
      this.booking = this.bookingResponses.find((options) => options.id === id);
      this.image = JSON.parse(
        this.bookingResponses.find((options) => options.id === id).identityCard
      );
    }
  }
}
