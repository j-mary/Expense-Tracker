import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../_common/expense.service';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

  date = new FormControl(new Date());

  constructor(
    private router: Router,
    private expenseService: ExpenseService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }) {
    if (!valid) return this.router.navigate(['expenses/add']);
    // cast value to number
    value.value = +value.value;

    this.expenseService.add(value)
      .subscribe(expense => {
        this.alertService.success('expense was added successfully');
        this.router.navigate(['expenses'])
      }, err => {
        this.alertService.error('could not create expense');
      });
  }
}
