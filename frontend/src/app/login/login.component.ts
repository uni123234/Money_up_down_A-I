import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  isSignDivVisiable: boolean = true

  loginObj: LoginTemplate

  constructor() {

    this.loginObj = new LoginTemplate

  }

  login(): void {

    console.log("Login wroks")

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