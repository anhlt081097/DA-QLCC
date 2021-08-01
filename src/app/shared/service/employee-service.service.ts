import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EmployeeRequest} from '../model/employee/employee-request';
import {EmployeeResponse} from '../model/employee/employee-response';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getAllEmployee(): Observable<Array<EmployeeResponse>> {
    return this.http.get<Array<EmployeeResponse>>('/api/admin/employee');
  }

  getAllEmployeeLock(): Observable<Array<EmployeeResponse>> {
    return this.http.get<Array<EmployeeResponse>>('/api/admin/employee/lock');
  }

  getEmployeeById(id): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>('/api/admin/employee/' + id);
  }

  createEmployee(employeeRequest: EmployeeRequest): Observable<any> {
    return this.http.post('/api/admin/employee', employeeRequest);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete('/api/admin/employee/delete/' + id, {responseType: 'text'});
  }

  uplockEmployee(id: number): Observable<any> {
    return this.http.get('/api/admin/employee/unlock/' + id, {responseType: 'text'});
  }

  updateEmployee(employeeRequest: EmployeeRequest): Observable<any> {
    return this.http.put('/api/admin/employee', employeeRequest);
  }

  checkEmployeeWait(): Observable<Array<EmployeeResponse>> {
    return this.http.get<Array<EmployeeResponse>>('/api/admin/employee/check');
  }

}
