import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DetailUtilityRequest} from '../model/detail-utility/detail-utility-request';
import {DetailUtilityResponse} from '../model/detail-utility/detail-utility-response';

@Injectable({
  providedIn: 'root'
})
export class DetailUtilityService {

  constructor(private http: HttpClient) {
  }

  getAllDetailUtility(id: number): Observable<Array<DetailUtilityResponse>> {
    return this.http.get<Array<DetailUtilityResponse>>('/api/employee/detailutility/room/' + id);
  }

  getDetailUtilityById(id): Observable<DetailUtilityResponse> {
    return this.http.get<DetailUtilityResponse>('/api/employee/detailutility/' + id);
  }

  createDetailUtility(detailUtilityRequest: DetailUtilityRequest): Observable<any> {
    return this.http.post('/api/employee/detailutility', detailUtilityRequest);
  }

  updateDetailUtility(detailUtilityRequest: DetailUtilityRequest): Observable<any> {
    return this.http.put('/api/employee/detailutility', detailUtilityRequest);
  }

  deleteDetailUtility(id: number): Observable<any> {
    return this.http.delete('/api/employee/detailutility/delete/' + id, {responseType: 'text'});
  }
}
