import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  incomeData = {
    user_id: 1, // Replace with dynamic user ID
    name: '',
    date: '',
    amount: 0,
    category: '',
    description: ''
  };

  expenseData = {
    user_id: 1, // Replace with dynamic user ID
    name: '',
    date: '',
    amount: 0,
    category: '',
    description: ''
  };

  constructor(private dataService: DataService) {}

  addIncome() {
    this.dataService.addIncome(this.incomeData).subscribe(response => {
      console.log('Income added', response);
      this.resetIncomeForm();
    });
  }

  addExpense() {
    this.dataService.addExpense(this.expenseData).subscribe(response => {
      console.log('Expense added', response);
      this.resetExpenseForm();
    });
  }

  resetIncomeForm() {
    this.incomeData = {
      user_id: 1, // Replace with dynamic user ID
      name: '',
      date: '',
      amount: 0,
      category: '',
      description: ''
    };
  }

  resetExpenseForm() {
    this.expenseData = {
      user_id: 1, // Replace with dynamic user ID
      name: '',
      date: '',
      amount: 0,
      category: '',
      description: ''
    };
  }
}
