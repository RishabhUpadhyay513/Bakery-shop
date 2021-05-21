import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cakeList: any;
  loading: any = true;
  name: any = localStorage.loginUser
    ? JSON.parse(localStorage.loginUser)
        .name.replace(
          JSON.parse(localStorage.loginUser).name[0],
          JSON.parse(localStorage.loginUser).name[0].toUpperCase()
        )
        .split(' ')[0]
    : '';
  constructor(public cs: UserListService, private http: HttpClient) {
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
  }

  ngDoCheck() {}
  ngOnInit(): void {}
}
