import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {

}

export class SignUp {
  name: string;
  email: string;
  password: string

  constructor() {
    this.name = "",
    this.email = "",
    this.password = ""
  }
}