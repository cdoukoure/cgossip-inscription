import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthSandbox } from '@app/auth/auth.sandbox';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sandBox: AuthSandbox
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    const token = localStorage.getItem("jwtoken"); 
    // console.log(token);
    if (token && this.sandBox.loggedUser$) return true;

    // Navigate to the login page with extras
    // console.log("canDeactivate false");
    this.router.navigate(['/login']);
    return false;
  }

}
