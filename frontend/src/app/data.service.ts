import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  login(): Observable<any> {
    return this.http.get('/api/login');
  }

  signup(data: any): Observable<any> {
    return this.http.post('/api/signup', data);
  }

  getIncome(): Observable<any> {
    return this.http.get('/api/income');
  }

  getExpense(): Observable<any> {
    return this.http.get('/api/expense');
  }
}
