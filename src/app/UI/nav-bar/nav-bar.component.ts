import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user;

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    auth.getLoggedInUser.subscribe(user => this.setUser(user));
  }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.userService.getUser().subscribe(user => this.setUser(user))
    }
  }

  logout() {
    this.auth.logout();
    this.alertService.success("You've been logged out")
  }

  private setUser(user) {
    this.user = user
  }

}
