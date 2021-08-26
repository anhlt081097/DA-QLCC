import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
const baseUrl = "/api/";
@Injectable({
  providedIn: "root",
})
export class ThanhToanPaypalService {
  constructor(private http: HttpClient) {}

  thanhToanHoaDonDichVu(id): Observable<any> {
    return this.http.get(baseUrl + "hoa-don-dich-vu/submitpaypal/" + id, {
      responseType: "text",
    });
  }

  checkTrangThaiThanhToanHddv(id): Observable<any> {
    return this.http.get<any>(baseUrl + "hoa-don-dich-vu/paypal/" + id);
  }

  thanhToanHoaDonSuaChua(id): Observable<any> {
    return this.http.get(baseUrl + "hoa-don-sua-chua/submitpaypal/" + id, {
      responseType: "text",
    });
  }

  checkTrangThaiThanhToanHdsc(id): Observable<any> {
    return this.http.get<any>(baseUrl + "hoa-don-sua-chua/paypal/" + id);
  }
}
