import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { PostRequest } from "../../../../shared/model/post/post-request";
import { PostService } from "../../../../shared/service/post.service";
import "../../../../shared/ckeditor.loader";
import "ckeditor";
import { TypePostResponse } from "../../../../shared/model/type-post/type-post-response";
import { TypePostService } from "../../../../shared/service/type-post.service";
import { ToastService } from "../../../../shared/service/toast.service";
import { ThongBaoService } from "../../../../shared/service/thongBao/thong-bao.service";
@Component({
  selector: "ngx-add-edit-post",
  templateUrl: "./add-edit-post.component.html",
  styleUrls: ["./add-edit-post.component.scss"],
})
export class AddEditPostComponent implements OnInit {
  postForm: FormGroup;
  postRequest: any;
  postEditForm: FormGroup;
  postEditRequest: any;
  idPost: number;
  typePosts: TypePostResponse[];
  type: string;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddEditPostComponent>,
    private postService: PostService,
    private typePostService: TypePostService,
    @Inject(MAT_DIALOG_DATA) private data,
    private thongBaoService: ThongBaoService
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.postRequest = {
      noiDung: null,
      tieuDe: null,
    };
    this.postEditRequest = {
      id: undefined,
      ngayTao: null,
      noiDung: null,
      tieuDe: null,
    };
    this.postEditForm = new FormGroup({
      id: new FormControl(null),
      tieuDe: new FormControl(null, Validators.required),
      noiDung: new FormControl(null, Validators.required),
    });
    this.postForm = new FormGroup({
      id: new FormControl(null),
      tieuDe: new FormControl(null, Validators.required),
      noiDung: new FormControl(null, Validators.required),
    });
    if (this.type == "Edit") {
      this.postEditForm.patchValue(this.data.idPost);
    }
  }

  submitAction() {
    if (this.type == "Add") {
      this.createPost();
    } else {
      this.updatePost();
    }
  }

  createPost() {
    this.postRequest.tieuDe = this.postForm.get("tieuDe").value;
    this.postRequest.noiDung = this.postForm.get("noiDung").value;
    console.log(this.postRequest);
    this.thongBaoService.createThongBao(this.postRequest).subscribe(
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

  updatePost() {
    this.postEditRequest.id = this.data.idPost.id;
    this.postEditRequest.noiDung = this.postEditForm.get("noiDung").value;
    this.postEditRequest.tieuDe = this.postEditForm.get("tieuDe").value;
    this.postEditRequest.ngayTao = this.data.idPost.ngayTao;
    console.log(this.postEditRequest);
    this.thongBaoService.updateThongBao(this.postEditRequest).subscribe(
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
}
