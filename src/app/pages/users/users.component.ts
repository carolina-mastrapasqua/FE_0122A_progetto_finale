import { UsersService } from '../../service/users.service';
import { User } from '../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  totElements: number = 0
  sizePages: number = 0
  users: User[] = [];
  roles: string[] = [];
  currentPage: number = 0
  isLoading: boolean = true

  constructor(private usersSrv: UsersService) {}

  getCurrentPage(currentPage: any){
    this.currentPage = currentPage
    this.getUsers(this.currentPage)
  }

  getUsers(currentPage: any) {
    this.usersSrv.getUsers(currentPage).subscribe((usersList: any) => {
      this.totElements = usersList.totalElements
      this.sizePages = usersList.size
      this.users = usersList.content;
      this.isLoading = false
    }, error => {console.log(error)
    });
  }

  ngOnInit(): void {
    this.getUsers(this.currentPage);
  }
}
