import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserViewModel} from '../login/login.component';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) { }

  getAuthorization(user: UserViewModel): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', user, {observe: 'response'});
  }

  saveUser(user: UserViewModel): Observable<any> {
    return this.http.post('http://localhost:8080/users/save', user);
  }

  logoutUser() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }
}
