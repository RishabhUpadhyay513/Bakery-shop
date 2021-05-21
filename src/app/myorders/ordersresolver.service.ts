import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserListService } from '../user-list.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersresolverService implements Resolve<any> {
  constructor(private http: HttpClient, private cs: UserListService) {}
  resolve(): any {
    return this.http.post(this.cs.apiUrl + 'cakeorders', {});
  }
}
