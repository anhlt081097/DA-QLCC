import { Component, OnInit } from "@angular/core";
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";
import { ActivatedRoute, Router } from "@angular/router";
import { BookingService } from "../../service/booking.service";
import { BookingResponse } from "../../model/booking/booking-response";
import { throwError } from "rxjs";
import { ToastService } from "../../service/toast.service";
import { ThanhToanPaypalService } from "../../service/thanhToanPaypal/thanh-toan-paypal.service";

@Component({
  selector: "ngx-paypal-component",
  templateUrl: "./paypal.component.html",
  styleUrls: ["./paypal.component.scss"],
})
export class PaypalComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  showSuccess;
  type: string;
  constructor(
    private activateRoute: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router,
    private toastService: ToastService,
    private thanhToanService: ThanhToanPaypalService
  ) {}

  ngOnInit(): void {
    this.type = this.activateRoute.snapshot.params.type;
    if (this.type == "hddv") {
      this.checkTrangThaiThanhToanHddv();
    } else if (this.type == "hdsc") {
      this.checkTrangThaiThanhToanHdsc();
    }
  }
  checkTrangThaiThanhToanHdsc() {
    this.thanhToanService
      .checkTrangThaiThanhToanHdsc(this.activateRoute.snapshot.params.id)
      .subscribe(
        (data) => {
          console.log(data);
          this.initConfig(data);
        },
        (error) => {
          throwError(error);
          this.router.navigateByUrl("/admin/manage-canho/detail/infor");
          // this.toastService.showToast('danger', 'Thất bại', 'Đơn thanh toán không tồn tại');
        }
      );
  }
  checkTrangThaiThanhToanHddv() {
    this.thanhToanService
      .checkTrangThaiThanhToanHddv(this.activateRoute.snapshot.params.id)
      .subscribe(
        (data) => {
          console.log(data);
          this.initConfig(data);
        },
        (error) => {
          throwError(error);
          this.router.navigateByUrl("/admin/manage-canho/detail/infor");
          // this.toastService.showToast('danger', 'Thất bại', 'Đơn thanh toán không tồn tại');
        }
      );
  }
  private initConfig(hoaDon: any): void {
    this.payPalConfig = {
      currency: "USD",
      clientId:
        "AdgmiBtnov25_ksolCuUj1adzItv2O4FwTmiJ0HlcLPCyPdMJVRL1wbB1m3QcPAT-dfBWOZCt4os_Vyv",
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: hoaDon.soTien.toString(),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: hoaDon.soTien.toString(),
                  },
                },
              },
              items: [
                {
                  name: "x ID:" + 1,
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "USD",
                    value: hoaDon.soTien.toString(),
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
        label: "paypal",
        layout: "vertical",
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
        this.submitThanhToan(hoaDon.id);
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
        this.showSuccess = false;
      },
      onError: (err) => {
        console.log("OnError", err);
        this.showSuccess = false;
      },
      onClick: () => {
        console.log("onClick");
      },
    };
  }
  submitThanhToan(id: number) {
    if (this.type == "hddv") {
      this.thanhToanHoaDonDichVu(id);
    }
    if (this.type == "hdsc") {
      this.thanhToanHoaDonSuaChua(id);
    }
  }
  thanhToanHoaDonDichVu(id: number) {
    this.thanhToanService.thanhToanHoaDonDichVu(id).subscribe(
      (data) => {
        this.showSuccess = true;
        setTimeout(
          () => this.router.navigateByUrl("/admin/manage-canho/detail/infor"),
          4000
        );
      },
      (error) => {
        throwError(error);
      }
    );
  }
  thanhToanHoaDonSuaChua(id: number) {
    this.thanhToanService.thanhToanHoaDonSuaChua(id).subscribe(
      (data) => {
        this.showSuccess = true;
        setTimeout(
          () => this.router.navigateByUrl("/admin/manage-canho/detail/infor"),
          4000
        );
      },
      (error) => {
        throwError(error);
      }
    );
  }
}
