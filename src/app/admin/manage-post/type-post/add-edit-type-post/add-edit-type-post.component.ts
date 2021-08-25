import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { TypePostRequest } from "../../../../shared/model/type-post/type-post-request";
import { TypePostService } from "../../../../shared/service/type-post.service";
import { ToastService } from "../../../../shared/service/toast.service";
import { TypePostResponse } from "../../../../shared/model/type-post/type-post-response";
import { PostService } from "../../../../shared/service/post.service";
import { ThongBaoService } from "../../../../shared/service/thongBao/thong-bao.service";
import { CanhoService } from "../../../../shared/service/canHo/canho.service";

@Component({
  selector: "ngx-add-edit-type-post",
  templateUrl: "./add-edit-type-post.component.html",
  styleUrls: ["./add-edit-type-post.component.scss"],
})
export class AddEditTypePostComponent implements OnInit {
  postForm: FormGroup;
  postRequest: any;
  postEditForm: FormGroup;
  postEditRequest: any;
  idPost: number;
  typePosts: TypePostResponse[];
  type: string;
  canHo: any;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddEditTypePostComponent>,
    private postService: PostService,
    private typePostService: TypePostService,
    @Inject(MAT_DIALOG_DATA) private data,
    private thongBaoService: ThongBaoService,
    private canHoService: CanhoService
  ) {}

  ngOnInit(): void {
    this.getAllCanHo();
    this.type = this.data.type;
    this.postRequest = {
      noiDung: null,
      tieuDe: null,
      canHo: null,
      trangThai: null,
    };
    this.postEditRequest = {
      id: undefined,
      ngayTao: null,
      noiDung: null,
      tieuDe: null,
      trangThai: null,
      canHo: null,
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
      canHo: new FormControl(null, Validators.required),
    });
    if (this.type == "Edit") {
      this.postEditForm.patchValue(this.data.idPost);
    }
  }
  private getAllCanHo() {
    this.canHoService.getAllCanHo().subscribe(
      (data) => {
        this.canHo = data;
        console.log(this.canHo);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  submitAction() {
    if (this.type == "Add") {
      this.createPost();
    } else {
      this.updatePost();
    }
  }

  createPost() {
    this.postRequest.canHo = this.postForm.get("canHo").value;
    this.postRequest.tieuDe = this.postForm.get("tieuDe").value;
    this.postRequest.noiDung = this.postForm.get("noiDung").value;
    this.postRequest.trangThai = false;
    console.log(this.postRequest);
    this.thongBaoService.createThongBaoRieng(this.postRequest).subscribe(
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
    this.postEditRequest.trangThai = this.data.idPost.trangThai;
    this.postEditRequest.canHo = this.data.idPost.canHo;
    console.log(this.postEditRequest);
    this.thongBaoService.updateThongBaoRieng(this.postEditRequest).subscribe(
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
