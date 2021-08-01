import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from '../../../shared/service/post.service';
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import {DescriptionPostComponent} from '../../../shared/component/description-post/description-post.component';
import {DialogDeleteSubmitComponent} from '../../../shared/component/dialog-submit-delete/dialog-submit-delete.component';
import {ToastService} from '../../../shared/service/toast.service';


@Component({
  selector: 'ngx-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'createDate', 'typePostName', 'userName', 'id'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activateRoute: ActivatedRoute,
    private postService: PostService,
    private dialog: MatDialog,
    private toastrService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getAllPost();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllPost() {
    this.postService
      .getAllPost(this.activateRoute.snapshot.params.id)
      .subscribe(
        (data) => {
          this.dataSource.data = data;
        },
        (error) => {
          throwError(error);
        },
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
    const dialogRef = this.dialog.open(AddEditPostComponent, {
      data: {idType: this.activateRoute.snapshot.params.id} ,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllPost();
      }
    });
  }

  editPost(idPost) {
    const dialogRef = this.dialog.open(AddEditPostComponent, {
      data: {idPost: idPost},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllPost();
      }
    });
  }

  detailPost(idPost) {
    this.postService.getPostById(idPost).subscribe(
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
      },
    );
  }

  deletePost(id) {
    const dialogRef = this.dialog.open(DialogDeleteSubmitComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.postService.deletePost(id).subscribe(
          (data) => {
            this.getAllPost();
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


