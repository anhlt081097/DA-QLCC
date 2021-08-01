import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {throwError} from 'rxjs';
import {TypeUtilityResponse} from '../../../shared/model/type-utility/type-utility-response';
import {TypeUtilityService} from '../../../shared/service/type-utility.service';
import {AddEditUtilityComponent} from './add-edit-utility/add-edit-utility.component';
import {AddEditTypeUtilityComponent} from './add-edit-type-utility/add-edit-type-utility.component';
import {DialogDeleteSubmitComponent} from '../../../shared/component/dialog-submit-delete/dialog-submit-delete.component';
import {ToastService} from '../../../shared/service/toast.service';
import {UtilityService} from '../../../shared/service/utility.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'ngx-list-type-utility',
  templateUrl: './type-utility.component.html',
  styleUrls: ['./type-utility.component.scss'],
})
export class TypeUtilityComponent implements OnInit, AfterViewInit {
  typeUtilitys: TypeUtilityResponse[];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private typeUtilityService: TypeUtilityService,
    private toastrService: ToastService,
    private dialog: MatDialog,
    private utilityService: UtilityService,
  ) {
  }

  ngOnInit(): void {
    this.getAllTypeAllUtility();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllTypeAllUtility() {
    this.typeUtilityService.getAllTypeUtility().subscribe(
      (data) => {
        this.typeUtilitys = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  addUtility(idType) {
    const dialogRef = this.dialog.open(AddEditUtilityComponent, {
      data: {idType: idType, idUtility: null},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTypeAllUtility();
      }
    });
  }

  editUtility(idUtility) {
    const dialogRef = this.dialog.open(AddEditUtilityComponent, {
      data: {idUtility: idUtility, idType: null},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getAllTypeAllUtility();
      }
    });
  }

  deleteUtility(id) {
    const dialogRef = this.dialog.open(DialogDeleteSubmitComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.utilityService.deleteUtility(id).subscribe(
          (data) => {
            this.getAllTypeAllUtility();
            this.toastrService.showToast('success', 'Thành công', 'Xóa thành công');
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast('danger', 'Thất bại', 'Xóa thất bại');
          },
        );
      }
    });
  }

  addTypeUtility() {
    const dialogRef = this.dialog.open(AddEditTypeUtilityComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTypeAllUtility();
      }
    });
  }

  editTypeUtility(idTypeUtility) {
    const dialogRef = this.dialog.open(AddEditTypeUtilityComponent, {
      data: idTypeUtility,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTypeAllUtility();
      }
    });
  }

  deleteType(id) {
    const dialogRef = this.dialog.open(DialogDeleteSubmitComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.typeUtilityService.deleteTypeUtility(id).subscribe(
          (data) => {
            this.getAllTypeAllUtility();
            this.toastrService.showToast('success', 'Thành công', 'Xóa thành công');
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast('danger', 'Thất bại', 'Xóa thất bại');
          },
        );
      }
    });
  }
}
