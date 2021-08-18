import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CanHoComponent } from "./canho/canho.component";
import { ManageCanHoRoutingModule } from "./manage-canho-routing.module";
import { ManageCanHoComponent } from "./manage-canho.component";
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
  NbTagModule,
  NbTooltipModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThePhuongTienComponent } from "./the-phuongtien/the-phuongtien.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AddCanHoComponent } from "./canho/add-canho/add-canho.component";
import { EditEmployeeComponent } from "./canho/edit-employee/edit-employee.component";
import { AddMemberComponent } from "./the-phuongtien/add-member/add-member.component";
import { EditMemberComponent } from "./the-phuongtien/edit-member/edit-member.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ProfileComponent } from "./profile/profile.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { EditProfileComponent } from "./profile/edit-profile/edit-profile.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { ComponentModule } from "../../shared/component/component.module";
import { DetailEmployeeComponent } from "./canho/detail-canho/detail-canho.component";
import { NbListModule } from "@nebular/theme";
import { AddDichvuComponent } from "./canho/detail-canho/add-dichvu/add-dichvu.component";
import { AddThecudanComponent } from "./canho/detail-canho/add-thecudan/add-thecudan.component";
import { AddCudanComponent } from "./canho/add-cudan/add-cudan.component";
import { AddXecoComponent } from "./canho/detail-canho/add-xeco/add-xeco.component";
import { AddTaikhoanCanhoComponent } from "./canho/add-taikhoan-canho/add-taikhoan-canho.component";
import { DetailDichvuComponent } from "./canho/detail-canho/detail-dichvu/detail-dichvu.component";
import { PrintHoadonComponent } from "./canho/detail-canho/print-hoadon/print-hoadon.component";
@NgModule({
  declarations: [
    CanHoComponent,
    ManageCanHoComponent,
    ThePhuongTienComponent,
    AddCanHoComponent,
    EditEmployeeComponent,
    AddMemberComponent,
    EditMemberComponent,
    ProfileComponent,
    EditProfileComponent,
    DetailEmployeeComponent,
    AddDichvuComponent,
    AddThecudanComponent,
    AddCudanComponent,
    AddXecoComponent,
    AddTaikhoanCanhoComponent,
    DetailDichvuComponent,
    PrintHoadonComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ManageCanHoRoutingModule,
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
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatExpansionModule,
    ComponentModule,
    NbActionsModule,
    NbListModule,
    NbTagModule,
    MatListModule,
  ],
})
export class ManageCanHoModule {}
