import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TheCuDan } from "../../model/theCuDan/theCuDan";
const baseUrl = "/api/the-cu-dan";
const canHoUrl = "/api/can-ho/";
@Injectable({
  providedIn: "root",
})
export class ThecudanService {
  constructor(private http: HttpClient) {}

  createTheCuDan(theCuDan: TheCuDan): Observable<any> {
    return this.http.post(baseUrl, theCuDan);
  }
  // updateCanHo(canHo: CanHo): Observable<any> {
  //   return this.http.put(baseUrl + `${canHo.id}`, canHo);
  // }
  getAllTheCuDanByCanHo(id: number): Observable<Array<any>> {
    return this.http.get<Array<any>>(canHoUrl + id + "/the-cu-dan");
  }
  getAllTheCuDan(): Observable<Array<any>> {
    return this.http.get<Array<any>>(baseUrl);
  }
  // getAllTheCuDanChuaSuDungByCanHo(id: number): Observable<Array<any>> {
  //   return this.http.get<Array<any>>(canHoUrl + id + "/the-cu-dan");
  // }
  deleteTheCuDan(id: number): Observable<any> {
    return this.http.delete(baseUrl + "/" + id, { responseType: "text" });
  }

  // getAllCanHoKhongHoatDong(): Observable<Array<any>> {
  //   return this.http.get<Array<any>>(baseUrl + "khong-hoat-dong");
  // }
  // getCanHoById(id): Observable<any> {
  //   return this.http.get<any>(baseUrl + "/" + id);
  // }
}
