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
    ? JSON.parse(localStorage.loginUser).name.replace(
        JSON.parse(localStorage.loginUser).name[0],
        JSON.parse(localStorage.loginUser).name[0].toUpperCase()
      )
    : '';
  constructor(public cs: UserListService, private http: HttpClient) {}

  ngDoCheck() {}
  ngOnInit(): void {}
}
