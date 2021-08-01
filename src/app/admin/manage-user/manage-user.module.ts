import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListEmployeeComponent } from "./employee/employer.component";
import { ManageUserRoutingModule } from "./manage-user-routing.module";
import { ManageUserComponent } from "./manage-user.component";
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
import { MemberComponent } from "./member/member.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AddEmployeeComponent } from "./employee/add-canho/add-canho.component";
import { EditEmployeeComponent } from "./employee/edit-employee/edit-employee.component";
import { AddMemberComponent } from "./member/add-member/add-member.component";
import { EditMemberComponent } from "./member/edit-member/edit-member.component";
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
import { DetailEmployeeComponent } from "./employee/detail-employee/detail-employee.component";
import { NbListModule } from "@nebular/theme";
import { AddDichvuComponent } from './employee/detail-employee/add-dichvu/add-dichvu.component';
import { AddThecudanComponent } from './employee/detail-employee/add-thecudan/add-thecudan.component';
import { AddCudanComponent } from './employee/add-cudan/add-cudan.component';
import { AddXecoComponent } from './employee/detail-employee/add-xeco/add-xeco.component';
@NgModule({
  declarations: [
    ListEmployeeComponent,
    ManageUserComponent,
    MemberComponent,
    AddEmployeeComponent,
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
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ManageUserRoutingModule,
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
export class ManageUserModule {}
