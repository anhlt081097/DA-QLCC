import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const baseUrl = "/api/thong-bao/";
const thongBaoRiengUrl = "/api/thong-bao-rieng/";
@Injectable({
  providedIn: "root",
})
export class ThongBaoService {
  constructor(private http: HttpClient) {}

  // chung
  getAllThongBao(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }
  createThongBao(thongBao: any): Observable<any> {
    return this.http.post<any>(baseUrl, thongBao);
  }
  updateThongBao(thongBao: any): Observable<any> {
    return this.http.put<any>(baseUrl + thongBao.id, thongBao);
  }
  deleteThongBao(thongBao: any): Observable<any> {
    return this.http.delete<any>(baseUrl + thongBao);
  }
  // riêng
  getAllThongBaoRiengByCanHo(id: string): Observable<any> {
    return this.http.get<any>("/api/can-ho/" + id + "/thong-bao-rieng");
  }
  getAllThongBaoRieng(): Observable<any> {
    return this.http.get<any>(thongBaoRiengUrl);
  }
  createThongBaoRieng(thongBao: any): Observable<any> {
    return this.http.post<any>(thongBaoRiengUrl, thongBao);
  }
  updateThongBaoRieng(thongBao: any): Observable<any> {
    return this.http.put<any>(thongBaoRiengUrl + thongBao.id, thongBao);
  }
  deleteThongBaoRieng(thongBao: any): Observable<any> {
    return this.http.delete<any>(thongBaoRiengUrl + thongBao);
  }
}
