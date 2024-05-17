import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
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

  constructor(private authService: AuthService, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getExpense({"amount": Number, "description": String, "date": String}).subscribe(
      (data: any[]) => {
        this.dataList = data;
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

  }
}
