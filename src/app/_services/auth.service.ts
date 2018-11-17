import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000';
  @Output() getLoggedInUser: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  login(payload) {
    return this.http.post<any>(`${this.url}/api/auth/login`, payload)
      .pipe(map(result => {
        // login successful if there's a jwt token in the response
        if (result && result.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('access_token', result.token);
          // emit logged in user
          this.userService.getUser().subscribe(user => this.getLoggedInUser.emit(user))
        }

        return true;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

}
