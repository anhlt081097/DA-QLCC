import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagePostComponent} from './manage-post.component';
import {ManagePostRoutingModule} from './manage-post-routing.module';
import {TypePostComponent} from './type-post/type-post.component';
import {PostComponent} from './post/post.component';
import {AddEditPostComponent} from './post/add-edit-post/add-edit-post.component';
import {MatCardModule} from "@angular/material/card";
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
} from "@nebular/theme";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddEditTypePostComponent} from './type-post/add-edit-type-post/add-edit-type-post.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {CKEditorModule} from "ng2-ckeditor";

@NgModule({
  declarations: [ManagePostComponent, TypePostComponent, PostComponent, AddEditPostComponent, AddEditTypePostComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ManagePostRoutingModule,
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CKEditorModule
  ]
})
export class ManagePostModule {
}
