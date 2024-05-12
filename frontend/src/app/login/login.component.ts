import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  isSignDivVisiable: boolean = true

  loginObj: LoginTemplate;

  constructor(private dataService: DataService) {

    this.loginObj = new LoginTemplate

  }

  login() {
    console.log(this.loginObj.email)
    const loginData = { "email": this.loginObj.email, "password": this.loginObj.password };
    this.dataService.login(loginData).subscribe({
      next: (response) => console.log('Login successful', response),
      error: (error) => console.error('Login failed', error)
    });
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