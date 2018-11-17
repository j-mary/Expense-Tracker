import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../_common/expense.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IExpense } from '../_common/expense.model';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

  expense: IExpense;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fetchExpense(params['id']);
    })
  }

  fetchExpense(id) {
    this.expenseService.getOne(id)
      .subscribe((data: IExpense) => this.expense = data);
  }

  update({ value, valid }) {
    if (!valid) return

    this.expenseService.update(this.expense, value)
      .subscribe(expense => {
        this.alertService.success('update was successful')
        this.router.navigate(['/expenses']);
      }, err => {
        this.alertService.error('could not update expense');
      });
  }

}
