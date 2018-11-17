import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../_common/expense.service';
import { IExpense } from '../_common/expense.model';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';

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
    private alertService: AlertService
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
        this.alertService.success('delete was successful');
        this.fetchExpense();
      }, err => {
        this.alertService.error('could not delete expense');
      });
  }

  getVat(value) {
    return value / 100 * 20;
  }

}
