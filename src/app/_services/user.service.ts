import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  register(user): Observable<any> {
    return this.http.post<any>(`${this.url}/api/users/register`, user);
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.url}/api/users/profile`);
  }

}
