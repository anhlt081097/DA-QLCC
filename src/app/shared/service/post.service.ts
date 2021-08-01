import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PostRequest} from '../model/post/post-request';
import {PostResponse} from '../model/post/post-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }


  getAllPost(id): Observable<Array<PostResponse>> {
    return this.http.get<Array<PostResponse>>('/api/employee/post/all/' + id);
  }

  getAllPostMemberType(id): Observable<Array<PostResponse>> {
    return this.http.get<Array<PostResponse>>('/api/employee/post/all/member/' + id);
  }

  getAllPostMember(): Observable<Array<PostResponse>> {
    return this.http.get<Array<PostResponse>>('/api/employee/post');
  }

  getPostById(id): Observable<PostResponse> {
    return this.http.get<PostResponse>('/api/employee/post/' + id);
  }

  createPost(postRequest: PostRequest): Observable<any> {
    return this.http.post('/api/employee/post', postRequest);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete('/api/employee/post/delete/' + id, {responseType: 'text'});
  }

  updatePost(postRequest: PostRequest): Observable<any> {
    return this.http.put('/api/employee/post', postRequest);
  }

}
