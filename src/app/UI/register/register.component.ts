import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }) {
    if (!valid) return this.router.navigate(['/register']);

    this.userService.register(value)
      .subscribe(data => {
        this.alertService.success('Account created, you can now login');
        this.router.navigate(['/login'])
      }, err => {
        this.alertService.error('Something went wrong');
      })
  }

}
