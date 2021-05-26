import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchQ: any;
  userLogin: any = false;
  loading: any = false;
  useremail: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private ngxloader: NgxUiLoaderService
  ) {
    this.router.events.subscribe((event: Event) => {
      const e: any = { ...event };
      if (e.url === '/cart' || e.url === '/myorders')
        switch (true) {
          case event instanceof NavigationStart: {
            this.ngxloader.start();

            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.ngxloader.stop();

            break;
          }
          default: {
            break;
          }
        }
    });
  }

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
