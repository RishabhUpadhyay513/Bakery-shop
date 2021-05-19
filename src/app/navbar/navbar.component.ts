import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchQ: any;
  userLogin: any = false;
  useremail: any;
  constructor(private router: Router, private toastr: ToastrService) {}

  search() {
    if (this.searchQ)
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQ },
      });
  }
  ngDoCheck() {
    this.useremail = localStorage.loginUser
      ? JSON.parse(localStorage.loginUser).email
      : null;
    if (localStorage.loginUser) this.userLogin = true;
    if (!localStorage.loginUser) {
      this.userLogin = false;
    }
  }
  logout() {
    localStorage.removeItem('loginUser');
    this.toastr.success('Logout Successfully!!');
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {}
}
