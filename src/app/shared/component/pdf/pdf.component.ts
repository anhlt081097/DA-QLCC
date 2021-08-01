import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TransactionResponse} from '../../model/transaction/transaction.response';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'ngx-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {
  name: number = null;
  @ViewChild('pdf', {static: false}) pdfTable: ElementRef;
  transactionResponse: TransactionResponse = null;

  constructor(@Inject(MAT_DIALOG_DATA) private data) {
    this.transactionResponse = this.data.transaction;
    this.name = this.transactionResponse.id;
  }

  ngOnInit(): void {
  }

  public downloadAsPDF() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      },
    };

    const pdfTable = this.pdfTable.nativeElement;
    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers,
    });
    doc.save('HoadonID_' + this.name + '.pdf');
  }
}
