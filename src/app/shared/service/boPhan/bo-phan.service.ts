import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
const baseUrl = "/api/bo-phan/";
const nhanVienUrl = "/api/nhan-vien/";
@Injectable({
  providedIn: "root",
})
export class BoPhanService {
  constructor(private http: HttpClient) {}
  getAllBoPhan(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }
  getBoPhanById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + id);
  }
  getLoaiSuaCHuaByBoPhanById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + id + "/loai-sua-chua");
  }
  getAllNhanVienByIdBoPhan(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + `${id}/nhan-vien`);
  }
  createBoPhan(boPhan: any): Observable<any> {
    return this.http.post<any>(baseUrl, boPhan);
  }
  editBoPhan(boPhan: any): Observable<any> {
    return this.http.put<any>(baseUrl + boPhan.id, boPhan);
  }
  deleteBoPhan(boPhan: any): Observable<any> {
    return this.http.delete<any>(baseUrl + boPhan.id);
  }
  // nhân viên
  createNhanVien(nhanVien: any): Observable<any> {
    return this.http.post<any>(nhanVienUrl, nhanVien);
  }
  editNhanVien(nhanVien: any): Observable<any> {
    return this.http.put<any>(nhanVienUrl + nhanVien.id, nhanVien);
  }
  deleteNhanVien(nhanVien: any): Observable<any> {
    return this.http.delete<any>(nhanVienUrl + nhanVien.id);
  }
}
