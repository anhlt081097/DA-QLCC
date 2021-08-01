import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeUtilityRequest } from '../model/type-utility/type-utility-request';
import { TypeUtilityResponse } from '../model/type-utility/type-utility-response';

@Injectable({
  providedIn: 'root'
})
export class TypeUtilityService {

  constructor(private http: HttpClient) { }

  getAllTypeUtility(): Observable<Array<TypeUtilityResponse>> {
    return this.http.get<Array<TypeUtilityResponse>>( '/api/admin/typeutility');
  }

  getTypeUtilityById(id): Observable<TypeUtilityResponse> {
    return this.http.get<TypeUtilityResponse>('/api/admin/typeutility/'+ id);
  }

  createTypeUtility(typeUtilityRequest: TypeUtilityRequest): Observable<any> {
    return this.http.post( '/api/admin/typeutility', typeUtilityRequest);
  }

  deleteTypeUtility(id: number): Observable<any> {
    return this.http.delete( '/api/admin/typeutility/delete/'+ id,{ responseType: 'text' });
  }

  updateTypeUtility(typeUtilityRequest: TypeUtilityRequest): Observable<any> {
    return this.http.put('/api/admin/typeutility', typeUtilityRequest);
  }


}
