import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
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

  constructor(private dataService: DataService, router: Router, private authService: AuthService) {}

  addIncome(signupForm: NgForm) {
    // this.dataService.addIncome(this.incomeData).subscribe(response => {
    //   console.log('Income added', response);
      // this.resetIncomeForm();
    // });
    
      const { amount, date, description, category_name } = this.incomeObj;
      const user_id = this.authService.getUser()
      this.dataService.addIncome({"user_id": user_id, "amount": amount, "date": date, "description": description, "category_name": category_name}).subscribe({
      next: (response) => {console.log('income successful', response);

      },
      error: (error) => {
        console.log("SFDf", error)
        }
      },)
  }

  addExpense(signupForm: NgForm) {
    
      const { amount, date, description, category_name } = this.expenseObj;
      const user_id = this.authService.getUser()
      this.dataService.addExpense({"user_id": user_id, "amount": amount, "date": date, "description": description, "category_name": category_name}).subscribe({
      next: (response) => {console.log('expense successful', response);

      },
      error: (error) => {
        console.log("SFDf", error)
        }
      },)
  }

  // resetIncomeForm() {
  //   this.incomeData = {
  //     user_id: 1, // Replace with dynamic user ID
  //     name: '',
  //     date: '',
  //     amount: 0,
  //     category: '',
  //     description: ''
  //   };
  // }

  // resetExpenseForm() {
  //   this.expenseData = {
  //     user_id: 1, // Replace with dynamic user ID
  //     name: '',
  //     date: '',
  //     amount: 0,
  //     category: '',
  //     description: ''
  //   };
  // }
}
