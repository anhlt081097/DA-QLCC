import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { MemberRequest } from '../../../../shared/model/member/member-request';
import { MemberService } from '../../../../shared/service/member-service.service';
import { AddMemberComponent } from '../add-member/add-member.component';
import {ToastService} from '../../../../shared/service/toast.service';

@Component({
  selector: 'ngx-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss'],
})
export class EditMemberComponent implements OnInit {
  memberEditForm: FormGroup;
  memberRequest: MemberRequest;

  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddMemberComponent>,
    private memberService: MemberService,
    @Inject(MAT_DIALOG_DATA) private id: number,
  ) {}

  ngOnInit(): void {
    this.memberRequest = {
      id: undefined,
      userName: null,
      email: null,
      phone: null,
      firstName: null,
      lastName: null,
      address: null,
      dateOfBirth: undefined,
      sex: null,
    };
    this.memberEditForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      sex: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    this.memberService.getMemberById(this.id).subscribe(
      (data) => {
        this.memberEditForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  updateMembers() {
    this.memberRequest.id = this.memberEditForm.get('id').value;
    this.memberRequest.userName = this.memberEditForm.get('userName').value;
    this.memberRequest.email = this.memberEditForm.get('email').value;
    this.memberRequest.phone = this.memberEditForm.get('phone').value;
    this.memberRequest.firstName = this.memberEditForm.get('firstName').value;
    this.memberRequest.lastName = this.memberEditForm.get('lastName').value;
    this.memberRequest.sex = this.memberEditForm.get('sex').value;
    this.memberRequest.address = this.memberEditForm.get('address').value;
    this.memberRequest.dateOfBirth = this.memberEditForm.get(
      'dateOfBirth',
    ).value;

    this.memberService.updateMember(this.memberRequest).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast('success', 'Thành công', 'Sửa thành công');
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast('danger', 'Thất bại', 'Sửa thất bại');
      },
    );
  }
}
