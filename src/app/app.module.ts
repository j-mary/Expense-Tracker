import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ListExpenseComponent } from './expenses/list-expense/list-expense.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { NavBarComponent } from './UI/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'expenses', component: ListExpenseComponent },
  { path: 'expenses/edit/:id', component: EditExpenseComponent },
  { path: 'expenses/add', component: CreateExpenseComponent },
  { path: '', pathMatch: 'full', redirectTo: 'expenses' }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateExpenseComponent,
    EditExpenseComponent,
    ListExpenseComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
