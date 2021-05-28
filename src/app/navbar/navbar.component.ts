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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // property to store search query
  searchQ: any;
  // property to store the status of user login
  userLogin: any = false;
  // property to store the status of data loaded or not
  loading: any = false;
  // property to store login user email
  useremail: any;
  // admin search status
  searchAdmin: any = true;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private ngxloader: NgxUiLoaderService
  ) {
    // subscribing to router events and reading events by importing Event class
    this.router.events.subscribe((event: Event) => {
      // destructuring event object
      const e: any = { ...event };

      // condition to check router URL
      if (e.url === '/cart' || e.url === '/myorders') {
        // applying switch case for handling the navigation events.
        switch (true) {
          // Handle NavigationStart event
          case event instanceof NavigationStart: {
            // Show loader
            this.ngxloader.start();

            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            // hide loader
            this.ngxloader.stop();

            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }

  // function to handle search
  search() {
    // check if searchQ is empty or not.
    if (this.searchQ) {
      const search = this.searchQ;

      // redirecting to search result display page
      this.router.navigate(['/search'], {
        // adding search query as the queryparams q
        queryParams: { q: search },
      });
    }
    // set seatch field empty after search
    this.searchQ = '';
  }

  // whenever any changes happens
  ngDoCheck() {
    // setting user email when ever any changes happens
    this.useremail = localStorage.loginUser
      ? JSON.parse(localStorage.loginUser).email
      : null;

    // checking for the loging status
    if (localStorage.loginUser) { this.userLogin = true; }
    if (!localStorage.loginUser) {
      this.userLogin = false;
    }

    if (this.router.url === '/admin') { this.searchAdmin = false; }
    else { this.searchAdmin = true; }
  }

  // function to logout user
  logout() {
    localStorage.removeItem('loginUser');
    this.toastr.success('Logout Successfully!!');
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {}
}
