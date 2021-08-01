import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PlaceRequest} from '../model/place/place-request';
import {PlaceResponse} from '../model/place/place-response';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {
  }

  getAllPlace(): Observable<Array<PlaceResponse>> {
    return this.http.get<Array<PlaceResponse>>('/api/admin/place');
  }

  getPlaceById(id): Observable<PlaceResponse> {
    return this.http.get<PlaceResponse>('/api/admin/place/' + id);
  }

  createPlace(placeRequest: PlaceRequest): Observable<any> {
    return this.http.post('/api/admin/place', placeRequest);
  }

  deletePlace(id: number): Observable<any> {
    return this.http.delete('/api/admin/place/delete/' + id, {responseType: 'text'});
  }

  updatePlace(placeRequest: PlaceRequest): Observable<any> {
    return this.http.put('/api/admin/place', placeRequest);
  }


}
