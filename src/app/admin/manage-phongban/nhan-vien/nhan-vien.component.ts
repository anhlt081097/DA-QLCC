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
import { Images } from "../../manage-home-stay/home-stay/add-edit-home-stay/add-edit-home-stay.component";
import { AddEmployeeComponent } from "../../manage-user/employee/add-canho/add-canho.component";

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
  constructor(
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private toastrService: ToastService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.getAllTransaction();
    this.id = this.activateRoute.snapshot.params.id;
    this.dataSource.data = [
      {
        id: 1,
        hoVaTen: "Lê Tuấn Anh",
        soDienThoai: "0967789821",
        email: "anhlt@gmail.com",
        soNhanVien: 20,
      },
    ];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openAdd() {
    const dialogRef = this.dialog.open(AddEmployeeComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // this.getAllEmployee();
      }
    });
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
