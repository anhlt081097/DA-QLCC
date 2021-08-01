import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {throwError} from 'rxjs';
import {TypePostRequest} from '../../../../shared/model/type-post/type-post-request';
import {TypePostService} from '../../../../shared/service/type-post.service';
import {ToastService} from '../../../../shared/service/toast.service';

@Component({
  selector: 'ngx-add-edit-type-post',
  templateUrl: './add-edit-type-post.component.html',
  styleUrls: ['./add-edit-type-post.component.scss'],
})
export class AddEditTypePostComponent implements OnInit {
  typePostForm: FormGroup;
  typePostRequest: TypePostRequest;
  idType: number;


  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddEditTypePostComponent>,
    private typePostService: TypePostService,
    @Inject(MAT_DIALOG_DATA) private id: number,
  ) {
    this.idType = id;
  }

  ngOnInit(): void {
    this.typePostRequest = {
      id: undefined,
      typeName: null,
    };
    this.typePostForm = new FormGroup({
      id: new FormControl(null),
      typeName: new FormControl(null, Validators.required),
    });
    if (this.id) {
      this.getTypePostById();
    }
  }

  getTypePostById() {
    this.typePostService.getTypePostById(this.id).subscribe(
      (data) => {
        this.typePostForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  submitAction() {
    if (this.id) {
      this.updateTypePost();
    } else {
      this.createTypePost();
    }
  }

  createTypePost() {
    this.typePostRequest.typeName = this.typePostForm.get(
      'typeName',
    ).value;

    this.typePostService
      .createTypePost(this.typePostRequest)
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

  updateTypePost() {
    this.typePostRequest.id = this.typePostForm.get('id').value;
    this.typePostRequest.typeName = this.typePostForm.get(
      'typeName',
    ).value;
    this.typePostService
      .updateTypePost(this.typePostRequest)
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
