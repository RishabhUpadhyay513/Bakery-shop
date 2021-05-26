import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { empty, Observable } from 'rxjs';
import { UserListService } from '../user-list.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsresolverService implements Resolve<any> {
  constructor(
    private http: HttpClient,
    private cs: UserListService,
    private toastr: ToastrService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.http.post(this.cs.apiUrl + 'cakecart', {}).pipe();
  }
}
