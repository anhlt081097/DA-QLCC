import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { throwError } from "rxjs";
import { PostService } from "../../../shared/service/post.service";
import { AddEditPostComponent } from "./add-edit-post/add-edit-post.component";
import { DescriptionPostComponent } from "../../../shared/component/description-post/description-post.component";
import { DialogDeleteSubmitComponent } from "../../../shared/component/dialog-submit-delete/dialog-submit-delete.component";
import { ToastService } from "../../../shared/service/toast.service";
import { ThongBaoService } from "../../../shared/service/thongBao/thong-bao.service";

@Component({
  selector: "ngx-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["tieuDe", "noiDung", "ngayTao", "id"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activateRoute: ActivatedRoute,
    private postService: PostService,
    private dialog: MatDialog,
    private toastrService: ToastService,
    private thongBaoService: ThongBaoService
  ) {}

  ngOnInit(): void {
    this.getAllPost();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  convertDateToTimeStamp(date: any) {
    return new Date(date[0], date[1] - 1, date[2]);
  }
  getAllPost() {
    this.thongBaoService.getAllThongBao().subscribe(
      (data) => {
        console.log(data);
        this.dataSource.data = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addPost() {
    const type = "Add";
    const dialogRef = this.dialog.open(AddEditPostComponent, {
      data: { type },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllPost();
      }
    });
  }

  editPost(idPost) {
    const type = "Edit";
    const dialogRef = this.dialog.open(AddEditPostComponent, {
      data: { idPost: idPost, type },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllPost();
      }
    });
  }

  detailPost(idPost) {
    this.thongBaoService.deleteThongBao(idPost).subscribe(
      (data) => {
        const dialogRef = this.dialog.open(DescriptionPostComponent, {
          data: data.description,
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result === true) {
            this.getAllPost();
          }
        });
      },
      (error) => {
        throwError(error);
      }
    );
  }

  deletePost(id) {
    const dialogRef = this.dialog.open(DialogDeleteSubmitComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.thongBaoService.deleteThongBao(id).subscribe(
          (data) => {
            this.getAllPost();
            this.toastrService.showToast(
              "success",
              "Thành công",
              "Xóa thành công"
            );
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast("danger", "Thất bại", "Xóa thất bại");
          }
        );
      }
    });
  }
}
