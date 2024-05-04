import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingupComponent } from './singup/singup.component';
import { IncomeComponent } from './income/income.component';
import { LoginComponent } from './login/login.component';
import { ExpenseComponent } from './expense/expense.component';

const routes: Routes = [
  { path: 'expense', component: ExpenseComponent},
  { path: 'income', component: IncomeComponent },
  { path: 'login',  component: LoginComponent},
  { path: 'singup', component: SingupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }