import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {throwError} from 'rxjs';
import {PlaceRequest} from '../../../../shared/model/place/place-request';
import {PlaceService} from '../../../../shared/service/place.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from "../../../../shared/service/toast.service";

@Component({
  selector: 'ngx-add-place',
  templateUrl: './add-edit-place.component.html',
  styleUrls: ['./add-edit-place.component.scss'],
})
export class AddEditPlaceComponent implements OnInit {
  placeForm: FormGroup;
  placeRequest: PlaceRequest;
  idPlace: number;

  constructor(
    private placeService: PlaceService,
    private toastrService: ToastService,
    @Inject(MAT_DIALOG_DATA) private id: number,
    private dialogRef: MatDialogRef<AddEditPlaceComponent>,
  ) {
    this.idPlace = this.id;
  }

  ngOnInit(): void {
    this.placeRequest = {
      id: undefined,
      placeName: null,
      image: null,
    };
    this.placeForm = new FormGroup({
      id: new FormControl(null),
      placeName: new FormControl(null, Validators.required),
      image: new FormControl(null),
    });
    if (this.id) {
      this.getAllPlace();
    }
  }

  getAllPlace() {
    this.placeService.getPlaceById(this.id).subscribe(
      (data) => {
        this.placeForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  SubmitForm() {
    if (this.idPlace) {
      this.updatePlace();
    } else {
      this.createPlace();
    }
  }

  createPlace() {
    this.placeRequest.placeName = this.placeForm.get('placeName').value;
    this.placeRequest.image = this.placeForm.get('image').value;
    this.placeService.createPlace(this.placeRequest).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast('success', 'Thành công', 'Thêm thành công');
      },
      (error) => {
        this.toastrService.showToast('danger', 'Thất bại', 'Thêm thất bại');
        throwError(error);
      },
    );
  }

  updatePlace() {
    this.placeRequest.id = this.placeForm.get('id').value;
    this.placeRequest.placeName = this.placeForm.get('placeName').value;
    this.placeRequest.image = this.placeForm.get('image').value;

    this.placeService.updatePlace(this.placeRequest).subscribe(
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
    this.placeForm.get('image').setValue(url);
  }
}

