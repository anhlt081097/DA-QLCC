import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { throwError } from "rxjs";
import { DashBoardService } from "../../../shared/service/dashBoard/dash-board.service";

@Component({
  selector: "ngx-echarts-pie-2",
  template: ` <div echarts [options]="options" class="echart"></div> `,
})
export class EchartsPieComponent implements OnInit, AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  thongKe: any = [];
  constructor(
    private theme: NbThemeService,
    private dashBoardService: DashBoardService
  ) {}
  ngOnInit(): void {
    this.getThongKe();
  }
  getThongKe() {
    this.dashBoardService.getThongKe().subscribe(
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
  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [
          colors.warningLight,
          colors.infoLight,
          colors.dangerLight,
          colors.successLight,
          colors.primaryLight,
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["Từ 18 - 60", "Nhỏ hơn 18", "Lớn hơn 60"],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: "Tuổi",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: [
              { value: this.thongKe.soDanCuTuoiTu18Den60, name: "Từ 18 - 60" },
              { value: this.thongKe.soDanCuTuoiNhoHon18, name: "Nhỏ hơn 18" },
              { value: this.thongKe.soDanCuTuoiLonHon60, name: "Lớn hơn 60" },
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
