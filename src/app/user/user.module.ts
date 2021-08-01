import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {HomeComponent} from './home/home.component';
import {ComponentModule} from '../shared/component/component.module';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from '@angular/material/dialog';
import {ThemeModule} from '../shared/@theme/theme.module';
import {NbActionsModule, NbCardModule, NbMenuModule, NbPopoverModule} from '@nebular/theme';
import {ProfileUserComponent} from './profile/profile-user.component';
import {OrderUserComponent} from './component/order-user/order-user.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CKEditorModule} from 'ng2-ckeditor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgImageSliderModule} from 'ng-image-slider';
import {WebcamModule} from 'ngx-webcam';
import { SearchOrderComponent } from './component/search-order/search-order.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomestayUserComponent } from './homestay-user/homestay-user.component';
import { HouseUserComponent } from './house-user/house-user.component';
import { PostUserComponent } from './post-user/post-user.component';
import { DetailHouseUserComponent } from './detail-house-user/detail-house-user.component';
import { DetailPostUserComponent } from './detail-post-user/detail-post-user.component';
import {NgxStarRatingModule} from 'ngx-star-rating';


@NgModule({
  declarations: [UserComponent,
    HomeComponent,
    AboutComponent,
    ProfileUserComponent,
    ContactComponent,
    OrderUserComponent,
    SearchOrderComponent,
    HomestayUserComponent,
    HouseUserComponent,
    PostUserComponent,
    DetailHouseUserComponent,
    DetailPostUserComponent],
  imports: [UserRoutingModule,
    CommonModule,
    ComponentModule,
    TranslateModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbPopoverModule,
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
    MatExpansionModule,
    NgImageSliderModule,
    WebcamModule,
    NbActionsModule, ReactiveFormsModule, NgxStarRatingModule, FormsModule,
  ],
})
export class UserModule {
}
