import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilityRequest } from '../model/utility/utility-request';
import { UtilityResponse } from '../model/utility/utility-response';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient) { }
  getAllUtility(): Observable<Array<UtilityResponse>> {
    return this.http.get<Array<UtilityResponse>>( '/api/admin/utility');
  }

  getUtilityById(id): Observable<UtilityResponse> {
    return this.http.get<UtilityResponse>('/api/admin/utility/'+ id);
  }

  getUtilityByTypeUtility(id): Observable<Array<UtilityResponse>> {
    return this.http.get<Array<UtilityResponse>>('/api/admin/utility/typeutility/'+ id);
  }

  createUtility(memberRequest: UtilityRequest): Observable<any> {
    return this.http.post( '/api/admin/utility', memberRequest);
  }

  deleteUtility(id: number): Observable<any> {
    return this.http.delete( '/api/admin/utility/delete/'+ id,{ responseType: 'text' });
  }

  updateUtility(memberRequest: UtilityRequest): Observable<any> {
    return this.http.put('/api/admin/utility', memberRequest);
  }


}
