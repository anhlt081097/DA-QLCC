import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HouseRequest} from '../model/house/house-request';
import {HouseResponse} from '../model/house/house-response';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient) {
  }

  getAllHouseByUser(): Observable<Array<HouseResponse>> {
    return this.http.get<Array<HouseResponse>>('/api/employee/house');
  }


  getAllHouseByMember() {
    return this.http.get<Array<HouseResponse>>('/api/employee/house/allhouse');
  }

  getAllHouseByHomeStay(id: number) {
    return this.http.get<Array<HouseResponse>>('/api/employee/house/homestay/' + id);
  }

  getAllHouseNoLock(): Observable<Array<HouseResponse>> {
    return this.http.get<Array<HouseResponse>>('/api/employee/house/nolock');
  }

  getHouseById(id): Observable<HouseResponse> {
    return this.http.get<HouseResponse>('/api/employee/house/' + id);
  }

  createHouse(houseRequest: HouseRequest): Observable<any> {
    return this.http.post('/api/employee/house', houseRequest);
  }

  deleteHouse(id: number): Observable<any> {
    return this.http.delete('/api/employee/house/delete/' + id, {responseType: 'text'});
  }

  lockHouse(id: number): Observable<any> {
    return this.http.get('/api/employee/house/lock/' + id, {responseType: 'text'});
  }

  unlockHouse(id: number): Observable<any> {
    return this.http.get('/api/employee/house/unlock/' + id, {responseType: 'text'});
  }

  updateHouse(houseRequest: HouseRequest): Observable<any> {
    return this.http.put('/api/employee/house', houseRequest);
  }
}
