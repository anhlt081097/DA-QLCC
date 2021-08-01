import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {throwError} from "rxjs";
import {HouseService} from "../../shared/service/house.service";
import {HouseResponse} from "../../shared/model/house/house-response";
import {HomeStayResponse} from "../../shared/model/home-stay/home-stay-response";
import {HomeStayService} from "../../shared/service/homestay.service";
import {DetailPlaceResponse} from "../../shared/model/detail-place/detail-place-response";
import {DetailPlaceService} from "../../shared/service/detail-place.service";
import {FormControl, FormGroup} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";

export interface Image {
  image: string;
  thumbImage: string;
}

export class Image2 {
  image: string;
  thumbImage: string;
}

export class ListImages {
  id: number;
  image: Image2[];
}

@Component({
  selector: 'ngx-house-user',
  templateUrl: './house-user.component.html',
  styleUrls: ['./house-user.component.scss']
})
export class HouseUserComponent implements OnInit {
  houses: HouseResponse[];
  homeStays: HomeStayResponse;
  image: Image[] = [];
  image2: Image2[] = [];
  listImage: ListImages[] = [];
  detailPlaces: DetailPlaceResponse[];
  idHomeStay: number;
  @Input() home: boolean = false;
  dateForm: FormGroup;
  today = new Date();

  constructor(private activateRoute: ActivatedRoute,
              private houseService: HouseService,
              private homeStayService: HomeStayService,
              private detailPlaceService: DetailPlaceService,
              private router: Router, private _adapter: DateAdapter<any>,
  ) {
    this._adapter.setLocale('vi');
    this.idHomeStay = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.dateForm = new FormGroup({
      dateIn: new FormControl({value: null, disabled: true}),
      dateOut: new FormControl({value: null, disabled: true}),
      capacity: new FormControl(null),
    });
    if (this.activateRoute.snapshot.params.id !== undefined
    ) {
      this.getHomeStayById();
      this.getAllDetailPlace();
      this.getHouseByHomeStay();
    } else {
      this.getHouseAll();
    }
  }

  getHomeStayById() {
    this.homeStayService
      .getHomeStayById(this.activateRoute.snapshot.params.id)
      .subscribe(
        (data) => {
          this.homeStays = data;
          this.image = JSON.parse(data.image);
        },
        (error) => {
          throwError(error);
          this.router.navigateByUrl('/user');
        },
      );
  }

  getAllDetailPlace() {
    this.detailPlaceService.getAllDetailPlace(this.activateRoute.snapshot.params.id).subscribe(
      (data) => {
        this.detailPlaces = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getHouseAll() {
    this.houseService
      .getAllHouseByMember()
      .subscribe(
        (data) => {
          this.houses = data;
          this.listImage = data.map(function (item) {
            return {id: item.id, image: JSON.parse(item.image)};
          });
        },
        (error) => {
          throwError(error);
        },
      );
  }

  getImage(id: number):
    string {
    this.image2 = this.listImage.find((options) => options.id === id).image;
    const image = this.image2.map(value => {
      return value.image;
    });
    return image[0];
  }


  getHouseByHomeStay() {
    this.houseService
      .getAllHouseByHomeStay(this.activateRoute.snapshot.params.id)
      .subscribe(
        (data) => {
          this.houses = data;
          this.listImage = data.map(function (item) {
            return {id: item.id, image: JSON.parse(item.image)};
          });
        },
        (error) => {
          throwError(error);
        },
      );
  }
}
