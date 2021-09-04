import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { LocalDataSource, Ng2SmartTableComponent } from "ng2-smart-table";
import { throwError } from "rxjs";
import { HomeStayService } from "../../../shared/service/homestay.service";
import { AddressService } from "../../../shared/service/address.service";
import { VillageResponse } from "../../../shared/model/village/village-response";
import { MatDialog } from "@angular/material/dialog";
import { DialogSubmitLockComponent } from "../../../shared/component/dialog-submit-lock/dialog-submit-lock.component";
import { ToastService } from "../../../shared/service/toast.service";
import { CityResponse } from "../../../shared/model/city/city-response";
import { DistrictResponse } from "../../../shared/model/district/district-response";
import { PlaceResponse } from "../../../shared/model/place/place-response";
import { PlaceService } from "../../../shared/service/place.service";
import { DialogSubmitUnlockComponent } from "../../../shared/component/dialog-submit-unlock/dialog-submit-unlock.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EmployeeResponse } from "../../../shared/model/employee/employee-response";
import { AddEditHomeStayComponent } from "../home-stay/add-edit-home-stay/add-edit-home-stay.component";
import { AddDichVuCoDinhComponent } from "./add-dich-vu-co-dinh/add-dich-vu-co-dinh.component";
import { DichvuService } from "../../../shared/service/dichVu/dichvu.service";
import { DichVuCoDinh } from "../../../shared/model/dichVu/dichvu";
import { BoPhanService } from "../../../shared/service/boPhan/bo-phan.service";
@Component({
  selector: "ngx-dich-vu",
  templateUrl: "./dich-vu.component.html",
  styleUrls: ["./dich-vu.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class DichVuComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  employee = new MatTableDataSource();
  employeeLock = new MatTableDataSource();
  dichVuCoDinh = new MatTableDataSource();
  dichVuKhac = new MatTableDataSource();
  columnsToDisplay = ["stt", "tenDichVu", "donGia", "id"];
  columnsToDisplayDvk = ["stt", "boPhan", "tenDichVu", "donGia", "id"];
  expandedElement: DichVuCoDinh | null;
  check: EmployeeResponse[] = [];
  selectPlace: number;
  listHomeStay: LocalDataSource = new LocalDataSource();
  listHomeStayLock: LocalDataSource = new LocalDataSource();
  @ViewChild("table")
  smartTable: Ng2SmartTableComponent;
  villages: VillageResponse[];
  citys: CityResponse[];
  districts: DistrictResponse[];
  places: PlaceResponse[];
  boPhan: any;
  boPhanList: any;
  settingsTable = {
    actions: {
      columnTitle: "",
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
      deleteButtonContent: '<i class="nb-locked"></i>',
      confirmDelete: true,
    },
    columns: {
      homeStayName: {
        title: "Tên Home stay",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return `<a href="/admin/manage-homestay/detail/${row.id}">${row.homeStayName}</a>`;
        },
      },
      phone: {
        title: "Số điện thoại",
        type: "string",
      },
      address: {
        title: "Địa chỉ",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          const address =
            row.villageName + " - " + row.districtName + " - " + row.cityName;
          return address;
        },
      },
    },
    mode: "external",
  };

  settingsTableLock = {
    actions: {
      columnTitle: "",
      edit: false,
      add: false,
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
      deleteButtonContent: '<i class="nb-locked"></i>',
      confirmDelete: true,
    },
    columns: {
      homeStayName: {
        title: "Tên Home stay",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return `<a href="/admin/manage-homestay/detail/${row.id}">${row.homeStayName}</a>`;
        },
      },
      phone: {
        title: "Số điện thoại",
        type: "string",
      },
      address: {
        title: "Địa chỉ",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          const address =
            row.villageName + " - " + row.districtName + " - " + row.cityName;
          return address;
        },
      },
    },
  };
  @ViewChild("TableOnePaginator", { static: true })
  tableOnePaginator: MatPaginator;
  @ViewChild("TableOneSort", { static: true }) tableOneSort: MatSort;
  @ViewChild("TableTwoPaginator", { static: true })
  tableTwoPaginator: MatPaginator;
  @ViewChild("TableTwoSort", { static: true }) tableTwoSort: MatSort;
  constructor(
    private dialog: MatDialog,
    private homeStayService: HomeStayService,
    private addressService: AddressService,
    private toastrService: ToastService,
    private placeService: PlaceService,
    private dichVuService: DichvuService,
    private boPhanService: BoPhanService
  ) {}

  ngOnInit(): void {
    this.employee.data = [
      {
        id: 1,
        userName: "toppdogg42",
        password: "acnb47jo",
        email: "anhlt081097@gmail.com",
        firstName: "Lê Tuấn",
        lastName: "Anh",
        phone: "0967789821",
        address: "Ngọc Hoà",
        image:
          "https://scontent.fhan5-5.fna.fbcdn.net/v/t1.6435-9/117644432_1438140583061569_8312868612986943830_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=e3f864&_nc_ohc=CGpAdaeUGPUAX_Obpg-&_nc_ht=scontent.fhan5-5.fna&oh=be40b8a084bae99fa66fed7c95bff172&oe=60F413F8",
        role: "user",
        createdDate: "2021/07/14",
        sex: "Nam",
        enabled: false,
        status: false,
        dateOfBirth: "1997/10/08",
        id_creator: 1,
        id_homeStay: 1,
        homeStayName: "Củ Dền",
      },
    ];
    this.getAllDichVuCoDinh();
    this.getAllBoPhan();
    this.getAllDichVuKhacByBoPhan(1);
  }
  private getAllDichVuCoDinh() {
    this.dichVuService.getAllDichVuCoDinh().subscribe(
      (data) => {
        this.dichVuCoDinh.data = data;
        console.log(this.dichVuCoDinh);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  private getAllBoPhan() {
    this.boPhanService.getAllBoPhan().subscribe(
      (data) => {
        this.boPhanList = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getAllDichVuKhacByBoPhan(boPhan: any) {
    this.dichVuService.getAllLoaiSuaChuaByBoPhan(boPhan).subscribe(
      (data) => {
        this.dichVuKhac.data = data;
        console.log(this.dichVuKhac.data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  ngAfterViewInit(): void {
    // this.smartTable.edit.subscribe((node: any) => {
    //   this.openEdit(node.data.id);
    // });
    // this.smartTable.delete.subscribe((node: any) => {
    //   this.onDelete(node.data.id);
    // });
    // this.smartTable.create.subscribe((node: any) => {
    //   this.openAdd();
    // });
    this.dichVuCoDinh.paginator = this.tableTwoPaginator;
    this.dichVuCoDinh.sort = this.tableTwoSort;
    this.dichVuKhac.paginator = this.tableOnePaginator;
    this.dichVuKhac.sort = this.tableOneSort;
  }
  applyFilterDichVu(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dichVuCoDinh.filter = filterValue.trim().toLowerCase();
    if (this.dichVuCoDinh.paginator) {
      this.dichVuCoDinh.paginator.firstPage();
    }
  }
  applyFilterDichVuKhac(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dichVuKhac.filter = filterValue.trim().toLowerCase();
    if (this.dichVuKhac.paginator) {
      this.dichVuKhac.paginator.firstPage();
    }
  }
  onUnlock(event): void {
    const dialogRef = this.dialog.open(DialogSubmitUnlockComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.homeStayService.unlockHomeStay(event.data.id).subscribe(
          (data) => {
            this.toastrService.showToast(
              "success",
              "Thành công",
              "Mở khóa thành công"
            );
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast(
              "danger",
              "Thất bại",
              "Mở khóa thất bại"
            );
          }
        );
      }
    });
  }

  openAdd() {
    const typeAction = "edit";
    const dialogRef = this.dialog.open(AddDichVuCoDinhComponent, {
      data: { typeAction },
      width: "250px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
  }
  openAddDvCoDinh() {
    const typeAction = "addDvCoDinh";
    const dialogRef = this.dialog.open(AddDichVuCoDinhComponent, {
      data: { typeAction },
      width: "250px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllDichVuCoDinh();
      }
    });
  }
  openAddDvKhac() {
    const typeAction = "addDvKhac";
    const dialogRef = this.dialog.open(AddDichVuCoDinhComponent, {
      data: { typeAction },
      width: "300px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllDichVuKhacByBoPhan(this.boPhan);
      }
    });
  }
  openEditDvCoDinh(dataEdit) {
    const typeAction = "editDvCoDinh";
    const data = dataEdit;
    const dialogRef = this.dialog.open(AddDichVuCoDinhComponent, {
      data: { typeAction, data },
      width: "250px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllDichVuCoDinh();
      }
    });
  }
  openEditDvKhac(dataEdit) {
    const typeAction = "editDvKhac";
    const data = dataEdit;
    const dialogRef = this.dialog.open(AddDichVuCoDinhComponent, {
      data: { typeAction, data },
      width: "250px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllDichVuKhacByBoPhan(this.boPhan);
      }
    });
  }
  openEdit(id: number) {
    const dialogRef = this.dialog.open(AddEditHomeStayComponent, {
      data: {
        id: id,
        village: this.villages,
        city: this.citys,
        district: this.districts,
        places: this.places,
      },
      width: "750px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
  }

  onDelete(id_user: number) {
    const dialogRef = this.dialog.open(DialogSubmitLockComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.homeStayService.deleteHomeStay(id_user).subscribe(
          (data) => {
            this.toastrService.showToast(
              "success",
              "Thành công",
              "Khóa thành công"
            );
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast("danger", "Thất bại", "Khóa thất bại");
          }
        );
      }
    });
  }
}
