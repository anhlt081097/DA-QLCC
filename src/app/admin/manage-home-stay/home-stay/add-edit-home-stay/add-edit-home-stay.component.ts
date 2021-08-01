import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HomeStayRequest} from '../../../../shared/model/home-stay/home-stay-request';
import {PlaceResponse} from '../../../../shared/model/place/place-response';
import {HomeStayService} from '../../../../shared/service/homestay.service';
import {PlaceService} from '../../../../shared/service/place.service';
import '../../../../shared/ckeditor.loader';
import 'ckeditor';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastService} from '../../../../shared/service/toast.service';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {DetailPlaceResponse} from "../../../../shared/model/detail-place/detail-place-response";
import {DetailPlaceService} from "../../../../shared/service/detail-place.service";
import {DetailPlaceRequest} from "../../../../shared/model/detail-place/detail-place-request";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

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

export interface Place {
  id: number;
  placeName: string;
  image: string;
}

@Component({
  selector: 'ngx-add-home-stay',
  templateUrl: './add-edit-home-stay.component.html',
  styleUrls: ['./add-edit-home-stay.component.scss'],
})
export class AddEditHomeStayComponent implements OnInit {
  panelOpenState = false;
  homeStayForm: FormGroup;
  homeStayRequest: HomeStayRequest;
  detailPlaceRequest: DetailPlaceRequest;
  idHomeStay: number;
  filteredOptionsVillage: Observable<Village[]>;
  filteredOptionsCity: Observable<City[]>;
  filteredOptionsDistrict: Observable<District[]>;
  optionsVillage: Village[] = this.data.village;
  optionsCity: City[] = this.data.city;
  optionsDistrict: District[] = this.data.district;
  image: Images[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredPlace: Observable<string[]>;
  detailPlaces: DetailPlaceResponse[];
  allPlace: Place[] = this.data.places;
  inputPlaceName = new FormControl();
  @ViewChild('InputPlace') InputPlace: ElementRef;

  constructor(
    private toastrService: ToastService,
    private homeStayService: HomeStayService,
    private placeService: PlaceService,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<AddEditHomeStayComponent>,
    private detailPlaceService: DetailPlaceService,
  ) {
    this.idHomeStay = this.data.id;
  }

  ngOnInit(): void {
    this.homeStayRequest = {
      id: undefined,
      homeStayName: null,
      description: null,
      image: null,
      villageName: undefined,
      cityName: undefined,
      districtName: undefined,
      phone: null,
    };
    this.detailPlaceRequest = {
      id: undefined,
      id_homeStay: undefined,
      id_place: undefined,
    };
    this.homeStayForm = new FormGroup({
      id: new FormControl(null),
      homeStayName: new FormControl(null, Validators.required),
      villageName: new FormControl(null, Validators.required),
      cityName: new FormControl(null, Validators.required),
      districtName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      image: new FormControl('[]'),
    });
    this.filteredPlace = this.inputPlaceName.valueChanges.pipe(
      startWith(null),
      map((view: string | null) =>
        view ? this._filterPlace(view) : this.allPlace.slice(),
      ),
    );
    this.filterCity();
    this.filterDistrict();
    this.filterVillage();
    this.homeStayForm.get('districtName').disable();
    this.homeStayForm.get('villageName').disable();
    if (this.data.id) {
      this.getHomeStayById();
      this.getAllDetailPlace();
    }
  }

  private _filterPlace(value: any): any[] {
    return this.allPlace.filter((fruit) =>
      fruit.placeName.toString().toLowerCase().includes(value.toString().toLowerCase()),
    );
  }


  removePlace(id): void {
    this.deleteDetailPlace(id);
  }

  selectedPlace(event: MatAutocompleteSelectedEvent): void {
    this.createDetailPlace(event.option.value);
    this.InputPlace.nativeElement.value = '';
    this.inputPlaceName.setValue(null);
  }

  getAllDetailPlace() {
    this.detailPlaceService.getAllDetailPlace(this.idHomeStay).subscribe(
      (data) => {
        this.detailPlaces = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  createDetailPlace(value) {
    this.detailPlaceRequest.id_homeStay = this.idHomeStay;
    this.detailPlaceRequest.id_place = value;
    this.detailPlaceService
      .createDetailPlace(this.detailPlaceRequest)
      .subscribe(
        (data) => {
          this.getAllDetailPlace();
        },
        (error) => {
          throwError(error);
        },
      );
  }

  deleteDetailPlace(id: number) {
    this.detailPlaceService.deleteDetailPlace(id).subscribe(
      (data) => {
        this.getAllDetailPlace();
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

  getHomeStayById() {
    this.homeStayService.getHomeStayById(this.data.id).subscribe(
      (data) => {
        this.homeStayForm.patchValue(data);
        // this.image = data.image.split(',').map(function (item) {
        //   return {image: item, thumbImage: item};
        // });
        this.image = JSON.parse(data.image);
      },
      (error) => {
        throwError(error);
      },
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

  submitForm() {
    if (this.idHomeStay) {
      this.updateHomeStay();
    } else {
      this.createHomeStay();
    }
  }

  updateHomeStay() {
    this.homeStayRequest.id = this.homeStayForm.get('id').value;
    this.homeStayRequest.homeStayName = this.homeStayForm.get(
      'homeStayName',
    ).value;
    this.homeStayRequest.villageName = this.homeStayForm.get('villageName').value;
    this.homeStayRequest.cityName = this.homeStayForm.get('cityName').value;
    this.homeStayRequest.districtName = this.homeStayForm.get('districtName').value;
    this.homeStayRequest.description = this.homeStayForm.get(
      'description',
    ).value;
    this.homeStayRequest.image = this.homeStayForm.get('image').value;
    this.homeStayRequest.phone = this.homeStayForm.get('phone').value;

    this.homeStayService.updateHomeStay(this.homeStayRequest).subscribe(
      (data) => {
        this.toastrService.showToast('success', 'Thành công', 'Sửa thành công');
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast('danger', 'Thất bại', 'Sửa thất bại');
      },
    );
  }

  createHomeStay() {
    this.homeStayRequest.homeStayName = this.homeStayForm.get(
      'homeStayName',
    ).value;
    this.homeStayRequest.villageName = this.homeStayForm.get('villageName').value;
    this.homeStayRequest.cityName = this.homeStayForm.get('cityName').value;
    this.homeStayRequest.districtName = this.homeStayForm.get('districtName').value;
    this.homeStayRequest.description = this.homeStayForm.get(
      'description',
    ).value;
    this.homeStayRequest.image = this.homeStayForm.get('image').value;
    this.homeStayRequest.phone = this.homeStayForm.get('phone').value;
    this.homeStayService.createHomeStay(this.homeStayRequest).subscribe(
      (data) => {
        this.idHomeStay = data;
        this.toastrService.showToast('success', 'Thành công', 'Thêm thành công');
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast('danger', 'Thất bại', 'Thêm thất bại');
      },
    );
  }

  deleteImage($event: number) {
    this.image.splice($event, 1);
    this.homeStayForm.get('image').setValue(JSON.stringify(this.image.map((function (item) {
      return {image: item.image, thumbImage: item.thumbImage};
    }))));
  }

  getImage($event: string) {
    const data: Images = <Images>{image: $event, thumbImage: $event};
    this.image.push(data);
    this.homeStayForm.get('image').setValue(JSON.stringify(this.image.map((function (item) {
      return {image: item.image, thumbImage: item.thumbImage};
    }))));
  }

  clone() {
    this.dialogRef.close(true);
  }
}
