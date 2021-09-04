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
const chiTietHoaDonSuaChua = "/api/chi-tiet-hoa-don-sua-chua";
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
  getAllDichVuKhacByIdCanHo(idCanHo: any): Observable<DichVu[]> {
    return this.http.get<DichVu[]>(
      canHoUrl + `${idCanHo}` + "/hoa-don-sua-chua"
    );
  }
  getChiTietHoaDonDichVu(idHoaDon: any): Observable<DichVuChiTiet[]> {
    return this.http.get<DichVuChiTiet[]>(
      baseUrl + `${idHoaDon}` + "/chi-tiet-hoa-don-dich-vu"
    );
  }
  getChiTietHoaDonSuaChua(idHoaDon: any): Observable<DichVuChiTiet[]> {
    return this.http.get<DichVuChiTiet[]>(
      hoaDonSuaChuaUrl + `/${idHoaDon}` + "/chi-tiet-hoa-don-dich-vu"
    );
  }
  getAllDichVuCoDinh(): Observable<DichVuCoDinh[]> {
    return this.http.get<DichVuCoDinh[]>(dichVuUrl);
  }
  getAllDichVuKhac(): Observable<DichVu[]> {
    return this.http.get<DichVu[]>(hoaDonSuaChuaUrl);
  }
  getAllLoaiSuaChua(): Observable<DichVu[]> {
    return this.http.get<DichVu[]>(dichVuKhacUrl);
  }
  getAllLoaiSuaChuaByBoPhan(boPhan: any): Observable<DichVu[]> {
    return this.http.get<DichVu[]>("/api/bo-phan/" + boPhan + "/loai-sua-chua");
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
  thanhToanHDSC(thanhToan: ThanhToanHDDV): Observable<any> {
    return this.http.put(hoaDonSuaChuaUrl + `${thanhToan.id}`, thanhToan);
  }
  findAllHdscByDaThanhToanTrongThang(
    nam: string,
    thang: string
  ): Observable<any> {
    return this.http.get<any>(
      hoaDonSuaChuaUrl + `/da-thanh-toan/nam=${nam}&thang=${thang}`
    );
  }
  findAllHdscByChuaThanhToanTrongThang(
    nam: string,
    thang: string
  ): Observable<any> {
    return this.http.get<any>(
      hoaDonSuaChuaUrl + `/chua-thanh-toan/nam=${nam}&thang=${thang}`
    );
  }
  findAllHddvByDaThanhToanTrongThang(
    nam: string,
    thang: string
  ): Observable<any> {
    return this.http.get<any>(
      baseUrl + `da-thanh-toan/nam=${nam}&thang=${thang}`
    );
  }
  findAllHddvByChuaThanhToanTrongThang(
    nam: string,
    thang: string
  ): Observable<any> {
    return this.http.get<any>(
      baseUrl + `chua-thanh-toan/nam=${nam}&thang=${thang}`
    );
  }

  createHDSC(hoaDonSuaChua: any): Observable<any> {
    return this.http.post(hoaDonSuaChuaUrl, hoaDonSuaChua);
  }
  createHDSCCT(hoaDonSuaChua: any): Observable<any> {
    return this.http.post(chiTietHoaDonSuaChua, hoaDonSuaChua);
  }
}
