import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/expenses';
  }

  login({ value, valid }) {
    if (!valid) return;

    this.authService.login(value)
      .pipe(first())
      .subscribe(result => {
        this.router.navigate([this.returnUrl]);
        this.snackBar.open("You're now loggedin");
      }, error => {
        this.snackBar.open("Invalid email or password");
      });
  }
}
