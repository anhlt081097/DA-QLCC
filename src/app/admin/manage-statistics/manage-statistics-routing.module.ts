import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../../shared/component/not-found/not-found.component';
import {ManageStatisticsComponent} from './manage-statistics.component';
import {StatisticsSharedComponent} from './statistics-shared/statistics-shared.component';

const routes: Routes = [
  {
    path: '',
    component: ManageStatisticsComponent,
    children: [
      {
        path: 'statistics',
        component: StatisticsSharedComponent,
      },
      {
        path: '',
        redirectTo: 'statistics',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageStatisticsRoutingModule {}
