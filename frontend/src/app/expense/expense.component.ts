import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule, NgIf, NgIfContext } from '@angular/common';
import { DataService } from '../data.service';
import { stringify } from 'querystring';
import bootstrap from '../../main.server';

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

  editDate: string | undefined;
  editAmount: number | undefined;
  editCategory: string | undefined;
  editDescription: string | undefined;



  constructor(private authService: AuthService, private dataService: DataService, private router: Router, private fb: FormBuilder) {}

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
  }


  editExpense(item: any): void {
    this.editDate = item.date;
    this.editAmount = item.amount;
    this.editCategory = item.category;
    this.editDescription = item.description;
    const modal: any = document.getElementById('editModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    // Обробка збереження змін
    const modal: any = document.getElementById('editModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


    // const expenseData = { "email": "a@gmail.com", "amount": 112315, "description" : "FSDDFSF", "category_id" : 2};
    // this.dataService.addExpense(expenseData).subscribe({
    //   next: (response) => {console.log('expense successful', response);
    //   this.router.navigate(['/']);

    //   },
    //   error: (error) => {
    //     console.log("SFDf", error)
    //     }
    //   },)


    // const expenseCategoryData = { "email": "a@gmail.com", "name": "category1"};
    // this.dataService.addExpenseCategory(expenseCategoryData).subscribe({
    //   next: (response) => {console.log('expense successful', response);
    //   this.router.navigate(['/']);

    //   },
    //   error: (error) => {
    //     console.log("SFDf", error)
    //     }
    //   },)

    };

