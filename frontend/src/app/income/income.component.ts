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
  selector: 'app-income',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css',
})


export class IncomeComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal!: ElementRef;
  editObj: any = {};
  dataList: any[] | undefined;
  currentMonth: Date = new Date();
  showModal: boolean = false;


  constructor(private authService: AuthService, private dataService: DataService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dataService.getIncome().subscribe(
      (data: any[]) => {
        this.dataList = data;
        console.log(data)
      },
      (error: any) => {
        console.error('Помилка при отриманні даних', error);
      }
    );
  }

  editIncome(item: any) {
    this.editObj = { ...item };

    const modal: any = document.getElementById('editModal');
    if (modal) {
      $(modal).modal('show'); 
    }
  }

  onSubmit(signupForm: NgForm) {

    console.log('Saving changes:', this.editObj);
    const { id, amount, date, description, category_name } = this.editObj;

    const modal: any = document.getElementById('editModal');
    if (modal) {
      $(modal).modal('hide');

    const editData = {"id": id,"amount": amount,"date": date,"description": description,"category_name": category_name };

    this.dataService.putIncome(editData).subscribe(
      response => {
        console.log('Response:', response);
      },
      error => {
        console.error('Error:', error);
        if (error.status && error.statusText) {
          console.error(`HTTP Error: ${error.status} ${error.statusText}`);
        }
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error('Server-side error:', error.error);
        }
      })
    } 
    
  }

}


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
