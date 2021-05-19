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
  constructor(public cs: UserListService, private http: HttpClient) {}

  ngDoCheck() {}
  ngOnInit(): void {}
}
