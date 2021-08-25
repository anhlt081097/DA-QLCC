import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
const baseUrl = "/api/dashboard/";
@Injectable({
  providedIn: "root",
})
export class DashBoardService {
  constructor(private http: HttpClient) {}

  getThongKe(): Observable<Array<any>> {
    return this.http.get<Array<any>>(baseUrl + "admin");
  }
  getAllSinhNhat(): Observable<Array<any>> {
    return this.http.get<Array<any>>(
      baseUrl + "admin/cu-dan-sinh-nhat-trong-thang"
    );
  }
  guiChucMung(id: any): Observable<any> {
    return this.http.get<any>(
      baseUrl + "admin/gui-loi-chuc-mung-sinh-nhat/" + id
    );
  }
  getThongKeHoaDonDichVu(nam: string, thang: string): Observable<any> {
    return this.http.get<any>(
      baseUrl + `admin/thong-ke-hoa-don-dich-vu/nam=${nam}&thang=${thang}`
    );
  }
  getThongKeHoaDonSuaChua(nam: string, thang: string): Observable<any> {
    return this.http.get<any>(
      baseUrl + `admin/thong-ke-hoa-don-sua-chua/nam=${nam}&thang=${thang}`
    );
  }
}
