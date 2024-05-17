import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let authService: AuthService;
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { isAuthenticated: jasmine.createSpy('isAuthenticated') } },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });

    authService = TestBed.inject(AuthService);
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow the authenticated user to access app', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(true);
    expect(authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(true);
  });

  it('should redirect an unauthenticated user to the login route', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(false);
    expect(authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
