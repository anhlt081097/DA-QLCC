import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NbThemeService } from "@nebular/theme";
import { throwError } from "rxjs";
import { DashBoardService } from "../../../shared/service/dashBoard/dash-board.service";
import { DichVuCoDinhComponent } from "../dich-vu-co-dinh/dich-vu-co-dinh.component";
import { DichVuSuaChuaComponent } from "../dich-vu-sua-chua/dich-vu-sua-chua.component";

@Component({
  selector: "ngx-echarts-pie-dichvu",
  template: `
    <div
      echarts
      [options]="options"
      (chartClick)="selectItem($event, 'chartClick')"
      class="echart"
    ></div>
  `,
})
export class EchartsPieDichvuComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() nam: string;
  @Input() thang: string;
  options: any = {};
  themeSubscription: any;
  thongKe: any = [];
  constructor(
    private theme: NbThemeService,
    private dashBoardService: DashBoardService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getThongKeHoaDonDichVu();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getThongKeHoaDonDichVu();
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
  }
  getThongKeHoaDonDichVu() {
    this.dashBoardService
      .getThongKeHoaDonDichVu(this.nam, this.thang + 1)
      .subscribe(
        (data) => {
          this.thongKe = data;
          console.log(this.thongKe);
          this.ngAfterViewInit();
        },
        (error) => {
          throwError(error);
        }
      );
  }
  selectItem(event: any, type: string) {
    if (event.data.name == "Chưa thanh toán") {
      this.openDetail("Chua");
    } else {
      this.openDetail("Da");
    }
  }
  openDetail(type: string) {
    const nam = this.nam;
    const thang = this.thang + 1;
    const dialogRef = this.dialog.open(DichVuCoDinhComponent, {
      data: { type, nam, thang },
      width: "50%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
  }
  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["Chưa thanh toán", "Đã thanh toán"],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: "Hoá đơn dịch vụ",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: [
              {
                value: this.thongKe.soHoaDonChuaThanhToan,
                name: "Chưa thanh toán",
              },
              {
                value: this.thongKe.soHoaDonDaThanhToan,
                name: "Đã thanh toán",
              },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
