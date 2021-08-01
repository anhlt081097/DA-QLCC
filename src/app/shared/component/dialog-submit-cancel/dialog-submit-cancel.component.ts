import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'ngx-dialog-submit-checkout',
  templateUrl: './dialog-submit-cancel.component.html',
  styleUrls: ['./dialog-submit-cancel.component.scss']
})
export class DialogSubmitCancelComponent {

  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data) {
    this.title = this.data.title;
  }

}
