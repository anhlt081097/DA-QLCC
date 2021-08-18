import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { MemberRequest } from '../../../../shared/model/member/member-request';
import { MemberService } from '../../../../shared/service/member-service.service';
import {ToastService} from '../../../../shared/service/toast.service';

@Component({
  selector: 'ngx-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  memberForm: FormGroup;
  memberRequest: MemberRequest;

  constructor(
    private toastrService: ToastService,
    private memberService: MemberService,
    private dialogRef: MatDialogRef<AddMemberComponent>,
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
    this.memberForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  createMembers() {
    this.memberRequest.userName = this.memberForm.get('userName').value;
    this.memberRequest.email = this.memberForm.get('email').value;
    this.memberRequest.phone = this.memberForm.get('phone').value;

    this.memberService.createMember(this.memberRequest).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast('success', 'Thành công', 'Thêm thành công');
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast('danger', 'Thất bại', 'Thêm thất bại');
      },
    );
  }
}
