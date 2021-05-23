import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements Resolve<any> {
  constructor(private http: HttpClient, private cs: CommonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.http.post(this.cs.apiUrl + 'cakecart', {}).pipe();
  }
}
