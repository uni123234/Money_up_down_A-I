import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})


export class SignupComponent {
  signupObj: any = {}; // Або використайте ваш тип SignupTemplate, якщо ви його визначили
  emailError: string | null = null;
  successMessage: string | null = null;

  constructor(private dataService: DataService, private authService: AuthService) {}

  signup(signupForm: NgForm) {
    const { username, email, password } = this.signupObj;
    if (signupForm.valid && this.validateEmail(email)) {
      const SignupData = { email, password, fullname: username };
      this.dataService.signup(SignupData).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.authService.removeToken();
          this.emailError = null; // Clear any previous email errors
          this.successMessage = 'Реєстрація успішна! Тепер ви можете увійти в акаунт.';
        },
        error: (error) => {
          if (error.status === 409 && error.error.message === 'Email already exists') {
            this.emailError = 'Email вже зайнятий';
          } else {
            console.error('Signup failed', error);
          }
        }
      });
    } else {
      console.error('Помилка: Дані не відповідають вимогам');
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
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
