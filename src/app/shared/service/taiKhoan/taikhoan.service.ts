import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
const baseUrl = "/api/user/";
@Injectable({
  providedIn: "root",
})
export class TaikhoanService {
  constructor(private http: HttpClient) {}
  getAllUserByRole(role: string): Observable<any> {
    return this.http.get<any>(baseUrl + "role=" + role);
  }
}
