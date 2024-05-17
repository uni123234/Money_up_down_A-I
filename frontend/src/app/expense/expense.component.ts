import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule, NgIf, NgIfContext } from '@angular/common';
import { DataService } from '../data.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})

export class ExpenseComponent implements OnInit {
  dataList: any[] | undefined;
  currentMonth: Date = new Date();

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getExpense().subscribe(
      (data: any[]) => {
        this.dataList = data;
      },
      (error: any) => {
        console.error('Помилка при отриманні даних', error);
      }
    );
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() - 1));
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() + 1));
  }
  

  toggleTable() {
    console.log("works")
    const element = document.getElementById("1");
    if (element) {
      element.classList.toggle('show');
    }

    // const expenseData = { "email": "a@gmail.com", "amount": 1115, "description" : "eeeeee", "category_id" : 2};
    // this.dataService.addExpense(expenseData).subscribe({
    //   next: (response) => {console.log('expense successful', response);
    //   this.router.navigate(['/']);

    //   },
    //   error: (error) => {
    //     console.log("SFDf", error)
    //     }
    //   },)


    const expenseCategoryData = { "email": "a@gmail.com", "name": "category1"};
    this.dataService.addExpenseCategory(expenseCategoryData).subscribe({
      next: (response) => {console.log('expense successful', response);
      this.router.navigate(['/']);

      },
      error: (error) => {
        console.log("SFDf", error)
        }
      },)

    };

  }
