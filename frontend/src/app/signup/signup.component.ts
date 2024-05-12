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
    const signupData = { "email": this.signupObj.email, "password": this.signupObj.password, "fullname": this.signupObj.username};
    this.dataService.signup(signupData).subscribe({
      next: (response) => console.log('Signup successful', response),
      error: (error) => console.error('Singup failed', error)
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
