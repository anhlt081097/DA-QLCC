import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  DichVu,
  DichVuChiTiet,
  DichVuCoDinh,
  ThanhToanHDDV,
} from "../../model/dichVu/dichvu";
const canHoUrl = "/api/can-ho/";
const baseUrl = "/api/hoa-don-dich-vu/";
const dichVuUrl = "/api/dich-vu-co-dinh";
const dichVuKhacUrl = "/api/loai-sua-chua";
const hoaDonSuaChuaUrl = "/api/hoa-don-sua-chua";
@Injectable({
  providedIn: "root",
})
export class DichvuService {
  constructor(private http: HttpClient) {}
  getAllDichVu(): Observable<DichVu[]> {
    return this.http.get<DichVu[]>(baseUrl);
  }
  getAllDichVuByIdCanHo(idCanHo: any): Observable<DichVu[]> {
    return this.http.get<DichVu[]>(canHoUrl + `${idCanHo}` + "/hoa-don");
  }
  getChiTietHoaDonDichVu(idHoaDon: any): Observable<DichVuChiTiet[]> {
    return this.http.get<DichVuChiTiet[]>(
      baseUrl + `${idHoaDon}` + "/chi-tiet-hoa-don-dich-vu"
    );
  }
  getAllDichVuCoDinh(): Observable<DichVuCoDinh[]> {
    return this.http.get<DichVuCoDinh[]>(dichVuUrl);
  }
  getAllDichVuKhac(): Observable<DichVu[]> {
    return this.http.get<DichVu[]>(hoaDonSuaChuaUrl);
  }
  updateDvCoDinh(dichVuCoDinh: DichVuCoDinh): Observable<any> {
    return this.http.put(dichVuUrl + `/${dichVuCoDinh.id}`, dichVuCoDinh);
  }
  createDvCoDinh(dichVuCoDinh: DichVuCoDinh): Observable<any> {
    return this.http.post(dichVuUrl, dichVuCoDinh);
  }
  createDvKhac(dichVuCoDinh: DichVuCoDinh): Observable<any> {
    return this.http.post(dichVuKhacUrl, dichVuCoDinh);
  }

  updateDvKhac(dichVuCoDinh: DichVuCoDinh): Observable<any> {
    return this.http.put(dichVuKhacUrl + `/${dichVuCoDinh.id}`, dichVuCoDinh);
  }
  thanhToanHDDV(thanhToan: ThanhToanHDDV): Observable<any> {
    return this.http.put(baseUrl + `${thanhToan.id}`, thanhToan);
  }
}
