import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';

export interface T {
  confirm(): boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ConfirmationGaurdService implements CanDeactivate<T> {
  constructor() {}
  canDeactivate(
    component: T,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    if (nextState?.url === '/checkout') return component.confirm();
    return true;
  }
}
