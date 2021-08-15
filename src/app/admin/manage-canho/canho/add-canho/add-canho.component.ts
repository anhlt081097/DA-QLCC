import { Component, Inject, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { HomeStayResponse } from "../../../../shared/model/home-stay/home-stay-response";
import { HomeStayService } from "../../../../shared/service/homestay.service";
import { EmployeeRequest } from "../../../../shared/model/employee/employee-request";
import { EmployeeService } from "../../../../shared/service/employee-service.service";
import { ToastService } from "../../../../shared/service/toast.service";
import { CanHo } from "../../../../shared/model/canHo/canho";
import { CanhoService } from "../../../../shared/service/canHo/canho.service";
import { E } from "@angular/cdk/keycodes";
import { type } from "os";

@Component({
  selector: "ngx-add-employee",
  templateUrl: "./add-canho.component.html",
  styleUrls: ["./add-canho.component.scss"],
})
export class AddCanHoComponent implements OnInit {
  // employeeForm: FormGroup;
  // employeeRequest: EmployeeRequest;
  // homeStays: HomeStayResponse[];
  canHo: CanHo;
  canHoForm: FormGroup;
  canHoEditForm: FormGroup;
  typeAction: string;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddCanHoComponent>,
    private canHoService: CanhoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // this.getAllHomeStay();
    this.typeAction = this.data.type;
    console.log(this.typeAction);
    this.canHo = {
      id: undefined,
      tenCanHo: null,
      moTa: null,
      dienTich: undefined,
      trangThai: null,
    };
    this.canHoForm = new FormGroup({
      tenCanHo: new FormControl(null, Validators.required),
      moTa: new FormControl(null, Validators.required),
      dienTich: new FormControl(null, Validators.required),
    });
    this.canHoEditForm = new FormGroup({
      tenCanHo: new FormControl(null, Validators.required),
      moTa: new FormControl(null, Validators.required),
      dienTich: new FormControl(null, Validators.required),
    });
    if (this.data.id) {
      this.canHoService.getCanHoById(this.data.id).subscribe(
        (data) => {
          this.canHoEditForm.patchValue(data);
        },
        (error) => {
          throwError(error);
        }
      );
    }
    // this.employeeRequest = {
    //   id: undefined,
    //   userName: null,
    //   id_homeStay: undefined,
    //   email: null,
    //   phone: null,
    //   firstName: null,
    //   lastName: null,
    //   address: null,
    //   dateOfBirth: undefined,
    //   sex: null,
    // };

    // this.employeeForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   id_homeStay: new FormControl("", Validators.required),
    //   phone: new FormControl(null, [
    //     Validators.required,
    //     Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/),
    //   ]),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    // });
  }

  // private getAllHomeStay() {
  //   this.homeStayService.getAllHomeStay().subscribe(
  //     (data) => {
  //       this.homeStays = data;
  //     },
  //     (error) => {
  //       throwError(error);
  //     }
  //   );
  // }
  createCanHo() {
    this.canHo.tenCanHo = this.canHoForm.get("tenCanHo").value;
    this.canHo.moTa = this.canHoForm.get("moTa").value;
    this.canHo.dienTich = this.canHoForm.get("dienTich").value;
    this.canHo.trangThai = false;
    this.canHoService.createCanHo(this.canHo).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thêm thành công"
        );
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Thêm thất bại");
      }
    );
  }
  updateCanHo() {
    this.canHo.id = this.data.id;
    this.canHo.tenCanHo = this.canHoEditForm.get("tenCanHo").value;
    this.canHo.moTa = this.canHoEditForm.get("moTa").value;
    this.canHo.dienTich = this.canHoEditForm.get("dienTich").value;
    this.canHo.trangThai = false;
    console.log(this.canHo);
    this.canHoService.updateCanHo(this.canHo).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast("success", "Thành công", "Sửa thành công");
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Sửa thất bại");
      }
    );
  }
  // createEmployees() {
  //   this.employeeRequest.userName = this.employeeForm.get("userName").value;
  //   this.employeeRequest.id_homeStay =
  //     this.employeeForm.get("id_homeStay").value;
  //   this.employeeRequest.email = this.employeeForm.get("email").value;
  //   this.employeeRequest.phone = this.employeeForm.get("phone").value;

  //   this.employeeService.createEmployee(this.employeeRequest).subscribe(
  //     (data) => {
  //       this.dialogRef.close(true);
  //       this.toastrService.showToast(
  //         "success",
  //         "Thành công",
  //         "Thêm thành công"
  //       );
  //     },
  //     (error) => {
  //       throwError(error);
  //       this.toastrService.showToast("danger", "Thất bại", "Thêm thất bại");
  //     }
  //   );
  // }
}
