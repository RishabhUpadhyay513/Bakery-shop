import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CanactivateService implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // check for the current url is for login, signup or forgetpassword or not
    if (
      state.url === '/login' ||
      state.url === '/signup' ||
      state.url === '/forgetPassword'
    ) {
      // check if user is login
      if (localStorage.loginUser) {
        this.toastr.info('You Are already loged in.');
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    // check if user is not login
    if (!localStorage.loginUser) {
      this.toastr.info('You need to Login First.');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
