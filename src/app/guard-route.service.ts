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
export class GuardRouteService implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(route, state);
    if (state.url === '/login') {
      if (localStorage.loginUser) {
        this.toastr.info('You Are already loged in.');
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }
    if (localStorage.loginUser) {
      return true;
    }
    this.toastr.info('You need to Login First.');
    this.router.navigate(['login']);
    return false;
  }
}
