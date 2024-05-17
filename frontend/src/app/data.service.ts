import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

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

  getIncome(data: any): Observable<any> {
    return this.http.get('api/income/', data);
  }

  addIncome(data: any): Observable<any> {
    return this.http.post('api/income/', data);
  }

  getExpense(data: any): Observable<any> {
    return this.http.get<any[]>('api/expense/', data);
  }

  addExpense(data: any): Observable<any> {
    return this.http.post('api/expense/', data);
  }
}
