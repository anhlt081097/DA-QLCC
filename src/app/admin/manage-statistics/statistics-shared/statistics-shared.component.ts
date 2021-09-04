import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { throwError } from "rxjs";
import { EmployeeResponse } from "../../../shared/model/employee/employee-response";
import { DashBoardService } from "../../../shared/service/dashBoard/dash-board.service";
import { ToastService } from "../../../shared/service/toast.service";
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
import { FormControl } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import { AuthService } from "../../../shared/service/auth.service";
import { ThongBaoService } from "../../../shared/service/thongBao/thong-bao.service";

export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
const moment = _rollupMoment || _moment;
@Component({
  selector: "ngx-statistics-shared",
  templateUrl: "./statistics-shared.component.html",
  styleUrls: ["./statistics-shared.component.scss"],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class StatisticsSharedComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  data = new MatTableDataSource();
  columnsToDisplay = ["image", "fullName", "ngaySinh", "canHo", "id"];
  expandedElement: EmployeeResponse | null;
  date = new FormControl(moment());
  date2 = new FormControl(moment());
  role: string;
  thongBaoChung: any;
  thongBaoRieng: any;
  constructor(
    private dashBoardService: DashBoardService,
    private toastrService: ToastService,
    private authService: AuthService,
    private thongBaoService: ThongBaoService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.getAllSinhNhat();
    if (this.role == "User") {
      this.getAllPost();
      this.getAllPostRieng();
    }
  }
  daDoc(data: any) {
    data.trangThai = true;
    this.thongBaoService.updateThongBaoRieng(data).subscribe((res) => {
      this.getAllPostRieng();
    });
  }
  getAllPost() {
    this.thongBaoService.getAllThongBao().subscribe(
      (data) => {
        console.log(data);
        this.thongBaoChung = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getAllPostRieng() {
    this.thongBaoService
      .getAllThongBaoRiengByCanHo(this.authService.getIdCanHo())
      .subscribe(
        (data) => {
          console.log(data);
          this.thongBaoRieng = data;
        },
        (error) => {
          throwError(error);
        }
      );
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    console.log(this.date.value.month() + 1);
    console.log(this.date.value.year());
    datepicker.close();
  }
  chosenYearHandler2(normalizedYear: Moment) {
    const ctrlValue = this.date2.value;
    ctrlValue.year(normalizedYear.year());
    this.date2.setValue(ctrlValue);
  }

  chosenMonthHandler2(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date2.value;
    ctrlValue.month(normalizedMonth.month());
    this.date2.setValue(ctrlValue);
    datepicker.close();
  }

  convertDateToTimeStamp(date: any) {
    return new Date(date[0], date[1] - 1, date[2]);
  }
  guiChucMung(id: any) {
    this.dashBoardService.guiChucMung(id).subscribe(
      (data) => {
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Gửi lời chúc thành công"
        );
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast(
          "danger",
          "Thất bại",
          "Gửi lời chúc thất bại"
        );
      }
    );
  }
  private getAllSinhNhat() {
    this.dashBoardService.getAllSinhNhat().subscribe(
      (data) => {
        this.data.data = data;
        console.log("Sinh nhật");
        console.log(data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  ngAfterViewInit() {
    this.data.paginator = this.paginator.toArray()[0];
    this.data.sort = this.sort.toArray()[0];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }
}
