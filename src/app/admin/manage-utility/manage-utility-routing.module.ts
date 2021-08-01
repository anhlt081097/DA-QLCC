import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../../shared/component/not-found/not-found.component';
import { TypeUtilityComponent } from './type-utility/type-utility.component';
import { ManageUntilityComponent } from './manage-untility.component';



const routes: Routes = [{
  path: '',
  component: ManageUntilityComponent,
  children: [
    {
      path: 'type-untility',
      component: TypeUtilityComponent,
    },
    {
      path: "",
      redirectTo: "type-untility",
      pathMatch: "full",
    }
  ],
},
{
  path: '**',
  component: NotFoundComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUntilitRoutingModule { }


