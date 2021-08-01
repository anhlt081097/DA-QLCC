import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {throwError} from 'rxjs';
import {TypeUtilityRequest} from '../../../../shared/model/type-utility/type-utility-request';
import {TypeUtilityService} from '../../../../shared/service/type-utility.service';
import {ToastService} from "../../../../shared/service/toast.service";

@Component({
  selector: 'ngx-add-edit-type-utility',
  templateUrl: './add-edit-type-utility.component.html',
  styleUrls: ['./add-edit-type-utility.component.scss'],
})
export class AddEditTypeUtilityComponent implements OnInit {
  typeUtilityForm: FormGroup;
  typeUtilityRequest: TypeUtilityRequest;
  idType: number;

  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddEditTypeUtilityComponent>,
    private typeUtilityService: TypeUtilityService,
    @Inject(MAT_DIALOG_DATA) private id: number,
  ) {
    this.idType = id;
  }

  ngOnInit(): void {
    this.typeUtilityRequest = {
      id: undefined,
      typeName: null,
    };
    this.typeUtilityForm = new FormGroup({
      id: new FormControl(null),
      typeName: new FormControl(null, Validators.required),
    });
    if (this.id) {
      this.getTypeUtilityById();
    }
  }

  getTypeUtilityById() {
    this.typeUtilityService.getTypeUtilityById(this.id).subscribe(
      (data) => {
        this.typeUtilityForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  submitAction() {
    if (this.id) {
      this.updateTypeUtility();
    } else {
      this.createTypeUtility();
    }
  }

  createTypeUtility() {
    this.typeUtilityRequest.typeName = this.typeUtilityForm.get(
      'typeName',
    ).value;

    this.typeUtilityService
      .createTypeUtility(this.typeUtilityRequest)
      .subscribe(
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

  updateTypeUtility() {
    this.typeUtilityRequest.id = this.typeUtilityForm.get('id').value;
    this.typeUtilityRequest.typeName = this.typeUtilityForm.get(
      'typeName',
    ).value;
    this.typeUtilityService
      .updateTypeUtility(this.typeUtilityRequest)
      .subscribe(
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
