import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  serverAddress = 'http://epicode.online/epicodebeservice_v2';

  constructor(private http: HttpClient) {}

  getUsers(idPage: string) {
    return this.http.get<User[]>(this.serverAddress + '/api/users?page=' + idPage);
  }
}
