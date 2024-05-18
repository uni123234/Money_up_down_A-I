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

export interface Income {
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
          const email: string = data.email;
          this.authService.setUser(email)
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
    return this.http.get<any[]>('api/income/');
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
  private apiUrl = 'http://localhost:5000'
  
  putExpense(expense: Expense): Observable<any> {
    const url = `${this.apiUrl}/expense/${expense.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put<any>(url, expense, { headers });
  }

  putIncome(income: Income): Observable<any> {
    const url = `${this.apiUrl}/income/${income.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put<any>(url, income, { headers });
  }
}
