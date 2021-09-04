import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManageHouseComponent } from "./manage-phongban.component";
import { ManageHouseRoutingModule } from "./manage-phongban-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import {
  NbActionsModule,
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
import { Ng2SmartTableModule } from "ng2-smart-table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from "ng2-ckeditor";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatStepperModule } from "@angular/material/stepper";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { ComponentModule } from "../../shared/component/component.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { NgImageSliderModule } from "ng-image-slider";
import { WebcamModule } from "ngx-webcam";
import { PhongBanComponent } from "./phongBan/phongban.component";
import { NhanVienComponent } from './nhan-vien/nhan-vien.component';
import { NhanVienProfileComponent } from './nhan-vien-profile/nhan-vien-profile.component';
import { EditProfileComponent } from './nhan-vien-profile/edit-profile/edit-profile.component';
import { AddNhanVienComponent } from './add-nhan-vien/add-nhan-vien.component';
import { AddBoPhanComponent } from './add-bo-phan/add-bo-phan.component';
import { ListTaikhoanComponent } from './list-taikhoan/list-taikhoan.component';
import { AddTaikhoanComponent } from './add-taikhoan/add-taikhoan.component';

@NgModule({
  declarations: [ManageHouseComponent, PhongBanComponent, NhanVienComponent, NhanVienProfileComponent, EditProfileComponent, AddNhanVienComponent, AddBoPhanComponent, ListTaikhoanComponent, AddTaikhoanComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ManageHouseRoutingModule,
    MatCardModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
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
    MatNativeDateModule,
    MatMenuModule,
    MatDialogModule,
    CKEditorModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    ComponentModule,
    MatExpansionModule,
    NgImageSliderModule,
    WebcamModule,
    NbActionsModule,
  ],
})
export class ManageHouseModule {}
