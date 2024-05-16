import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  isAuthenticated: boolean = false;
  loginObj: LoginTemplate;
  credentialsError: string | null = null;

  constructor(private dataService: DataService, private authService: AuthService, private router: Router) {

    this.loginObj = new LoginTemplate

  }
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  login(loginForm: NgForm) {
    console.log(this.loginObj.email)
    if (loginForm.valid) {
    const loginData = { "email": this.loginObj.email, "password": this.loginObj.password };
    this.dataService.login(loginData).subscribe({
      next: (response) => {console.log('Login successful', response);
      this.router.navigate(['/']);

      },
      error: (error) => {
        if (error.status === 401 && error.error.message === 'Invalid credentials') {
          this.credentialsError = "Неправильне ім'я користувача або пароль";
        } else {
          console.error('Login failed', error)
        }
      },
    });
    console.log("sfd " + this.authService.getToken())
    }
  }

}


export class LoginTemplate {

  email: string;
  password: string;

  constructor() {
    this.email = ""
    this.password = ""
  }
}