import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post('api/login/', data);
  }

  signup(data: any): Observable<any> {
    console.log(data);
    return this.http.post('api/signup/', data);
  }

  getIncome(data: any): Observable<any> {
    return this.http.get('api/income/', data);
  }

  addIncome(data: any): Observable<any> {
    return this.http.post('api/income/', data);
  }

  getExpense(data: any): Observable<any> {
    return this.http.get('api/expense/', data);
  }

  addExpense(data: any): Observable<any> {
    return this.http.post('api/expense/', data);
  }
}
