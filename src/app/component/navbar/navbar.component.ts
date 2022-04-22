import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;

  constructor(private authSrv: AuthService) {
    this.authSrv.isLoggedIn.subscribe((value: boolean) => {
      console.log(value);
      this.isLoggedIn = value;
    })
  }

  logout(){
    this.authSrv.logout()
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.authSrv.getToken();
  }

}
