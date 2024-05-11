import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post('/login/', data);
  }

  signup(data: any): Observable<any> {
    console.log(data);
    return this.http.post('/signup/', data);
  }

  getIncome(data: any): Observable<any> {
    return this.http.get('/income/', data);
  }

  addIncome(data: any): Observable<any> {
    return this.http.post('/income/', data);
  }

  getExpense(data: any): Observable<any> {
    return this.http.get('/expense/', data);
  }

  addExpense(data: any): Observable<any> {
    return this.http.post('/expense', data);
  }
}
