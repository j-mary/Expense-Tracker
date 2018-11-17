import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListExpenseComponent } from './expenses/list-expense/list-expense.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { NavBarComponent } from './UI/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guard/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { routing } from './app.routing';
import { HomeComponent } from './UI/home/home.component';
import { LoginComponent } from './UI/login/login.component';
import { RegisterComponent } from './UI/register/register.component';
import { ErrorComponent } from './UI/404/404.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateExpenseComponent,
    EditExpenseComponent,
    ListExpenseComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
