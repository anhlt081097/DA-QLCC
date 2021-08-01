import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { BookingResponse } from "../../../shared/model/booking/booking-response";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BookingService } from "../../../shared/service/booking.service";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
@Component({
  selector: "ngx-order-user",
  templateUrl: "./order-user.component.html",
  styleUrls: ["./order-user.component.scss"],
})
export class OrderUserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "id",
    "fullname",
    "dateIn",
    "dateOut",
    "price",
    "creatorName",
    "houseName",
    "status",
    "action",
  ];
  dataSource = new MatTableDataSource();
  bookingResponses: BookingResponse[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  order: BookingResponse;

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllBooking();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllBooking() {
    this.bookingService.getAllMember().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.bookingResponses = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  history(id) {
    // const dialogRef = this.dialog.open(HistoryOrderComponent, {
    //   data: {
    //     bookingHistory: this.bookingResponses.find(value => {
    //       if (value.id === id) {
    //         return value.bookingHistoryResponses;
    //       }
    //     }),
    //   },
    // });
  }

  loadOrder(id: number) {
    if (id) {
      this.order = this.bookingResponses.find((options) => options.id === id);
    }
  }
}
