import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ManageStatisticsRoutingModule } from "./manage-statistics-routing.module";
import { ManageStatisticsComponent } from "./manage-statistics.component";
import { StatisticsSharedComponent } from "./statistics-shared/statistics-shared.component";
import { EchartsPieComponent } from "./echarts-pie/echarts-pie.component";
import { ThemeModule } from "../../shared/@theme/theme.module";
import { ChartsRoutingModule } from "../../shared/component/module/charts/charts-routing.module";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartModule } from "angular2-chartjs";
import {
  NbAccordionModule,
  NbCardModule,
  NbInfiniteListDirective,
  NbListModule,
} from "@nebular/theme";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { EchartsPieDichvuComponent } from "./echarts-pie-dichvu/echarts-pie-dichvu.component";
import { EchartsPieSuachuaComponent } from "./echarts-pie-suachua/echarts-pie-suachua.component";
import { DichVuSuaChuaComponent } from "./dich-vu-sua-chua/dich-vu-sua-chua.component";
import { DichVuCoDinhComponent } from "./dich-vu-co-dinh/dich-vu-co-dinh.component";
import { AccordionComponent } from "../../shared/component/module/layout/accordion/accordion.component";
import { NewsPostComponent } from "../../shared/component/module/layout/infinite-list/news-post/news-post.component";
import { InfiniteListComponent } from "../../shared/component/module/layout/infinite-list/infinite-list.component";
import { NewsPostPlaceholderComponent } from "../../shared/component/module/layout/infinite-list/news-post-placeholder/news-post-placeholder.component";

@NgModule({
  declarations: [
    ManageStatisticsComponent,
    StatisticsSharedComponent,
    EchartsPieComponent,
    EchartsPieDichvuComponent,
    EchartsPieSuachuaComponent,
    DichVuSuaChuaComponent,
    DichVuCoDinhComponent,
    NewsPostPlaceholderComponent,
    InfiniteListComponent,
    NewsPostComponent,
    AccordionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageStatisticsRoutingModule,
    ThemeModule,
    ChartsRoutingModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NbListModule,
    NbAccordionModule,
  ],
})
export class ManageStatisticsModule {}
