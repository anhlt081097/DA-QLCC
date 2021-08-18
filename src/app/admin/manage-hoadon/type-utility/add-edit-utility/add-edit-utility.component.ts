import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { TypeUtilityResponse } from '../../../../shared/model/type-utility/type-utility-response';
import { UtilityRequest } from '../../../../shared/model/utility/utility-request';
import { TypeUtilityService } from '../../../../shared/service/type-utility.service';
import { UtilityService } from '../../../../shared/service/utility.service';
import {ToastService} from '../../../../shared/service/toast.service';

@Component({
  selector: 'ngx-add-edit-utility',
  templateUrl: './add-edit-utility.component.html',
  styleUrls: ['./add-edit-utility.component.scss'],
})
export class AddEditUtilityComponent implements OnInit {
  utilityForm: FormGroup;
  utilityRequest: UtilityRequest;
  idUtility: number;
  idType: number;
  typeUtilitys: TypeUtilityResponse[];

  constructor(
    private toastrService: ToastService,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<AddEditUtilityComponent>,
    private utilityService: UtilityService,
    private typeUtilityService: TypeUtilityService,
  ) {
    if ( data.idUtility === null) {
      this.idType = data.idType;
    } else if ( data.idUtility !== null) {
      this.idUtility = data.idUtility;
    }
  }

  ngOnInit(): void {
    this.utilityRequest = {
      id: undefined,
      utilityName: null,
      id_typeUtility: undefined,
      image: null,
    };
    this.utilityForm = new FormGroup({
      id: new FormControl(null),
      utilityName: new FormControl(null, Validators.required),
      id_typeUtility: new FormControl(null),
      image: new FormControl(null),
    });
    if (this.idType) {
      this.utilityForm.get('id_typeUtility').setValue(this.idType);
    }
    if (this.idUtility) {
      this.getAllTypeUtility();
      this.getUtilityById();
    }
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

  getUtilityById() {
    this.utilityService.getUtilityById(this.idUtility).subscribe(
      (data) => {
        this.utilityForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  submitAction() {
    if (this.idUtility) {
      this.updateUtility();
    }
    if (this.idType) {
      this.createUtility();
    }
  }

  createUtility() {
    this.utilityRequest.utilityName = this.utilityForm.get('utilityName').value;
    this.utilityRequest.id_typeUtility = this.utilityForm.get(
      'id_typeUtility',
    ).value;
    this.utilityRequest.image = this.utilityForm.get('image').value;

    this.utilityService.createUtility(this.utilityRequest).subscribe(
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

  updateUtility() {
    this.utilityRequest.id = this.utilityForm.get('id').value;
    this.utilityRequest.utilityName = this.utilityForm.get('utilityName').value;
    this.utilityRequest.id_typeUtility = this.utilityForm.get(
      'id_typeUtility',
    ).value;
    this.utilityRequest.image = this.utilityForm.get('image').value;
    this.utilityService.updateUtility(this.utilityRequest).subscribe(
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

  getImage(url: string) {
    this.utilityForm.get('image').setValue(url);
  }

}
