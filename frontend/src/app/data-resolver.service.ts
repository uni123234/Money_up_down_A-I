import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private authService: AuthService, private router: Router) { }

  resolve(): Observable<boolean> {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['/']);
      return of(false);  
    }
    return of(true);  
  }
}
