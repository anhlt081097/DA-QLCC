import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypePostRequest } from '../model/type-post/type-post-request';
import { TypePostResponse } from '../model/type-post/type-post-response';

@Injectable({
  providedIn: 'root'
})
export class TypePostService {

  constructor(private http: HttpClient) { }


  getAllTypePost(): Observable<Array<TypePostResponse>> {
    return this.http.get<Array<TypePostResponse>>( '/api/admin/typepost');
  }

  getAllTypePostMember(): Observable<Array<TypePostResponse>> {
    return this.http.get<Array<TypePostResponse>>( '/api/admin/typepost/member');
  }

  getTypePostById(id): Observable<TypePostResponse> {
    return this.http.get<TypePostResponse>( '/api/admin/typepost/'+ id);
  }

  createTypePost(typePostRequest: TypePostRequest): Observable<any> {
    return this.http.post('/api/admin/typepost', typePostRequest);
  }

  deleteTypePost(id: number): Observable<any> {
    return this.http.delete( '/api/admin/typepost/delete/'+ id,{ responseType: 'text' });
  }

  updateTypePost(typePostRequest: TypePostRequest): Observable<any> {
    return this.http.put('/api/admin/typepost', typePostRequest);
  }

}
