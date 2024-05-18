import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncomeComponent } from './income/income.component';
import { LoginComponent } from './login/login.component';
import { ExpenseComponent } from './expense/expense.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard, LoginGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'expense', component: ExpenseComponent},
  { path: 'income', component: IncomeComponent},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard]},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
