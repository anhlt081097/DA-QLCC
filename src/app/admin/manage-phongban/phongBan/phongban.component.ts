import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BookingResponse } from "../../../shared/model/booking/booking-response";
import { Images } from "../../manage-dichvu/home-stay/add-edit-home-stay/add-edit-home-stay.component";
import { ToastService } from "../../../shared/service/toast.service";
import { TransactionService } from "../../../shared/service/transaction.service";
import { throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { TransactionResponse } from "../../../shared/model/transaction/transaction.response";
import { PdfComponent } from "../../../shared/component/pdf/pdf.component";
import { EmployeeResponse } from "../../../shared/model/employee/employee-response";
import { AddCanHoComponent } from "../../manage-canho/canho/add-canho/add-canho.component";

@Component({
  selector: "ngx-transaction",
  templateUrl: "./phongban.component.html",
  styleUrls: ["./phongban.component.scss"],
})
export class PhongBanComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "id",
    "fullname",
    "dateIn",
    "dateOut",
    "dateRelease",
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
  constructor(
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private toastrService: ToastService
  ) {}

  ngOnInit(): void {
    // this.getAllTransaction();
    this.dataSource.data = [
      {
        id: 1,
        tenPhongBan: "Vận chuyển",
        nguoiPhuTrach: "Lê Tuấn Anh",
        soDienThoai: "0967789821",
        soNhanVien: 20,
      },
    ];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openAdd() {
    const dialogRef = this.dialog.open(AddCanHoComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // this.getAllEmployee();
      }
    });
  }
  getAllTransaction() {
    this.transactionService.getAllTransaction().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.transactionResponses = data;
        this.bookingResponses = data.map((value) => value.bookingResponse);
      },
      (error) => {
        throwError(error);
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

  generatePdfUrl(id: number) {
    const dialogRef = this.dialog.open(PdfComponent, {
      data: {
        transaction: this.transactionResponses.find((value) => value.id === id),
      },
    });
  }
}
