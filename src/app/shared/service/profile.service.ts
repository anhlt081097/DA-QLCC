import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProfileRequest } from "../model/profile/profile.request";
import { ProfileResponse } from "../model/profile/profile.response";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>("/api/profile/");
  }

  getProfileId(id: number): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>("/api/profile/" + id);
  }

  editProfile(ProfileRequest: ProfileRequest): Observable<any> {
    return this.http.put("/api/profile/edit", ProfileRequest);
  }

  editPassword(ProfileRequest: ProfileRequest): Observable<any> {
    return this.http.put("/api/profile/edit/password", ProfileRequest);
  }

  editAccount(ProfileRequest: any): Observable<any> {
    return this.http.put("/api/profile/edit", ProfileRequest);
  }
  editAccountPass(ProfileRequest: any): Observable<any> {
    return this.http.put("/api/profile/edit/password", ProfileRequest);
  }
}
