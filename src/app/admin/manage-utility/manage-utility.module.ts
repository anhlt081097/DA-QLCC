import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUntilityComponent } from './manage-untility.component';
import { ManageUntilitRoutingModule } from './manage-utility-routing.module';
import { TypeUtilityComponent } from './type-utility/type-utility.component';
import { MatCardModule } from '@angular/material/card';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTooltipModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddEditTypeUtilityComponent } from './type-utility/add-edit-type-utility/add-edit-type-utility.component';
import { AddEditUtilityComponent } from './type-utility/add-edit-utility/add-edit-utility.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ComponentModule} from "../../shared/component/component.module";

@NgModule({
  declarations: [
    ManageUntilityComponent,
    TypeUtilityComponent,
    AddEditTypeUtilityComponent,
    AddEditUtilityComponent,
  ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ManageUntilitRoutingModule,
        MatCardModule,
        NbCardModule,
        NbTreeGridModule,
        NbIconModule,
        NbInputModule,
        Ng2SmartTableModule,
        NbSpinnerModule,
        NbCheckboxModule,
        NbTabsetModule,
        NbPopoverModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbTooltipModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatMenuModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        ComponentModule,
    ],
})
export class ManageUtilityModule {}
