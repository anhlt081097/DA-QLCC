import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { PostRequest } from '../../../../shared/model/post/post-request';
import { PostService } from '../../../../shared/service/post.service';
import '../../../../shared/ckeditor.loader';
import 'ckeditor';
import { TypePostResponse } from '../../../../shared/model/type-post/type-post-response';
import { TypePostService } from '../../../../shared/service/type-post.service';
import {ToastService} from '../../../../shared/service/toast.service';
@Component({
  selector: 'ngx-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.scss'],
})
export class AddEditPostComponent implements OnInit {
  postForm: FormGroup;
  postRequest: PostRequest;
  idPost: number;
  typePosts: TypePostResponse[];

  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddEditPostComponent>,
    private postService: PostService,
    private typePostService: TypePostService,
    @Inject(MAT_DIALOG_DATA) private data ,
  ) {}

  ngOnInit(): void {
    this.postRequest = {
      id: undefined,
      title: null,
      description: null,
      id_typePost: undefined,
    };
    this.postForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      id_typePost: new FormControl(null),
    });
    if (this.data.idPost) {
      this.idPost = this.data.idPost;
      this.getPostById();
      this.getAllTypePost();
    } else {
      this.postForm.get('id_typePost').setValue(this.data.idType);
    }
  }

  getPostById() {
    this.postService.getPostById(this.data.idPost).subscribe(
      (data) => {
        this.postForm.patchValue(data);
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getAllTypePost() {
    this.typePostService.getAllTypePost().subscribe(
      (data) => {
        this.typePosts = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  submitAction() {
    if (this.idPost) {
      this.updateTypePost();
    } else {
      this.createTypePost();
    }
  }

  createTypePost() {
    this.postRequest.description = this.postForm.get(
      'description',
    ).value;
    this.postRequest.title = this.postForm.get(
      'title',
    ).value;
    this.postRequest.id_typePost = this.postForm.get(
      'id_typePost',
    ).value;

    this.postService
      .createPost(this.postRequest)
      .subscribe(
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

  updateTypePost() {
    this.postRequest.id = this.postForm.get(
      'id',
    ).value;
    this.postRequest.description = this.postForm.get(
      'description',
    ).value;
    this.postRequest.title = this.postForm.get(
      'title',
    ).value;
    this.postRequest.id_typePost = this.postForm.get(
      'id_typePost',
    ).value;

    this.postService
      .updatePost(this.postRequest)
      .subscribe(
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
