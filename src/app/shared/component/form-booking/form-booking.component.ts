import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MemberService} from '../../service/member-service.service';
import {ProfileService} from '../../service/profile.service';
import {AuthService} from '../../service/auth.service';
import {throwError} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookingRequest} from '../../model/booking/booking-request';
import {BookingService} from '../../service/booking.service';
import {DialogSubmitBookingComponent} from "../dialog-submit-booking/dialog-submit-booking.component";
import {ToastService} from "../../service/toast.service";

@Component({
  selector: 'ngx-form-booking',
  templateUrl: './form-booking.component.html',
  styleUrls: ['./form-booking.component.scss'],
})
export class FormBookingComponent implements OnInit {
  userName: string;
  bookingForm: FormGroup;
  bookingRequest: BookingRequest;

  constructor(private dialogRef: MatDialogRef<FormBookingComponent>,
              private profileService: ProfileService,
              private authService: AuthService,
              private bookingService: BookingService,
              private memberService: MemberService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.authService.username.subscribe(
      (data: string) => (this.userName = data),
    );
    this.userName = this.authService.getUserName();
    if (this.userName) {
      this.getUserById();
    }
    this.bookingRequest = {
      id_creator: null,
      id: undefined,
      fullName: null,
      address: null,
      email: null,
      phone: null,
      description: null,
      id_user: undefined,
      id_house: undefined,
      price: null,
      discount: undefined,
      costsIncurred: undefined,
      deposit: undefined,
      dateIn: null,
      dateOut: null,
      identityCard: null,
    },
      this.bookingForm = new FormGroup({
        fullName: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        id_user: new FormControl(null),
        id_house: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
        deposit: new FormControl(false),
        dateIn: new FormControl(null, Validators.required),
        dateOut: new FormControl(null, Validators.required),
      });
    this.bookingForm.get('id_house').setValue(this.data.idHouse);
    this.bookingForm.get('dateIn').setValue(this.data.dateIn);
    this.bookingForm.get('dateOut').setValue(this.data.dateOut);
    this.bookingForm.get('price').setValue(this.data.price);
  }

  getUserById() {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.bookingForm.patchValue(data);
        this.bookingForm.get('fullName').setValue(data.lastName + ' ' + data.firstName);
        this.bookingForm.get('id_user').setValue(data.id);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  bookingAdd() {
    const dialogRef = this.dialog.open(DialogSubmitBookingComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.bookingRequest.fullName = this.bookingForm.get('fullName').value;
        this.bookingRequest.address = this.bookingForm.get('address').value;
        this.bookingRequest.email = this.bookingForm.get('email').value;
        this.bookingRequest.phone = this.bookingForm.get('phone').value;
        this.bookingRequest.description = this.bookingForm.get('description').value;
        this.bookingRequest.id_user = this.bookingForm.get('id_user').value;
        this.bookingRequest.id_house = this.bookingForm.get('id_house').value;
        this.bookingRequest.price = this.bookingForm.get('price').value;
        this.bookingRequest.deposit = this.bookingForm.get('deposit').value;
        this.bookingRequest.dateIn = this.bookingForm.get('dateIn').value, 'yyyy-MM-dd';
        this.bookingRequest.dateOut = this.bookingForm.get('dateOut').value, 'yyyy-MM-dd';

        this.bookingService.createBookingMember(this.bookingRequest).subscribe(
          (data) => {
            this.toastService.showToast('success', 'Thành công', 'Đặt lịch thành công');
            this.dialogRef.close(true);
          },
          (error) => {
            this.toastService.showToast('danger', 'Thất bại', 'Đặt lịch thất bại');
            this.dialogRef.close(false);
          },
        );
      }
    });
  }
}
