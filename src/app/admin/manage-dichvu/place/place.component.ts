import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';
import {LocalDataSource, Ng2SmartTableComponent} from 'ng2-smart-table';
import {throwError} from 'rxjs';
import {PlaceService} from '../../../shared/service/place.service';
import {AddEditPlaceComponent} from './add-edit-place/add-edit-place.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteSubmitComponent} from "../../../shared/component/dialog-submit-delete/dialog-submit-delete.component";
import {ToastService} from "../../../shared/service/toast.service";

@Component({
  selector: 'ngx-list-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit, AfterViewInit {
  listPlace: LocalDataSource = new LocalDataSource();
  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;

  settingsTable = {
    actions: {
      columnTitle: '',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      image: {
        title: 'Hình ảnh',
        type: 'html',
        valuePrepareFunction: (value) => {
          return `<img src="${value}"  width="150px" height="150px"  alt="Display error">`;
        },
        width: '10%',
      },
      placeName: {
        title: 'Tên địa điểm',
        type: 'string',
      },
    },
    mode: 'external',
  };

  constructor(
    private dialog: MatDialog,
    private placeService: PlaceService,
    private toastrService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.getAllPlace();
  }

  getAllPlace() {
    this.placeService.getAllPlace().subscribe(
      (data) => {
        this.listPlace.load(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  ngAfterViewInit(): void {
    this.smartTable.edit.subscribe((node: any) => {
      this.openEdit(node.data.id);
    });
    this.smartTable.delete.subscribe((node: any) => {
      this.onDelete(node.data.id);
    });
    this.smartTable.create.subscribe((node: any) => {
      this.openAdd();
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddEditPlaceComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllPlace();
      }
    });
  }

  openEdit(id: number) {
    const dialogRef = this.dialog.open(AddEditPlaceComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllPlace();
      }
    });
  }

  onDelete(id_user: number) {
    const dialogRef = this.dialog.open(DialogDeleteSubmitComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.placeService.deletePlace(id_user).subscribe(
          (data) => {
            this.getAllPlace();
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
