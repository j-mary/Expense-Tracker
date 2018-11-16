import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExpense } from './expense.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.url}/api/expenses`);
  }

  getOne(id): Observable<IExpense> {
    return this.http.get<IExpense>(`${this.url}/api/expenses/${id}`);
  }

  add(expense): Observable<IExpense> {
    return this.http.post<IExpense>(`${this.url}/api/expenses`, expense);
  }

  update(expense, value): Observable<IExpense> {
    return this.http.put<IExpense>(`${this.url}/api/expenses/${expense._id}`, value);
  }

  delete(id) {
    return this.http.delete(`${this.url}/api/expenses/${id}`);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
