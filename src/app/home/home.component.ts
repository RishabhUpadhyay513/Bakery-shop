import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // cake list to sort list of cakes
  cakeList: any;
  loading: any = true;

  // Storing the login user name
  name: any = localStorage.loginUser
    ? JSON.parse(localStorage.loginUser)
        .name.replace(
          JSON.parse(localStorage.loginUser).name[0],
          JSON.parse(localStorage.loginUser).name[0].toUpperCase()
        )
        .split(' ')[0]
    : '';
  constructor(public cs: CommonService, private http: HttpClient) {
    this.cs.getCakeList();
  }

  filter(q: any) {
    if (q === 'htl')
      this.cs.cakeSearch = this.cs.cakeList.sort(
        (cake1: any, cake2: any) => cake2.price - cake1.price
      );

    if (q === 'lth')
      this.cs.cakeSearch = this.cs.cakeList.sort(
        (cake1: any, cake2: any) => cake1.price - cake2.price
      );
    // this.cs.getcakes();
    if (q === 'res') this.cs.reset();

    this.cs.currentp = 1;
  }
}
