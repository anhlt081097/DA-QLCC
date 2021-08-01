import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../../shared/component/not-found/not-found.component';
import { DetailHomestayComponent } from './home-stay/detail-homestay/detail-homestay.component';
import { AddressComponent } from './address/address.component';
import { HomestayComponent } from './home-stay/homestay.component';
import { PlaceComponent } from './place/place.component';
import { ManageHomeStayComponent } from './manage-home-stay.component';

const routes: Routes = [
  {
    path: '',
    component: ManageHomeStayComponent,
    children: [
      {
        path: 'homestay',
        component: HomestayComponent,
      },
      {
        path: 'address',
        component: AddressComponent,
      },
      {
        path: 'place',
        component: PlaceComponent,
      },
      {
        path: 'detail/:id',
        component: DetailHomestayComponent,
      },
      {
        path: '',
        redirectTo: 'list-homestay',
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
export class ManageHomeStayRoutingModule {}
