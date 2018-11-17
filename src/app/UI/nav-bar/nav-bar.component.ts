import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.snackBar.open("You've been logged out")
  }

}
