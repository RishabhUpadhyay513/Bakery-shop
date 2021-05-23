import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    // check for empty email/password field
    if (
      !this.user.email ||
      !this.user.password ||
      this.user.email === ' ' ||
      this.user.password === ' '
    ) {
      this.toastr.error('Email/Password fields should not be empty ', 'Error', {
        timeOut: 1000,
        enableHtml: true,
      });
      return;
    }

    // validate Email/password field if not empty
    if (this.ls.validateEmail(this.user.email)) {
      // hit post request to login user
      this.http.post(this.ls.apiUrl + 'login', this.user).subscribe(
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
    } else this.toastr.error('Invalid Email Id/Password');
  }
}
