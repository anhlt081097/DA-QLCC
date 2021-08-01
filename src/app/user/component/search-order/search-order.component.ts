import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { BookingResponse } from "../../../shared/model/booking/booking-response";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BookingService } from "../../../shared/service/booking.service";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "ngx-search-order",
  templateUrl: "./search-order.component.html",
  styleUrls: ["./search-order.component.scss"],
})
export class SearchOrderComponent implements OnInit {
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
  searchForm: FormGroup;
  dataSource = new MatTableDataSource();
  bookingResponses: BookingResponse[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  order: BookingResponse;
  status: boolean = false;

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      phone: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required),
    });
  }

  searchBooking() {
    this.bookingService
      .seachBooking(
        this.searchForm.get("phone").value,
        this.searchForm.get("id").value
      )
      .subscribe(
        (data) => {
          this.dataSource.data = data;
          this.bookingResponses = data;
          this.status = false;
        },
        (error) => {
          throwError(error);
          this.status = true;
        }
      );
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
