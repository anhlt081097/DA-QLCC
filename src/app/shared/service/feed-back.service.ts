import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FeedBackRequest} from "../model/feed-back/feed-back-request";
import {FeedBackResponse} from "../model/feed-back/feed-back-response";

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

  constructor(private http: HttpClient) {
  }

  createFeedBack(feedBackRequest: FeedBackRequest): Observable<any> {
    return this.http.post('/api/member/feedback', feedBackRequest);
  }

  getAllFeedBack(): Observable<Array<FeedBackResponse>> {
    return this.http.get<Array<FeedBackResponse>>('/api/member/feedback');
  }
}
