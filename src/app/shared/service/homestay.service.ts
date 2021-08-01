import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeStayRequest } from '../model/home-stay/home-stay-request';
import { HomeStayResponse } from '../model/home-stay/home-stay-response';

@Injectable({
  providedIn: 'root'
})

export class HomeStayService {

  constructor(private http: HttpClient) { }

  getAllHomeStay(): Observable<Array<HomeStayResponse>> {
    return this.http.get<Array<HomeStayResponse>>( '/api/admin/homestay');
  }

  getAllHomeStayLock(): Observable<Array<HomeStayResponse>> {
    return this.http.get<Array<HomeStayResponse>>( '/api/admin/homestay/lock');
  }

  getHomeStayById(id): Observable<HomeStayResponse> {
    return this.http.get<HomeStayResponse>( '/api/admin/homestay/'+ id);
  }

  createHomeStay(homeStayRequest: HomeStayRequest): Observable<any> {
    return this.http.post( '/api/admin/homestay', homeStayRequest);
  }

  deleteHomeStay(id: number): Observable<any> {
    return this.http.delete( '/api/admin/homestay/delete/'+ id,{ responseType: 'text' });
  }

  unlockHomeStay(id: number): Observable<any> {
    return this.http.get('/api/admin/homestay/unlock/'+ id,{ responseType: 'text' });
  }

  updateHomeStay(homeStayRequest: HomeStayRequest): Observable<any> {
    return this.http.put('/api/admin/homestay', homeStayRequest);
  }

}
