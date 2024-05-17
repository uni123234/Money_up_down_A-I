import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule, NgIf, NgIfContext } from '@angular/common';
import { DataService } from '../data.service';
import { stringify } from 'querystring';
import bootstrap from '../../main.server';

declare var $: any;

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})

export class ExpenseComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal!: ElementRef;
  editObj: any = {};
  dataList: any[] | undefined;
  currentMonth: Date = new Date();
  showModal: boolean = false;


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


  editExpense(item: any) {
    // Assign the selected item to editObj to prefill the form.
    this.editObj = { ...item };

    const modal: any = document.getElementById('editModal');
    if (modal) {
      $(modal).modal('show'); // Use jQuery to show the modal
    }
  }

  onSubmit(signupForm: NgForm) {
    // Processing save changes here (e.g., save to the server or update the array)
    console.log('Saving changes:', this.editObj);

    // Hide the modal after saving changes
    const modal: any = document.getElementById('editModal');
    if (modal) {
      $(modal).modal('hide'); // Use jQuery to hide the modal
    }
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



export class EditTemplate {

  email: string;
  password: string;
  username: string;

  constructor() {
    this.email = ""
    this.password = ""
    this.username = ""
  }
}
