import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from '../login-service.service';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(
    private ls: LoginServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private cs: UserListService
  ) {
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
      const apiUrl = this.cs.apiUrl + 'login';
      this.http.post(apiUrl, this.user).subscribe(
        (res: any) => {
          if (res.token) {
            localStorage.setItem('loginUser', JSON.stringify(res));
            this.toastr.success('Login Successfully!!');
            this.router.navigate(['/']);
          } else {
            localStorage.removeItem('loginUser');
            this.toastr.warning(res.message);
          }
        },
        (err) => {
          this.toastr.error(err.message);
        }
      );
    } else this.toastr.error('Invalid Email Id/Password');
  }
}
