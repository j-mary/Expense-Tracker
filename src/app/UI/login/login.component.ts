import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';

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
    private alertService: AlertService
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
        this.alertService.success("You're now loggedin");
      }, error => {
        this.alertService.error("Invalid email or password");
      });
  }
}
