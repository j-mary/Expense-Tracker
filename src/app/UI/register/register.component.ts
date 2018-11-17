import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }) {
    if (!valid) return this.router.navigate(['/register']);

    this.userService.register(value)
      .subscribe(data => {
        this.snackBar.open('successfull, you can now login');
        this.router.navigate(['/login'])
      })
  }

}
