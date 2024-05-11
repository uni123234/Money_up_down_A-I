import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {}

export class SignUp {
  name: string;
  email: string;
  password: string;

  constructor() {
    (this.name = ''), (this.email = ''), (this.password = '');
  }
}
