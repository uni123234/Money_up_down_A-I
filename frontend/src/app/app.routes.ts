import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncomeComponent } from './income/income.component';
import { LoginComponent } from './login/login.component';
import { ExpenseComponent } from './expense/expense.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: 'api', component: HomeComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
