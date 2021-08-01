import {Component, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../service/booking.service";
import {BookingResponse} from "../../model/booking/booking-response";
import {throwError} from "rxjs";
import {ToastService} from "../../service/toast.service";

@Component({
  selector: 'ngx-paypal-component',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  showSuccess;
  constructor(private activateRoute: ActivatedRoute, private bookingService: BookingService, private router: Router, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.bookingService
      .paypal(this.activateRoute.snapshot.params.id)
      .subscribe(
        (data) => {
          this.initConfig(data);
        },
        (error) => {
          throwError(error);
          this.router.navigateByUrl('/');
          // this.toastService.showToast('danger', 'Thất bại', 'Đơn thanh toán không tồn tại');
        },
      );
  }

  private initConfig(bookingResponse: BookingResponse): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AdgmiBtnov25_ksolCuUj1adzItv2O4FwTmiJ0HlcLPCyPdMJVRL1wbB1m3QcPAT-dfBWOZCt4os_Vyv',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: bookingResponse.depositPrice.toString(),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: bookingResponse.depositPrice.toString(),
                },
              },
            },
            items: [
              {
                name: 'x House ID:' + bookingResponse.id_house,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: bookingResponse.depositPrice.toString(),
                },
              },
            ],
          },
        ],
      },
      // advanced: {
      //   updateOrderDetails: {
      //     commit: true
      //   }
      // },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.toastService.showToast('success', 'Thành công', 'Bạn đã thanh toán thành công');
        this.deposit(bookingResponse.id);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showSuccess = false;
      },
      onError: err => {
        console.log('OnError', err);
        this.showSuccess = false;
      },
      onClick: () => {
        console.log('onClick');
      },
    };
  }

  deposit(id: number) {
    this.bookingService.deposit(id).subscribe(
      (data) => {
        this.showSuccess = true;
        setTimeout(() => this.router.navigateByUrl('/'), 4000);
      },
      (error) => {
        throwError(error);
      },
    );
  }
}

