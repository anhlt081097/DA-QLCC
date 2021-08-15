import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { HomeStayResponse } from '../../../../shared/model/home-stay/home-stay-response';
import { HomeStayService } from '../../../../shared/service/homestay.service';
import { EmployeeRequest } from '../../../../shared/model/employee/employee-request';
import { EmployeeService } from '../../../../shared/service/employee-service.service';
import {ToastService} from "../../../../shared/service/toast.service";

@Component({
  selector: 'ngx-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  employeeEditForm: FormGroup;
  employeeRequest: EmployeeRequest;
  homeStays: HomeStayResponse[];


  constructor(
    private employeeService: EmployeeService,
    private homeStayService: HomeStayService,
    private toastrService: ToastService,
    @Inject(MAT_DIALOG_DATA) private id: number,
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
  ) {}

  ngOnInit(): void {
    this.getAllHomeStay();
    this.employeeRequest = {
      id: undefined,
      userName: null,
      id_homeStay: undefined,
      email: null,
      phone: null,
      firstName: null,
      lastName: null,
      address: null,
      dateOfBirth: undefined,
      sex: null,
    };
    this.employeeEditForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      sex: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      id_homeStay: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employeeEditForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  private getAllHomeStay() {
    this.homeStayService.getAllHomeStay().subscribe(
      (data) => {
        this.homeStays = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  updateEmployees() {
    this.employeeRequest.id = this.employeeEditForm.get('id').value;
    this.employeeRequest.userName = this.employeeEditForm.get('userName').value;
    this.employeeRequest.id_homeStay = this.employeeEditForm.get(
      'id_homeStay',
    ).value;
    this.employeeRequest.email = this.employeeEditForm.get('email').value;
    this.employeeRequest.phone = this.employeeEditForm.get('phone').value;
    this.employeeRequest.firstName = this.employeeEditForm.get(
      'firstName',
    ).value;
    this.employeeRequest.lastName = this.employeeEditForm.get('lastName').value;
    this.employeeRequest.sex = this.employeeEditForm.get('sex').value;
    this.employeeRequest.address = this.employeeEditForm.get('address').value;
    this.employeeRequest.dateOfBirth = this.employeeEditForm.get(
      'dateOfBirth',
    ).value;

    this.employeeService.updateEmployee(this.employeeRequest).subscribe(
      (data) => {
        this.toastrService.showToast('success', 'Thành công', 'Sửa thành công');
        this.dialogRef.close(true);
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast('danger', 'Thất bại', 'Sửa thất bại');
      },
    );
  }

}
