import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, throwError} from "rxjs";
import {HomeStayService} from "../../shared/service/homestay.service";
import {map, startWith} from "rxjs/operators";
import {HomeStayResponse} from "../../shared/model/home-stay/home-stay-response";
import {AddressService} from "../../shared/service/address.service";
import {PlaceResponse} from "../../shared/model/place/place-response";
import {PlaceService} from "../../shared/service/place.service";

export interface Village {
  id: number;
  villageName: string;
  type: string;
  districtName: string;
}

export interface City {
  id: number;
  cityName: string;
  type: string;
}

export interface District {
  id: number;
  districtName: string;
  type: string;
  cityName: string;
}

export class Images {
  image: string;
  thumbImage: string;
}

export class ListImages {
  id: number;
  image: Images[];
}

@Component({
  selector: 'ngx-homestay-user',
  templateUrl: './homestay-user.component.html',
  styleUrls: ['./homestay-user.component.scss']
})
export class HomestayUserComponent implements OnInit {
  homeStayForm: FormGroup;
  listHomeStay: HomeStayResponse[];
  filteredOptionsVillage: Observable<Village[]>;
  filteredOptionsCity: Observable<City[]>;
  filteredOptionsDistrict: Observable<District[]>;
  optionsVillage: Village[] = [];
  optionsCity: City[] = [];
  optionsDistrict: District [] = [];
  places: PlaceResponse[];
  image: Images[] = [];
  listImage: ListImages[] = [];

  constructor(private homeStayService: HomeStayService, private addressService: AddressService, private placeService: PlaceService) {

  }

  ngOnInit(): void {
    this.getAllVillage();
    this.getAllDistrict();
    this.getAllCity();
    this.getAllHomeStay();
    this.getAllPlace();
    this.homeStayForm = new FormGroup({
      villageName: new FormControl(''),
      cityName: new FormControl(''),
      districtName: new FormControl(''),
      placeName: new FormControl(''),
    });
    this.filterCity();
    this.filterDistrict();
    this.filterVillage();
    this.homeStayForm.get('districtName').disable();
    this.homeStayForm.get('villageName').disable();
  }

  private getAllPlace() {
    this.placeService.getAllPlace().subscribe(
      (data) => {
        this.places = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getImage(id: number): string {
    this.image = this.listImage.find((options) => options.id === id).image;
    const image = this.image.map(value => {
      return value.image;
    });
    return image[0];
  }

  getAllHomeStay() {
    this.homeStayService.getAllHomeStay().subscribe(
      (data) => {
        this.listHomeStay = data;
        this.listImage = data.map(function (item) {
          return {id: item.id, image: JSON.parse(item.image)};
        });
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getAllVillage() {
    this.addressService.getAllVillage().subscribe(
      (data) => {
        this.optionsVillage = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getAllDistrict() {
    this.addressService.getAllDistrict().subscribe(
      (data) => {
        this.optionsDistrict = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getAllCity() {
    this.addressService.getAllCity().subscribe(
      (data) => {
        this.optionsCity = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  filterCity() {
    this.filteredOptionsCity = this.homeStayForm
      .get('cityName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.name)),
        map((name) => (name ? this._filterCity(name) : this.optionsCity.slice())),
      );
  }

  filterDistrict() {
    this.filteredOptionsDistrict = this.homeStayForm
      .get('districtName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.name)),
        map((name) => (name ? this._filterDistrict(name, this.homeStayForm.get('cityName').value) : this._filterDistrictFull(this.homeStayForm.get('cityName').value))),
      );
  }

  filterVillage() {
    this.filteredOptionsVillage = this.homeStayForm
      .get('villageName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.name)),
        map((name) => (name ? this._filterVillage(name, this.homeStayForm.get('districtName').value) : this._filterVillageFull(this.homeStayForm.get('districtName').value))),
      );
  }

  displayFnCity(name: string) {
    if (name) {
      return this.optionsCity.find((options) => options.cityName === name).cityName;
    }
  }

  displayFnDistrict(name: string) {
    if (name) {
      return this.optionsDistrict.find((options) => options.districtName === name).districtName;
    }
  }

  displayFnVillage(name: string) {
    if (name) {
      return this.optionsVillage.find((options) => options.villageName === name).villageName;
    }
  }

  private _filterCity(name: string): City[] {
    this.listHomeStay = this._filterHomeStay();
    this.filterDistrict();
    const filterValue = name.toLowerCase();
    if (this.optionsCity.filter(
      (option) => option.cityName.toLowerCase() === filterValue,
    ).length === 1) {
      this.homeStayForm.get('districtName').enable();
    } else {
      this.homeStayForm.get('districtName').setValue('');
      this.homeStayForm.get('villageName').setValue('');
      this.homeStayForm.get('districtName').disable();
      this.homeStayForm.get('villageName').disable();
    }
    return this.optionsCity.filter(
      (option) => option.cityName.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  private _filterDistrict(name: string, city: string): District[] {
    this.listHomeStay = this._filterHomeStay();
    this.filterVillage();
    const filterValue = name.toLowerCase();
    const filterValue2 = city?.toLowerCase();
    if (this.optionsDistrict.filter(
      (option) => option.districtName.toLowerCase() === filterValue,
    ).length === 1) {
      this.homeStayForm.get('villageName').enable();
    } else {
      this.homeStayForm.get('villageName').setValue('');
      this.homeStayForm.get('villageName').disable();
    }
    return this.optionsDistrict.filter(
      (option) =>
        option.cityName.toLowerCase() === filterValue2 &&
        option.districtName.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  private _filterDistrictFull(city: string): District[] {
    const filterValue = city?.toLowerCase();
    return this.optionsDistrict.filter(
      (option) =>
        option.cityName.toLowerCase() === filterValue,
    );
  }

  private _filterVillage(name: string, district: string): Village[] {
    this.listHomeStay = this._filterHomeStay();
    const filterValue = name.toLowerCase();
    const filterValue2 = district?.toLowerCase();
    return this.optionsVillage.filter(
      (option) =>
        option.districtName.toLowerCase() === filterValue2 &&
        option.villageName.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  private _filterVillageFull(district: string): Village[] {
    const filterValue = district?.toLowerCase();
    return this.optionsVillage.filter(
      (option) =>
        option.districtName.toLowerCase() === filterValue,
    );
  }

  private _filterHomeStay(): HomeStayResponse[] {
    const city = this.homeStayForm.get('city')?.value;
    const district = this.homeStayForm.get('district')?.value;
    const village = this.homeStayForm.get('village')?.value;
    return this.listHomeStay.filter(
      (option) =>
        option.villageName.toLowerCase() === village &&
        option.districtName.toLowerCase() === district &&
        option.cityName.toLowerCase() === city,
    );
    // this.listHomeStay.slice();
  }


}
