import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../_common/expense.service';
import { IExpense } from '../_common/expense.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css']
})
export class ListExpenseComponent implements OnInit {

  expenses: IExpense[] = [];

  displayedColumns = ['date', 'value', 'reason', 'vat', 'actions'];

  constructor(
    private router: Router,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchExpense();
  }

  fetchExpense() {
    this.expenseService.getAll()
      .subscribe((data: IExpense[]) => this.expenses = data);
  }

  edit(id) {
    this.router.navigate([`expenses/edit/${id}`]);
  }

  delete(id) {
    this.expenseService.delete(id)
      .subscribe(() => {
        this.snackBar.open('delete was successful')
        this.fetchExpense()
      });
  }

  getVat(value) {
    return value / 100 * 20;
  }

}
