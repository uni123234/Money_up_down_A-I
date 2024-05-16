import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf, NgIfContext } from '@angular/common';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})

export class ExpenseComponent {

  constructor(private authService: AuthService) {}

  toggleTable() {
    console.log("works")
    const element = document.getElementById("1");
    if (element) {
      element.classList.toggle('show');
    }

  }
}
