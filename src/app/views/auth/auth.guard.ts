import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserLogin } from './userlogin.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    ) { }
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser: any = JSON.parse(this.authService.authenticatedUser) as UserLogin;
    if (currentUser) {
     return true
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
