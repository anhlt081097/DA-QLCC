import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CanHo } from "../../model/canHo/canho";
const baseUrl = "/api/can-ho/";
@Injectable({
  providedIn: "root",
})
export class CanhoService {
  constructor(private http: HttpClient) {}

  createCanHo(canHo: CanHo): Observable<any> {
    return this.http.post(baseUrl, canHo);
  }
  updateCanHo(canHo: CanHo): Observable<any> {
    return this.http.put(baseUrl + `${canHo.id}`, canHo);
  }
  getAllCanHo(): Observable<Array<any>> {
    return this.http.get<Array<any>>(baseUrl + "hoat-dong");
  }
  getAllCanHoKhongHoatDong(): Observable<Array<any>> {
    return this.http.get<Array<any>>(baseUrl + "khong-hoat-dong");
  }
  getCanHoById(id): Observable<any> {
    return this.http.get<any>(baseUrl + id);
  }
}
