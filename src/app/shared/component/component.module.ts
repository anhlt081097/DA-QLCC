import {NgModule} from '@angular/core';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {DropzoneDirective} from './upload/uploader/dropzone.directive';
import {UploaderComponent} from './upload/uploader/uploader.component';
import {UploadTaskComponent} from './upload/upload-task/upload-task.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {DialogDeleteSubmitComponent} from './dialog-submit-delete/dialog-submit-delete.component';
import {DialogSubmitUnlockComponent} from './dialog-submit-unlock/dialog-submit-unlock.component';
import {DialogSubmitLockComponent} from './dialog-submit-lock/dialog-submit-lock.component';
import {NotHomestayComponent} from './not-homestay/not-homestay.component';
import {DescriptionPostComponent} from './description-post/description-post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule, NbListModule,
  NbRouteTabsetModule, NbSelectModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
} from '@nebular/theme';
import {AngularFireModule} from '@angular/fire';
import {firebaseConfig} from '../../../environments/firebaseconfig';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {ErrorComponent} from './error/error.component';
import {PaypalComponent} from './paypal/paypal.component';
import {NgxPayPalModule} from 'ngx-paypal';
import {ThemeModule} from "../@theme/theme.module";
import { DialogSubmitCheckoutComponent } from './dialog-submit-checkout/dialog-submit-checkout.component';
import { CaptchaComponent } from './captcha/captcha.component';
import {NgxCaptchaModule} from "ngx-captcha";
import { PdfComponent } from './pdf/pdf.component';
import {DialogSubmitRefundComponent} from "./dialog-submit-refund/dialog-submit-refund.component";
import {DialogQuestionCanceledComponent} from './dialog-question-canceled/dialog-question-canceled.component';
import {MatLineModule, MatRippleModule} from "@angular/material/core";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {DialogSubmitCancelComponent} from "./dialog-submit-cancel/dialog-submit-cancel.component";
import {DialogFeedBackComponent} from "./dialog-feedback/dialog-feedback.component";
import { FormBookingComponent } from './form-booking/form-booking.component';
import {DialogSubmitBookingComponent} from "./dialog-submit-booking/dialog-submit-booking.component";
import {DialogInfoBookComponent} from "./dialog-info-book/dialog-info-book.component";



@NgModule({
  declarations: [
    UpdateProfileComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    NotFoundComponent,
    DialogDeleteSubmitComponent,
    DialogSubmitUnlockComponent,
    DialogSubmitLockComponent,
    NotHomestayComponent,
    DescriptionPostComponent,
    ErrorComponent,
    PaypalComponent,
    DialogSubmitCheckoutComponent,
    CaptchaComponent,
    DialogSubmitRefundComponent,
    DialogQuestionCanceledComponent,
    DialogSubmitCancelComponent,
    DialogSubmitBookingComponent,
    DialogFeedBackComponent,
    PdfComponent,
    DialogInfoBookComponent,
    FormBookingComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbSelectModule,
    AngularFireModule.initializeApp(firebaseConfig.config),
    AngularFireStorageModule,
    AngularFireStorageModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    NgxPayPalModule,
    ThemeModule,
    MatIconModule,
    NgxCaptchaModule,
    MatLineModule,
    MatRippleModule,
  ],
    exports: [
        CaptchaComponent,
        UploaderComponent,
        UploadTaskComponent,
    ],
})
export class ComponentModule {
}
