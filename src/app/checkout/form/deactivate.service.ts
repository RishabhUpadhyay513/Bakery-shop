import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';

export interface T {
  confirm(nextState: any): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DeactivateService implements CanDeactivate<T> {
  constructor() {}
  canDeactivate(
    component: T,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    if (nextState?.url.includes('/checkout')) {
      return component.confirm(nextState);
    }
    return true;
  }
}
