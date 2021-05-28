import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService implements Resolve<any> {
  constructor(private http: HttpClient) {}
  resolve(): any {
    // get user orders details
    return this.http.post(environment.apiUrl + 'cakeorders', {});
  }
}
