import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UpdateProfileRequest } from '../model/update-profile/update-profile.request';
import { UpdateProfileResponse } from '../model/update-profile/update-profile.response';

const baseUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private http: HttpClient) { }


  getProfile(): Observable<UpdateProfileResponse> {
    return this.http.get<UpdateProfileResponse>(baseUrl + '/api/profile/');
  }

  updateProfile(updateProfileRequest: UpdateProfileRequest): Observable<any> {
    return this.http.put(baseUrl + '/api/profile/update', updateProfileRequest);
  }
}
