import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/models/user-login';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from "../../service/toaster.service";
import { Toaster } from "../../models/toaster.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  loginError = false;

  constructor(private authSrv: AuthService, private router: Router, private toasterService: ToasterService) { }

  login() {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginError = false;
      this.authSrv.login(this.loginForm.value).subscribe((user: UserLogin) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.authSrv.isLoggedIn.next(true)
        this.toasterService.generateToaster(new Toaster('success', 'Benvenuto', user.username + "!"));
        this.router.navigate(['/users']);
      }, (error) => {
        this.loginError = true;
      })
  }

}
