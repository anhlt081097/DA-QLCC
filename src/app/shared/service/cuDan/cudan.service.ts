import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CuDan } from "../../model/cuDan/cudan";
const baseUrl = "/api/cu-dan/";
const canHoUrl = "/api/can-ho/";
@Injectable({
  providedIn: "root",
})
export class CudanService {
  constructor(private http: HttpClient) {}
  getAllCuDanCanHo(id: number): Observable<Array<any>> {
    return this.http.get<Array<any>>(canHoUrl + id + "/cu-dan");
  }
  createCuDan(cuDan: CuDan): Observable<any> {
    return this.http.post(baseUrl, cuDan);
  }
  updateCuDan(cuDan: CuDan): Observable<any> {
    return this.http.put(baseUrl + `${cuDan.id}`, cuDan);
  }
}
