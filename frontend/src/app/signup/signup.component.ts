import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})


export class SignupComponent {


  signupObj: SignupTemplate;

  constructor(private dataService: DataService) {

    this.signupObj = new SignupTemplate

  }

  signup() {
    console.log(this.signupObj.email)
    const loginData = { "email": this.signupObj.email, "password": this.signupObj.password };
    this.dataService.login(loginData).subscribe({
      next: (response) => console.log('Login successful', response),
      error: (error) => console.error('Login failed', error)
    });
  }
}


export class SignupTemplate {

  email: string;
  password: string;
  username: string;

  constructor() {
    this.email = ""
    this.password = ""
    this.username = ""
  }
}
