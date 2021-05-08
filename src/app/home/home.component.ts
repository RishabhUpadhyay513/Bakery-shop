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

  constructor(public cs: UserListService, private http: HttpClient) {
    
   
  }

  ngOnInit(): void {
    
  }
}
