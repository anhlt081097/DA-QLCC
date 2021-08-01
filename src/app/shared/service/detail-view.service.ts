import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {DetailViewResponse} from '../model/detail-view/detail-view-response';
import {DetailViewRequest} from '../model/detail-view/detail-view-request';

@Injectable({
  providedIn: 'root'
})
export class DetailViewService {

  constructor(private http: HttpClient) {
  }

  getAllDetailView(id: number): Observable<Array<DetailViewResponse>> {
    return this.http.get<Array<DetailViewResponse>>('/api/employee/detailview/' + id);
  }

  createDetailView(detailViewRequest: DetailViewRequest): Observable<any> {
    return this.http.post('/api/employee/detailview', detailViewRequest);
  }

  deleteDetailView(id: number): Observable<any> {
    return this.http.delete('/api/employee/detailview/delete/' + id, {responseType: 'text'});
  }

}
