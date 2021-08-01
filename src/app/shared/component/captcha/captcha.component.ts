import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  @Output('submit') submit: EventEmitter<boolean> = new EventEmitter<boolean>();
   aFormGroup: FormGroup;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
    });
  }

  // reset(): void {
  //   this.captchaElem.resetCaptcha();
  // }

  handleSuccess(data) {
    this.submit.emit(true);
  }

}
