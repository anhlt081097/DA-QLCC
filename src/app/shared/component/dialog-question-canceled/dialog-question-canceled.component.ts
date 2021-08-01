import {Component, Inject} from '@angular/core';
import {BookingService} from '../../service/booking.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from '../../service/toast.service';
import {throwError} from 'rxjs';
import {DialogSubmitCancelComponent} from '../dialog-submit-cancel/dialog-submit-cancel.component';

@Component({
  selector: 'ngx-dialog-submit-lock',
  templateUrl: './dialog-question-canceled.component.html',
  styleUrls: ['./dialog-question-canceled.component.scss'],
})
export class DialogQuestionCanceledComponent {

  idBook: number;

  constructor(private bookingService: BookingService,
              private dialog: MatDialog,
              private toastrService: ToastService,
              @Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<DialogQuestionCanceledComponent>) {
    this.idBook = this.data.id;
  }


  cancel() {
    const dialogRef = this.dialog.open(DialogSubmitCancelComponent, {
      data: {title: 'Bạn chắc chắn muốn hủy không hoàn cọc ?'},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.bookingService.cancel(this.idBook).subscribe(
          (data) => {
            this.toastrService.showToast('warning', 'Thông báo', 'Bạn đã hủy đơn đặt ' + this.idBook);
            this.dialogRef.close(true);
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast('danger', 'Thất bại', 'Hủy thất bại');
          },
        );
      }
    });
  }

  processing() {
    const dialogRef = this.dialog.open(DialogSubmitCancelComponent, {
      data: {title: 'Bạn chắc chắn muốn hủy hoàn cọc ?'},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.bookingService.processing(this.idBook).subscribe(
          (data) => {
            this.toastrService.showToast('warning', 'Thông báo', 'Bạn đã hủy đơn đặt ' + this.idBook);
            this.dialogRef.close(true);
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast('danger', 'Thất bại', 'Hủy thất bại');
          },
        );
      }
    });
  }
}
