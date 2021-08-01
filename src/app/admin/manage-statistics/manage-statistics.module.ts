import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ManageStatisticsRoutingModule} from './manage-statistics-routing.module';
import {ManageStatisticsComponent} from './manage-statistics.component';
import { StatisticsSharedComponent } from './statistics-shared/statistics-shared.component';



@NgModule({
  declarations: [ManageStatisticsComponent, StatisticsSharedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageStatisticsRoutingModule,
  ],
})
export class ManageStatisticsModule { }
