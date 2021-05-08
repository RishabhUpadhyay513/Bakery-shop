import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  user: any = [];
  constructor(private users: UserListService) {
    this.user = this.users.users;
  }

  ngOnInit(): void {}

  deleteUser(index: any) {
    this.users.users.splice(index, 1);
  }
}
