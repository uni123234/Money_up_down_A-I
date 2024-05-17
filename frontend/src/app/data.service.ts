import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

export interface Expense {
  id: number;
  category_name: string;
  amount: number;
  date: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  login(data: any): Observable<any> {
    return this.http.post('api/login/', data, { observe: 'response'})
    .pipe(
      map((response: HttpResponse<any>) => {
        const body = response.body;
        const token = body?.token;
        console.log("token2 " + token)
        if (token) {
          this.authService.setToken(token)
        }
        return response.body;
      })
    );
  }

  signup(data: any): Observable<any> {
    console.log(data);
    return this.http.post('api/signup/', data);
  }

  getIncome(): Observable<any> {
    return this.http.get('api/income/');
  }

  addIncome(data: any): Observable<any> {
    return this.http.post('api/income/', data);
  }

  getExpense(): Observable<any> {
    return this.http.get<any[]>('api/expense/');
  }

  addExpense(data: any): Observable<any> {
    return this.http.post('api/expense/', data);
  }

  putExpense(expense: Expense): Observable<any> {
    const url = `${'api/expense/'}${expense.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(url, expense, { headers });
  }
}
