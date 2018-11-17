import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.snackBar.open("You've been logged out");
  }

}
