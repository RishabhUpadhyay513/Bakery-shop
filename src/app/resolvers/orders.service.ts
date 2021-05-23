import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService implements Resolve<any> {
  constructor(private http: HttpClient, private cs: CommonService) {}
  resolve(): any {
    return this.http.post(this.cs.apiUrl + 'cakeorders', {});
  }
}
