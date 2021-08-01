import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { throwError } from 'rxjs';
import { CityRequest } from '../../../../shared/model/city/city-request';
import { AddressService } from '../../../../shared/service/address.service';
import {ToastService} from '../../../../shared/service/toast.service';

@Component({
  selector: 'ngx-add-edit-city',
  templateUrl: './add-edit-city.component.html',
  styleUrls: ['./add-edit-city.component.scss'],
})
export class AddEditCityComponent implements OnInit {
  cityForm: FormGroup;
  cityRequest: CityRequest;
  idCity: number;
  constructor(
    private addressService: AddressService,
    private dialogRef: MatDialogRef<AddEditCityComponent>,
    @Inject(MAT_DIALOG_DATA) private id: number,
    private toastrService: ToastService,
  ) {
    this.idCity = id;
  }

  ngOnInit(): void {
    this.cityRequest = {
      id: undefined,
      cityName: null,
      type: null,
    };
    this.cityForm = new FormGroup({
      id: new FormControl(null),
      cityName: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });
    if (this.id) {
      this.getCityById();
    }
  }

  getCityById() {
    this.addressService.getCityById(this.id).subscribe(
      (data) => {
        this.cityForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  submitAction() {
    if (this.id) {
      this.updateCity();
    } else {
      this.createCity();
    }
  }

  createCity() {
    this.cityRequest.cityName = this.cityForm.get('cityName').value;
    this.cityRequest.type = this.cityForm.get('type').value;
    this.addressService.createCity(this.cityRequest).subscribe(
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

  updateCity() {
    this.cityRequest.id = this.cityForm.get('id').value;
    this.cityRequest.cityName = this.cityForm.get('cityName').value;
    this.cityRequest.type = this.cityForm.get('type').value;

    this.addressService.updateCity(this.cityRequest).subscribe(
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
