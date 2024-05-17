import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf, NgIfContext } from '@angular/common';
import { DataService } from '../data.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})

export class ExpenseComponent implements OnInit {
  dataList: any[] | undefined;

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getExpense().subscribe(
      (data: any[]) => {
        this.dataList = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Помилка при отриманні даних', error);
      }
    );
  }
  

  toggleTable() {
    console.log("works")
    const element = document.getElementById("1");
    if (element) {
      element.classList.toggle('show');
    }

    const expenseData = { "user_id": 1, "amount": 15, "description" : "sfdsfdsdf", "category_id" : 1};
    this.dataService.addExpense(expenseData).subscribe({
      next: (response) => {console.log('expense successful', response);
      this.router.navigate(['/']);

      },
      error: (error) => {
        console.log("SFDf", error)
        }
      },)
    };

  }
