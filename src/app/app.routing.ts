import { Routes, RouterModule } from '@angular/router';

import { ListExpenseComponent } from './expenses/list-expense/list-expense.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { LoginComponent } from './UI/login/login.component';
import { RegisterComponent } from './UI/register/register.component';
import { ErrorComponent } from './UI/404/404.component';
import { HomeComponent } from './UI/home/home.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'expenses', component: ListExpenseComponent, canActivate: [AuthGuard] },
  { path: 'expenses/edit/:id', component: EditExpenseComponent, canActivate: [AuthGuard] },
  { path: 'expenses/add', component: CreateExpenseComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '**', component: ErrorComponent }
];

export const routing = RouterModule.forRoot(routes);