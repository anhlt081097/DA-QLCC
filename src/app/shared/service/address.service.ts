import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CityRequest} from '../model/city/city-request';
import {CityResponse} from '../model/city/city-response';
import {DistrictRequest} from '../model/district/district-request';
import {DistrictResponse} from '../model/district/district-response';
import {VillageRequest} from '../model/village/village-request';
import {VillageResponse} from '../model/village/village-response';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {
  }

  getAllCity(): Observable<Array<CityResponse>> {
    return this.http.get<Array<CityResponse>>('/api/admin/city');
  }

  getCityById(id): Observable<CityResponse> {
    return this.http.get<CityResponse>('/api/admin/city/' + id);
  }

  createCity(cityRequest: CityRequest): Observable<any> {
    return this.http.post('/api/admin/city', cityRequest);
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete('/api/admin/city/delete/' + id, {responseType: 'text'});
  }

  updateCity(cityRequest: CityRequest): Observable<any> {
    return this.http.put('/api/admin/city', cityRequest);
  }


  getAllDistrict(): Observable<Array<DistrictResponse>> {
    return this.http.get<Array<DistrictResponse>>('/api/admin/district');
  }

  getDistrictById(id): Observable<DistrictResponse> {
    return this.http.get<DistrictResponse>('/api/admin/district/' + id);
  }


  getDistrictByCity(id): Observable<Array<DistrictResponse>> {
    return this.http.get<Array<DistrictResponse>>('/api/admin/district/city/' + id);
  }

  createDistrict(districtRequest: DistrictRequest): Observable<any> {
    return this.http.post('/api/admin/district', districtRequest);
  }

  deleteDistrict(id: number): Observable<any> {
    return this.http.delete('/api/admin/district/delete/' + id, {responseType: 'text'});
  }

  updateDistrict(districtRequest: DistrictRequest): Observable<any> {
    return this.http.put('/api/admin/district', districtRequest);
  }

  getAllVillage(): Observable<Array<VillageResponse>> {
    return this.http.get<Array<VillageResponse>>('/api/admin/village');
  }

  getVillageById(id): Observable<VillageResponse> {
    return this.http.get<VillageResponse>('/api/admin/village/' + id);
  }

  createVillage(villageRequest: VillageRequest): Observable<any> {
    return this.http.post('/api/admin/village', villageRequest);
  }

  deleteVillage(id: number): Observable<any> {
    return this.http.delete('/api/admin/village/delete/' + id, {responseType: 'text'});
  }

  updateVillage(villageRequest: VillageRequest): Observable<any> {
    return this.http.put('/api/admin/village', villageRequest);
  }


}
