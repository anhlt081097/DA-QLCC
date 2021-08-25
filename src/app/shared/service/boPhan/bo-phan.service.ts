import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
const baseUrl = "/api/bo-phan/";

@Injectable({
  providedIn: "root",
})
export class BoPhanService {
  constructor(private http: HttpClient) {}
  getAllBoPhan(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }
  getAllNhanVienByIdBoPhan(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + `${id}/nhan-vien`);
  }
}
