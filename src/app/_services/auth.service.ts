import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  login(payload) {
    return this.http.post<any>(`${this.url}/api/auth/login`, payload)
      .pipe(map(result => {
        // login successful if there's a jwt token in the response
        if (result && result.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('access_token', result.token);
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
