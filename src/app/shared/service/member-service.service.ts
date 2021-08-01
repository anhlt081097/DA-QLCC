import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberRequest } from '../model/member/member-request';
import { MemberResponse } from '../model/member/member-response';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAllMember(): Observable<Array<MemberResponse>> {
    return this.http.get<Array<MemberResponse>>( '/api/employee/member');
  }

  getAllMemberLock(): Observable<Array<MemberResponse>> {
    return this.http.get<Array<MemberResponse>>( '/api/employee/member/lock');
  }

  getMemberById(id): Observable<MemberResponse> {
    return this.http.get<MemberResponse>('/api/employee/member/'+ id);
  }

  createMember(memberRequest: MemberRequest): Observable<any> {
    return this.http.post( '/api/employee/member', memberRequest);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete( '/api/employee/member/delete/'+ id,{ responseType: 'text' });
  }

  uplockMember(id: number): Observable<any> {
    return this.http.get( '/api/employee/member/unlock/'+ id,{ responseType: 'text' });
  }

  updateMember(memberRequest: MemberRequest): Observable<any> {
    return this.http.put('/api/employee/member', memberRequest);
  }

}
