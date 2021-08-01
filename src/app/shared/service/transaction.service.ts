import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfileResponse} from "../model/profile/profile.response";
import {TransactionResponse} from "../model/transaction/transaction.response";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }


  getAllTransaction(): Observable<Array<TransactionResponse>> {
    return this.http.get<Array<TransactionResponse>>( '/api/employee/transactioninfo');
  }
}
