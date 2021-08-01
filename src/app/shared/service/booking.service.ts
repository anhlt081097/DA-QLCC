import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookingResponse} from '../model/booking/booking-response';
import {BookingRequest} from '../model/booking/booking-request';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  getAllBookingNotCheckIn(): Observable<Array<BookingResponse>> {
    return this.http.get<Array<BookingResponse>>('/api/employee/booking');
  }

  getAllBookingCheckIn(): Observable<Array<BookingResponse>> {
    return this.http.get<Array<BookingResponse>>('/api/employee/booking/checkin');
  }

  getAllBookingCancellation(): Observable<Array<BookingResponse>> {
    return this.http.get<Array<BookingResponse>>('/api/employee/booking/cancellation');
  }

  getAllMember(): Observable<Array<BookingResponse>> {
    return this.http.get<Array<BookingResponse>>('/api/member/booking/');
  }

  getBookingById(id): Observable<BookingResponse> {
    return this.http.get<BookingResponse>('/api/employee/booking/' + id);
  }

  seachBooking(phone: string, idBook: number): Observable<any> {
    return this.http.get<any>('/api/booking/seachbooking/' + phone + '&' + idBook);
  }

  checkBookingByHouse(id): Observable<any> {
    return this.http.get<any>('/api/employee/booking/checkdate/' + id);
  }

  checkBookingByHouseAndBook(idhouse, idBook): Observable<any> {
    return this.http.get<any>('/api/employee/booking/checkdateedit/' + idhouse + '&' + idBook);
  }

  deposit(id): Observable<any> {
    return this.http.get('/api/booking/submitpaypal/' + id, {responseType: 'text'});
  }


  paypal(id): Observable<BookingResponse> {
    return this.http.get<BookingResponse>('/api/booking/paypal/' + id);
  }

  createBooking(bookingRequest: BookingRequest): Observable<any> {
    return this.http.post('/api/employee/booking', bookingRequest);
  }

  createBookingMember(bookingRequest: BookingRequest): Observable<any> {
    return this.http.post('/api/employee/booking/member', bookingRequest);
  }

  updateBooking(bookingRequest: BookingRequest): Observable<any> {
    return this.http.put('/api/employee/booking', bookingRequest);
  }

  updateBookingNotCheckIn(bookingRequest: BookingRequest): Observable<any> {
    return this.http.put('/api/employee/booking/notcheckin', bookingRequest);
  }

  addIdentityCard(bookingRequest: BookingRequest): Observable<any> {
    return this.http.put('/api/employee/booking/addidentitycard ', bookingRequest);
  }

  checkIn(id): Observable<any> {
    return this.http.get('/api/employee/booking/checkin/' + id, {responseType: 'text'});
  }

  checkOut(id): Observable<any> {
    return this.http.get('api/employee/booking/checkout/' + id, {responseType: 'text'});
  }

  processing(id): Observable<any> {
    return this.http.get('api/employee/booking/processing/' + id, {responseType: 'text'});
  }

  refunded(id): Observable<any> {
    return this.http.get('api/employee/booking/refunded/' + id, {responseType: 'text'});
  }

  cancel(id): Observable<any> {
    return this.http.get('api/employee/booking/cancel/' + id, {responseType: 'text'});
  }

}
