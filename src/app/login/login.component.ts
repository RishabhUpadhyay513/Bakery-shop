import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(
    private ls: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    // check for query params
    if (this.route.snapshot.queryParams.q) {
      this.user.email = this.route.snapshot.queryParams.q;
    }
  }

  ngOnInit(): void {}
  login() {
    // check for empty email field
    if (!this.user.email || !this.user.email.trim()) {
      this.toastr.error('Email field should not be empty ', 'Error', {
        timeOut: 1000,
      });
      return;
    }

    // check for empty password field
    if (!this.user.password || !this.user.password.trim()) {
      this.toastr.error('Password field should not be empty ', 'Error', {
        timeOut: 1000,
      });
      return;
    }

    // validate Email field if not empty
    if (this.ls.validateEmail(this.user.email)) {
      // hit post request to login user
      this.http.post(environment.apiUrl + 'login', this.user).subscribe(
        (res: any) => {
          // check if login is successful or not
          if (res.token) {
            // storing login user data to localstorage
            localStorage.setItem('loginUser', JSON.stringify(res));
            this.toastr.success('Login Successfully!!');
            // navigate user to home page
            this.router.navigate(['/']);
          } else {
            localStorage.removeItem('loginUser');
            this.toastr.warning(res.message);
          }
        },
        (err) => {
          // display the error message
          this.toastr.error(err.message);
        }
      );
    } else { this.toastr.error('Invalid Email Id'); }
  }
}
