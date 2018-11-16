import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../_common/expense.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

  constructor(
    private router: Router,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }) {
    if (!valid) return this.router.navigate(['expenses/add']);
    // cast value to number
    value.value = +value.value;

    this.expenseService.add(value)
      .subscribe(expense => {
        this.snackBar.open('expense added successfully');
        this.router.navigate(['expenses'])
      });
  }
}
