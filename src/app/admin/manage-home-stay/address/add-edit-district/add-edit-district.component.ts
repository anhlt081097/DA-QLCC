import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Observable, throwError} from 'rxjs';
import { DistrictRequest } from '../../../../shared/model/district/district-request';
import { AddressService } from '../../../../shared/service/address.service';
import {ToastService} from "../../../../shared/service/toast.service";
import {map, startWith} from "rxjs/operators";

export interface City {
  id: number;
  cityName: string;
  type: string;
}

@Component({
  selector: 'ngx-add-edit-district',
  templateUrl: './add-edit-district.component.html',
  styleUrls: ['./add-edit-district.component.scss'],
})
export class AddEditDistrictComponent implements OnInit {
  districtForm: FormGroup;
  districtRequest: DistrictRequest;
  idDistrict: number;
  filteredOptionsEdit: Observable<City[]>;
  options: City[] = this.data.citys.data;

  constructor(
    private addressService: AddressService,
    private dialogRef: MatDialogRef<AddEditDistrictComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private toastrService: ToastService,
  ) {
    this.idDistrict = this.data.id;
  }

  ngOnInit(): void {
    this.districtRequest = {
      id: undefined,
      districtName: null,
      type: null,
      cityName: null,
    };
    this.districtForm = new FormGroup({
      id: new FormControl(null),
      districtName: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      cityName: new FormControl(null, Validators.required),
    });
    if (this.data.id) {
      this.getDistrictById();
    }
    this.filteredOptionsEdit = this.districtForm
      .get('cityName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.name)),
        map((name) => (name ? this._filter(name) : this.options.slice())),
      );
  }

  displayFn(name: string) {
    if (name) {
      return this.options.find((options) => options.cityName === name).cityName;
    }
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(
      (option) => option.cityName.toLowerCase().indexOf(filterValue) === 0,
    );
  }


  getDistrictById() {
    this.addressService.getDistrictById(this.data.id).subscribe(
      (data) => {
        this.districtForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  submitAction() {
    if (this.data.id) {
      this.updateDistrict();
    } else {
      this.createDistrict();
    }
  }

  createDistrict() {
    this.districtRequest.districtName = this.districtForm.get(
      'districtName',
    ).value;
    this.districtRequest.type = this.districtForm.get('type').value;
    this.districtRequest.cityName = this.districtForm.get('cityName').value;
    this.addressService.createDistrict(this.districtRequest).subscribe(
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

  updateDistrict() {
    this.districtRequest.id = this.districtForm.get('id').value;
    this.districtRequest.districtName = this.districtForm.get(
      'districtName',
    ).value;
    this.districtRequest.type = this.districtForm.get('type').value;
    this.districtRequest.cityName = this.districtForm.get('cityName').value;
    this.addressService.updateDistrict(this.districtRequest).subscribe(
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
