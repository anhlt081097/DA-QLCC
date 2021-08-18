import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { XeCo } from "../../model/xeCo/xeco";
const baseUrl = "/api/phuong-tien";
const canHoUrl = "/api/can-ho/";
@Injectable({
  providedIn: "root",
})
export class XecoService {
  constructor(private http: HttpClient) {}
  getAllPhuongTienByCanHo(id: number): Observable<Array<any>> {
    return this.http.get<Array<any>>(canHoUrl + id + "/phuong-tien");
  }
  createPhuongTien(xeCo: XeCo): Observable<any> {
    return this.http.post(baseUrl, xeCo);
  }
  getAllPhuongTien(): Observable<Array<any>> {
    return this.http.get<Array<any>>(baseUrl);
  }
  // updateCanHo(canHo: CanHo): Observable<any> {
  //   return this.http.put(baseUrl + `${canHo.id}`, canHo);
  // }
  deletePhuongTien(id: number): Observable<any> {
    return this.http.delete(baseUrl + "/" + id, { responseType: "text" });
  }
}
