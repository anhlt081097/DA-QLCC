import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { UpdateProfileRequest } from '../../model/update-profile/update-profile.request';
import { UpdateProfileService } from '../../service/update-profile.service';

@Component({
  selector: 'ngx-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  updateProfileRequest: UpdateProfileRequest;

  constructor(private updateProfileService: UpdateProfileService) {}

  ngOnInit(): void {
    this.updateProfileRequest = {
      firstName: null,
      lastName: null,
      address: null,
      sex: null,
      dateOfBirth: null,
      image: null,
    };

    this.getProfileByUser();
    this.firstForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl(''),
      dateOfBirth: new FormControl(''),
      sex: new FormControl(''),
      image: new FormControl(''),
    });
    this.secondForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      image: new FormControl(''),
      // acceptTerms: new FormControl(false, Validators.requiredTrue)
    });
    this.thirdForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      dateOfBirth: new FormControl(''),
      sex: new FormControl(''),
      image: new FormControl(''),
      // acceptTerms: new FormControl(false, Validators.requiredTrue)
    });
  }
  onFirstSubmit() {
    // this.firstForm.markAsDirty();
    if (this.firstForm.invalid) {
      return;
    }
    this.updateProfileRequest.firstName = this.firstForm.get('firstName').value;
    this.updateProfileRequest.lastName = this.firstForm.get('lastName').value;
    this.updateProfileRequest.address = this.secondForm.get('address').value;
    this.updateProfileRequest.dateOfBirth = this.secondForm.get(
      'dateOfBirth',
    ).value;
    this.updateProfileRequest.sex = this.secondForm.get('sex').value;
    this.updateProfileRequest.image = this.thirdForm.get('image').value;
    this.updateProfileService
      .updateProfile(this.updateProfileRequest)
      .subscribe(
        (data) => {},
        (error) => {
          throwError(error);
        },
      );
  }

  onSecondSubmit() {
    // this.secondForm.markAsDirty();
    if (this.secondForm.invalid) {
      return;
    }
    this.updateProfileRequest.firstName = this.firstForm.get('firstName').value;
    this.updateProfileRequest.lastName = this.firstForm.get('lastName').value;
    this.updateProfileRequest.address = this.secondForm.get('address').value;
    this.updateProfileRequest.dateOfBirth = this.secondForm.get(
      'dateOfBirth',
    ).value;
    this.updateProfileRequest.sex = this.secondForm.get('sex').value;
    this.updateProfileRequest.image = this.thirdForm.get('image').value;
    this.updateProfileService
      .updateProfile(this.updateProfileRequest)
      .subscribe(
        (data) => {},
        (error) => {
          throwError(error);
        },
      );
  }

  onThirdSubmit() {
    // this.thirdForm.markAsDirty();
    if (this.firstForm.invalid) {
      return;
    }
    this.updateProfileRequest.firstName = this.firstForm.get('firstName').value;
    this.updateProfileRequest.lastName = this.firstForm.get('lastName').value;
    this.updateProfileRequest.address = this.secondForm.get('address').value;
    this.updateProfileRequest.dateOfBirth = this.secondForm.get(
      'dateOfBirth',
    ).value;
    this.updateProfileRequest.sex = this.secondForm.get('sex').value;
    this.updateProfileRequest.image = this.thirdForm.get('image').value;
    this.updateProfileService
      .updateProfile(this.updateProfileRequest)
      .subscribe(
        (data) => {},
        (error) => {
          throwError(error);
        },
      );
  }

  getProfileByUser() {
    this.updateProfileService.getProfile().subscribe(
      (data) => {
        this.firstForm.patchValue(data);
        this.secondForm.patchValue(data);
        this.thirdForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getImage(url: string) {
    this.thirdForm.get('image').setValue(url);
  }
}
