import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  expenseObj: any = {};
  incomeObj: any = {};

  incomeMessage: string = '';
  expenseMessage: string = '';

  constructor(private dataService: DataService, private router: Router, private authService: AuthService) {}

  addIncome(incomeForm: NgForm) {
    if (incomeForm.valid) {
      const { amount, date, description, category_name } = this.incomeObj;
      const email = this.authService.getUser();
      this.dataService.addIncome({ email, amount, date, description, category_name }).subscribe({
        next: (response) => {
          console.log('Income added successfully', response);
          this.incomeMessage = 'Дохід добавлений!';
          setTimeout(() => this.incomeMessage = '', 3000);
          incomeForm.resetForm();
        },
        error: (error) => {
          console.log('Error adding income', error);
        }
      });
    }
  }

  addExpense(expenseForm: NgForm) {
    if (expenseForm.valid) {
      const { amount, date, description, category_name } = this.expenseObj;
      const email = this.authService.getUser();
      this.dataService.addExpense({ email, amount, date, description, category_name }).subscribe({
        next: (response) => {
          console.log('Expense added successfully', response);
          this.expenseMessage = 'Витрата добавлена!';
          setTimeout(() => this.expenseMessage = '', 3000);
          expenseForm.resetForm();
        },
        error: (error) => {
          console.log('Error adding expense', error);
        }
      });
    }
  }
}
