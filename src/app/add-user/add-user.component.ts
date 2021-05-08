import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list.service';
import { LoginServiceService } from '../login-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  user: any = {};
  constructor(
    private userList: UserListService,
    private ls: LoginServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  addUser() {
    if (this.ls.validateEmail(this.user.email)) {
      this.userList.users.push(this.user);
      this.user = {};
    } else this.toastr.error('Please Enter a Valid Email ID ');
  }
}
