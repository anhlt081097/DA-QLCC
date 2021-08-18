import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {throwError} from 'rxjs';
import {HomeStayResponse} from '../../../../shared/model/home-stay/home-stay-response';
import {HomeStayService} from '../../../../shared/service/homestay.service';
import {AddEditHomeStayComponent} from '../add-edit-home-stay/add-edit-home-stay.component';
import {MatDialog} from '@angular/material/dialog';
import {VillageResponse} from '../../../../shared/model/village/village-response';
import {CityResponse} from '../../../../shared/model/city/city-response';
import {DistrictResponse} from '../../../../shared/model/district/district-response';
import {AddressService} from '../../../../shared/service/address.service';
import {DetailPlaceResponse} from '../../../../shared/model/detail-place/detail-place-response';
import {DetailPlaceService} from '../../../../shared/service/detail-place.service';
import {PlaceResponse} from "../../../../shared/model/place/place-response";
import {PlaceService} from "../../../../shared/service/place.service";
import {HouseService} from "../../../../shared/service/house.service";

export interface Image {
  image: string;
  thumbImage: string;
}

@Component({
  selector: 'ngx-detail-homestay',
  templateUrl: './detail-homestay.component.html',
  styleUrls: ['./detail-homestay.component.scss'],
})
export class DetailHomestayComponent implements OnInit {
  homeStayResponse: HomeStayResponse;
  villages: VillageResponse[];
  citys: CityResponse[];
  districts: DistrictResponse[];
  image: Image[] = [];
  detailPlaces: DetailPlaceResponse[];
  places: PlaceResponse[];

  constructor(
    private activateRoute: ActivatedRoute,
    private homeStayService: HomeStayService,
    private dialog: MatDialog,
    private addressService: AddressService,
    private detailPlaceService: DetailPlaceService,
    private placeService: PlaceService,
     private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getHomeStayById();
    this.getAllVillage();
    this.getAllDistrict();
    this.getAllCity();
    this.getAllPlace();
    this.getAllDetailPlace();
  }

  private getHomeStayById() {
    this.homeStayService
      .getHomeStayById(this.activateRoute.snapshot.params.id)
      .subscribe(
        (data) => {
          this.homeStayResponse = data;
          this.image = JSON.parse(data.image);
        },
        (error) => {
          throwError(error);
          this.router.navigateByUrl('/admin');
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

  getAllVillage() {
    this.addressService.getAllVillage().subscribe(
      (data) => {
        this.villages = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getAllDistrict() {
    this.addressService.getAllDistrict().subscribe(
      (data) => {
        this.districts = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getAllCity() {
    this.addressService.getAllCity().subscribe(
      (data) => {
        this.citys = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getAllPlace() {
    this.placeService.getAllPlace().subscribe(
      (data) => {
        this.places = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  openEdit(id: number) {
    const dialogRef = this.dialog.open(AddEditHomeStayComponent, {
      data: {id: id, village: this.villages, city: this.citys, district: this.districts}, width: '750px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getHomeStayById();
      }
    });
  }

}
