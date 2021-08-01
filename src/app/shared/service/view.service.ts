import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ViewRequest} from "../model/view/view-request";
import { ViewResponse } from '../model/view/view-response';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private http: HttpClient) { }

  getAllView(): Observable<Array<ViewResponse>> {
    return this.http.get<Array<ViewResponse>>( '/api/employee/view');
  }
  getViewById(id): Observable<ViewResponse> {
    return this.http.get<ViewResponse>( '/api/employee/view/' + id);
  }

  createView(viewRequest: ViewRequest): Observable<any> {
    return this.http.post( '/api/employee/view', viewRequest);
  }

  deleteView(id: number): Observable<any> {
    return this.http.delete( '/api/employee/view/delete/' + id, { responseType: 'text' });
  }

  updateView(viewRequest: ViewRequest): Observable<any> {
    return this.http.put('/api/employee/view', viewRequest);
  }


}
