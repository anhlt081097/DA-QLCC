import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {throwError} from 'rxjs';
import {PostService} from '../../shared/service/post.service';
import {PostResponse} from '../../shared/model/post/post-response';

@Component({
  selector: 'ngx-detail-post-user',
  templateUrl: './detail-post-user.component.html',
  styleUrls: ['./detail-post-user.component.scss'],
})
export class DetailPostUserComponent implements OnInit {
  posts: PostResponse;

  constructor(private activateRoute: ActivatedRoute,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById() {
    this.postService
      .getPostById(this.activateRoute.snapshot.params.id)
      .subscribe(
        (data) => {
          this.posts = data;
        },
        (error) => {
          throwError(error);
          this.router.navigateByUrl('/user');
        },
      );
  }

}
