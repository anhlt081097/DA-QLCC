import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DetailPlaceRequest} from '../model/detail-place/detail-place-request';
import {DetailPlaceResponse} from '../model/detail-place/detail-place-response';

@Injectable({
  providedIn: 'root',
})
export class DetailPlaceService {
  constructor(private http: HttpClient) {
  }

  getAllDetailPlace(id: number): Observable<Array<DetailPlaceResponse>> {
    return this.http.get<Array<DetailPlaceResponse>>('/api/admin/detailplace/' + id);
  }

  createDetailPlace(detailPlaceRequest: DetailPlaceRequest): Observable<any> {
    return this.http.post('/api/admin/detailplace', detailPlaceRequest);
  }

  deleteDetailPlace(id: number): Observable<any> {
    return this.http.delete('/api/admin/detailplace/delete/' + id, {responseType: 'text'});
  }
}
