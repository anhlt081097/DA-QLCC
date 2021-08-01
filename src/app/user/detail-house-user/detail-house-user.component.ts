import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HouseService} from '../../shared/service/house.service';
import {throwError} from 'rxjs';
import {HouseResponse} from '../../shared/model/house/house-response';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FeedBackRequest} from '../../shared/model/feed-back/feed-back-request';
import {FeedBackService} from '../../shared/service/feed-back.service';
import {ToastService} from '../../shared/service/toast.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogFeedBackComponent} from '../../shared/component/dialog-feedback/dialog-feedback.component';
import {DetailViewResponse} from '../../shared/model/detail-view/detail-view-response';
import {DetailUtilityResponse} from '../../shared/model/detail-utility/detail-utility-response';
import {DetailUtilityService} from '../../shared/service/detail-utility.service';
import {DetailViewService} from '../../shared/service/detail-view.service';
import {HomeStayResponse} from "../../shared/model/home-stay/home-stay-response";
import {HomeStayService} from "../../shared/service/homestay.service";
import {TypeUtilityService} from "../../shared/service/type-utility.service";
import {TypeUtilityResponse} from "../../shared/model/type-utility/type-utility-response";
import {UtilityResponse} from "../../shared/model/utility/utility-response";
import {AuthService} from "../../shared/service/auth.service";
import {BookingService} from "../../shared/service/booking.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DateAdapter} from "@angular/material/core";
import {FormBookingComponent} from "../../shared/component/form-booking/form-booking.component";
import {DatePipe} from "@angular/common";
import {DialogInfoBookComponent} from "../../shared/component/dialog-info-book/dialog-info-book.component";

export class Image {
  image: string;
  thumbImage: string;
}

@Component({
  selector: 'ngx-detail-house-user',
  templateUrl: './detail-house-user.component.html',
  styleUrls: ['./detail-house-user.component.scss'],
})
export class DetailHouseUserComponent implements OnInit {
  houses: HouseResponse;
  detailViews: DetailViewResponse[];
  detailUtilitys: DetailUtilityResponse[];
  detailUtilitysSearch: DetailUtilityResponse[];
  typeUtilitys: TypeUtilityResponse[];
  feedBackRequest: FeedBackRequest;
  image: Image[] = [];
  feedBackForm: FormGroup;
  dateFrom: FormGroup;
  homeStay: HomeStayResponse;
  userName: string;
  utilitys: UtilityResponse[];
  dateLock: string[] = [];
  today = new Date();

  constructor(private activateRoute: ActivatedRoute,
              private houseService: HouseService, private router: Router,
              private feedBackService: FeedBackService,
              private bookingService: BookingService,
              private toastService: ToastService,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private detailUtilityService: DetailUtilityService,
              private typeUtilityService: TypeUtilityService,
              private detailViewService: DetailViewService,
              private authService: AuthService,
              private homeStayService: HomeStayService,
              private _adapter: DateAdapter<any>) {
    this._adapter.setLocale('vi');
  }

  ngOnInit(): void {
    this.authService.username.subscribe(
      (data: string) => (this.userName = data),
    );
    this.userName = this.authService.getUserName();
    this.loadDateLock();
    this.getAllTypeUtility();
    this.getAllDetailView();
    this.getAllDetailUtility();
    this.getHouseById();
    this.feedBackRequest = {
      id: undefined,
      content: null,
      id_house: undefined,
      rate: undefined,
    };
    this.feedBackForm = new FormGroup({
      content: new FormControl(null),
      rate: new FormControl(null, Validators.required),
    });
    this.dateFrom = new FormGroup({
      dateIn: new FormControl({value: null, disabled: true}),
      dateOut: new FormControl({value: null, disabled: true}),
    });
  }

  loadDateLock() {
    this.bookingService.checkBookingByHouse(this.activateRoute.snapshot.params.id).subscribe(
      (data) => {
        this.dateLock = data;
      },
      (error) => {
      },
    );
  }

  getAllDetailView() {
    this.detailViewService.getAllDetailView(this.activateRoute.snapshot.params.id).subscribe(
      (data) => {
        this.detailViews = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getAllTypeUtility() {
    this.typeUtilityService.getAllTypeUtility().subscribe(
      (data) => {
        this.typeUtilitys = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getAllDetailUtility() {
    this.detailUtilityService.getAllDetailUtility(this.activateRoute.snapshot.params.id).subscribe(
      (data) => {
        this.detailUtilitys = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  private getHouseById() {
    this.houseService
      .getHouseById(this.activateRoute.snapshot.params.id)
      .subscribe(
        (data) => {
          this.houses = data;
          this.image = JSON.parse(data.image);
          this.homeStayService
            .getHomeStayById(data.id_homeStay)
            .subscribe(
              (data2) => {
                this.homeStay = data2;
              },
              (error) => {
                throwError(error);
              },
            );
        },
        (error) => {
          throwError(error);
          this.router.navigateByUrl('/user');
        },
      );
  }

  feedback() {
    const dialogRef = this.dialog.open(DialogFeedBackComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.feedBackRequest.rate = this.feedBackForm.get('rate').value;
        this.feedBackRequest.content = this.feedBackForm.get('content').value;
        this.feedBackRequest.id_house = this.activateRoute.snapshot.params.id;
        this.feedBackService.createFeedBack(this.feedBackRequest).subscribe(
          (data) => {
            this.toastService.showToast('success', 'Thành công', 'Đánh giá thành công');
            this.feedBackForm.reset();
            this.getHouseById();
          },
          (error) => {
            throwError(error);
            this.toastService.showToast('danger', 'Thất bại', 'Đánh giá thất bại');
          },
        );
      }
    });
  }


  getDetailUtility(utility: UtilityResponse[]) {
    const a: number[] = utility?.map(function (item) {
      return item.id;
    });
    this.detailUtilitysSearch = this.detailUtilitys.filter(value => a?.includes(value.id_utility));
  }

  getCountUtility(utility: UtilityResponse[]): number {
    const a: number[] = this.detailUtilitys?.map(function (item) {
      return item.id_utility;
    });
    return utility.filter(value => a?.includes(value.id)).length;
  }

  filterDate = (fullDate: Date): boolean => {
    const time = fullDate.getTime();
    return !this.dateLock.find(x => new Date(x).getTime() === time);
  }

  endChange(event: MatDatepickerInputEvent<any>) {
    if (event.value === null) {
    } else {
      const countDate = (new Date(event.value).getTime() - new Date(this.dateFrom.get('dateIn').value).getTime()) / 1000 / 60 / 60 / 24;
      const price = this.houses.price;
      this.houses.price = Number(countDate) * Number(price);
    }
  }

  booking() {
    const dialogRef = this.dialog.open(FormBookingComponent,
      {
        data: {
          idHouse: this.activateRoute.snapshot.params.id,
          price: this.houses.price,
          dateIn: this.datePipe.transform(this.dateFrom.get('dateIn').value, 'yyyy-MM-dd'),
          dateOut: this.datePipe.transform(this.dateFrom.get('dateOut').value, 'yyyy-MM-dd')
        }, width: '1000px',
      });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getHouseById();
        this.loadDateLock();
        this.dateFrom.reset();
        this.feedBackForm.reset();
        const dialogRef2 = this.dialog.open(DialogInfoBookComponent);
      } else {
      }
    });
  }
}
