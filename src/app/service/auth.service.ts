import { UserLogin } from '../models/user-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverAddress = 'http://epicode.online/epicodebeservice_v2';

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) {
    this.isLoggedIn.next(!!this.getToken());
  }

  login(data: { username: string; password: string }): Observable<UserLogin> {
    return this.http.post<UserLogin>(
      this.serverAddress + '/api/auth/login',
      data
    );
  }

  signUp(data: {
    username: string;
    email: string;
    password: string;
    role: string[];
  }): Observable<any> {
    return this.http.post<any>(this.serverAddress + '/api/auth/signup', data);
  }

  getToken(): string {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      return user.accessToken;
    }
    return '';
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
