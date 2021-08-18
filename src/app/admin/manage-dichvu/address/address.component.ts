import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {LocalDataSource, Ng2SmartTableComponent} from 'ng2-smart-table';
import {throwError} from 'rxjs';
import {AddressService} from '../../../shared/service/address.service';
import {AddEditCityComponent} from './add-edit-city/add-edit-city.component';
import {AddEditDistrictComponent} from './add-edit-district/add-edit-district.component';
import {AddEditVillageComponent} from './add-edit-village/add-edit-village.component';
import {DialogDeleteSubmitComponent} from "../../../shared/component/dialog-submit-delete/dialog-submit-delete.component";
import {ToastService} from "../../../shared/service/toast.service";
import {CityResponse} from "../../../shared/model/city/city-response";
import {DistrictResponse} from "../../../shared/model/district/district-response";

@Component({
  selector: 'ngx-list-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, AfterViewInit {
  listCity: LocalDataSource = new LocalDataSource();
  listDistrict: LocalDataSource = new LocalDataSource();
  listVillage: LocalDataSource = new LocalDataSource();
  // citys: BookingResponse[];
  // districts: DistrictResponse[];
  @ViewChild('tableCity')
  smartTableCity: Ng2SmartTableComponent;
  @ViewChild('tableDistrict')
  smartTableDistrict: Ng2SmartTableComponent;
  @ViewChild('tableVillage')
  smartTableVillage: Ng2SmartTableComponent;

  settingsTableCity = {
    actions: {
      columnTitle: '',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      cityName: {
        title: 'Tên thành phố',
        type: 'string',
      },
      type: {
        title: 'Loại',
        type: 'string',
      },
    },
    mode: 'external',
  };

  settingsTableDistrict = {
    actions: {
      columnTitle: '',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      districtName: {
        title: 'Tên quận',
        type: 'string',
      },
      type: {
        title: 'Loại',
        type: 'string',
      },
      cityName: {
        title: 'Thuộc thành phố',
        type: 'string',
      },
    },
    mode: 'external',
  };

  settingsTableVillage = {
    actions: {
      columnTitle: '',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      villageName: {
        title: 'Tên phường',
        type: 'string',
      },
      type: {
        title: 'Loại',
        type: 'string',
      },
      cityName: {
        title: 'Thuộc thành phố',
        type: 'string',
      },
      districtName: {
        title: 'Thuộc quận',
        type: 'string',
      },
    },
    mode: 'external',
  };

  constructor(
    private addressService: AddressService,
    private toastrService: ToastService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getAllCity();
    this.getAllDistrict();
    this.getAllVillage();
  }

  private getAllCity() {
    this.addressService.getAllCity().subscribe(
      (data) => {
        this.listCity.load(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  private getAllDistrict() {
    this.addressService.getAllDistrict().subscribe(
      (data) => {
        this.listDistrict.load(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  private getAllVillage() {
    this.addressService.getAllVillage().subscribe(
      (data) => {
        this.listVillage.load(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  ngAfterViewInit(): void {
    this.smartTableCity.edit.subscribe((node: any) => {
      this.openEditCity(node.data.id);
    });
    this.smartTableCity.delete.subscribe((node: any) => {
      this.onDeleteCity(node.data.id);
    });
    this.smartTableCity.create.subscribe((node: any) => {
      this.openAddCity();
    });
    this.smartTableDistrict.edit.subscribe((node: any) => {
      this.openEditDistrict(node.data.id);
    });
    this.smartTableDistrict.delete.subscribe((node: any) => {
      this.onDeleteDistrict(node.data.id);
    });
    this.smartTableDistrict.create.subscribe((node: any) => {
      this.openAddDistrict();
    });
    this.smartTableVillage.edit.subscribe((node: any) => {
      this.openEditVillage(node.data.id);
    });
    this.smartTableVillage.delete.subscribe((node: any) => {
      this.onDeleteVillage(node.data.id);
    });
    this.smartTableVillage.create.subscribe((node: any) => {
      this.openAddVillage();
    });
  }

  openAddCity() {
    const dialogRef = this.dialog.open(AddEditCityComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllCity();
      }
    });
  }

  openEditCity(id: number) {
    const dialogRef = this.dialog.open(AddEditCityComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllCity();
      }
    });
  }

  onDeleteCity(id): void {
    const dialogRef = this.dialog.open(DialogDeleteSubmitComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.addressService.deleteCity(id).subscribe(
          (data) => {
            this.getAllCity();
            this.toastrService.showToast('success', 'Thành công', 'Xóa thành công');
          },
          (error) => {
            this.toastrService.showToast('danger', 'Thất bại', 'Xóa thất bại');
            throwError(error);
          },
        );
      }
    });
  }

  openAddDistrict() {
    const dialogRef = this.dialog.open(AddEditDistrictComponent, {
      data: {citys: this.listCity},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllDistrict();
      }
    });
  }

  openEditDistrict(id: number) {
    const dialogRef = this.dialog.open(AddEditDistrictComponent, {
      data: {id: id, citys: this.listCity},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllDistrict();
      }
    });
  }

  onDeleteDistrict(id): void {
    const dialogRef = this.dialog.open(DialogDeleteSubmitComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.addressService.deleteDistrict(id).subscribe(
          (data) => {
            this.getAllDistrict();
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

  openAddVillage() {
    const dialogRef = this.dialog.open(AddEditVillageComponent,
      {
        data: {citys: this.listCity, districts: this.listDistrict},
      });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllVillage();
      }
    });
  }

  openEditVillage(id: number) {
    const dialogRef = this.dialog.open(AddEditVillageComponent, {
      data: {id: id, citys: this.listCity, districts: this.listDistrict},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllVillage();
      }
    });
  }

  onDeleteVillage(id): void {
    const dialogRef = this.dialog.open(DialogDeleteSubmitComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.addressService.deleteVillage(id).subscribe(
          (data) => {
            this.getAllVillage();
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
