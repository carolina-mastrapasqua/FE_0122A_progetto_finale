import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersGuard implements CanActivate {
  constructor(private authSrv: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authSrv.getToken()) {
      this.router.navigate(['/login']);
      alert('devi essere autenticato per visualizzare il contenuto richiesto');
      return false;
    }

    return true;
  }
}
