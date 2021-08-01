import {Component, OnInit} from '@angular/core';
import {TypePostService} from '../../shared/service/type-post.service';
import {TypePostResponse} from '../../shared/model/type-post/type-post-response';
import {throwError} from 'rxjs';
import {PostResponse} from '../../shared/model/post/post-response';
import {PostService} from '../../shared/service/post.service';

@Component({
  selector: 'ngx-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.scss'],
})
export class PostUserComponent implements OnInit {
  typePosts: TypePostResponse[];
  posts: PostResponse[];
  postsLength: number;

  constructor(private typePostService: TypePostService,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.getAllTypePost();
    this.getAllPost();
  }


  getAllTypePost() {
    this.typePostService.getAllTypePostMember().subscribe(
      (data) => {
        this.typePosts = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  getAllPost() {
    this.postService
      .getAllPostMember()
      .subscribe(
        (data) => {
          this.posts = data;
          this.postsLength = data.length;
        },
        (error) => {
          throwError(error);
        },
      );
  }

  getAllPostByType(id: number) {
    this.postService
      .getAllPostMemberType(id)
      .subscribe(
        (data) => {
          this.posts = data;
        },
        (error) => {
          throwError(error);
        },
      );
  }
}
