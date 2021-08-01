import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable, throwError} from 'rxjs';
import {VillageRequest} from '../../../../shared/model/village/village-request';
import {AddressService} from '../../../../shared/service/address.service';
import {ToastService} from '../../../../shared/service/toast.service';
import {map, startWith} from 'rxjs/operators';

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

@Component({
  selector: 'ngx-add-edit-village',
  templateUrl: './add-edit-village.component.html',
  styleUrls: ['./add-edit-village.component.scss'],
})
export class AddEditVillageComponent implements OnInit {
  villageForm: FormGroup;
  villageRequest: VillageRequest;
  idVillage: number;
  filteredOptionsEditDistrict: Observable<District[]>;
  filteredOptionsEditCity: Observable<City[]>;
  optionsCity: City[] = this.data.citys.data;
  optionsDistrict: District[] = this.data.districts.data;

  constructor(
    private addressService: AddressService,
    private dialogRef: MatDialogRef<AddEditVillageComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private toastrService: ToastService,
  ) {
    this.idVillage = this.data.id;
  }

  ngOnInit(): void {
    this.villageRequest = {
      id: undefined,
      villageName: null,
      type: null,
      districtName: null,
      cityName: null,
    };
    this.villageForm = new FormGroup({
      id: new FormControl(null),
      villageName: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      districtName: new FormControl(null, Validators.required),
      cityName: new FormControl(null, Validators.required),
    });
    if (this.data.id) {
      this.getVillageById();
    }
    this.filteredCity();
    this.filteredDistrict();
    this.villageForm.get('districtName').disable();
  }

  filteredCity() {
    this.filteredOptionsEditCity = this.villageForm
      .get('cityName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.name)),
        map((name) => (name ? this._filterCity(name) : this.optionsCity.slice())),
      );
  }

  filteredDistrict() {
    this.filteredOptionsEditDistrict = this.villageForm
      .get('districtName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.name)),
        map((name) => (name ? this._filterDistrict(name, this.villageForm.get('cityName').value)
          : this._filterDistrictFull(this.villageForm.get('cityName').value))),
      );
  }

  private _filterCity(name: string): City[] {
    this.filteredDistrict();
    const filterValue = name.toLowerCase();
    if (this.optionsCity.filter(
      (option) => option.cityName.toLowerCase() === filterValue,
    ).length === 1) {
      this.villageForm.get('districtName').enable();
    } else {
      this.villageForm.get('districtName').setValue('');
      this.villageForm.get('districtName').disable();
    }
    return this.optionsCity.filter(
      (option) => option.cityName.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  private _filterDistrict(name: string, city: string): District[] {
    const filterValue = name.toLowerCase();
    const filterValue2 = city?.toLowerCase();
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

  getAllDistrictByCity(id: number) {
    this.addressService.getDistrictByCity(id).subscribe(
      (data) => {
        this.optionsDistrict = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getVillageById() {
    this.addressService.getVillageById(this.data.id).subscribe(
      (data) => {
        this.villageForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  submitAction() {
    if (this.data.id) {
      this.updateVillage();
    } else {
      this.createVillage();
    }
  }

  createVillage() {
    this.villageRequest.villageName = this.villageForm.get('villageName').value;
    this.villageRequest.type = this.villageForm.get('type').value;
    this.villageRequest.districtName = this.villageForm.get('districtName').value;
    this.villageRequest.cityName = this.villageForm.get('cityName').value;
    this.addressService.createVillage(this.villageRequest).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast('success', 'Thành công', 'Thêm thành công');
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast('danger', 'Thất bại', 'Thêm thất bại');
      },
    );
  }

  updateVillage() {
    this.villageRequest.id = this.villageForm.get('id').value;
    this.villageRequest.villageName = this.villageForm.get('villageName').value;
    this.villageRequest.type = this.villageForm.get('type').value;
    this.villageRequest.districtName = this.villageForm.get('districtName').value;
    this.villageRequest.cityName = this.villageForm.get('cityName').value;
    this.addressService.updateVillage(this.villageRequest).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast('success', 'Thành công', 'Sửa thành công');
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast('danger', 'Thất bại', 'Sửa thất bại');
      },
    );
  }
}
