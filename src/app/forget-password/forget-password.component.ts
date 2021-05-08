import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
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
  getPass() {
    // check for empty email/password field
    if (!this.user.email || this.user.email === ' ') {
      this.toastr.warning('Email field should not be empty!!');
      return;
    }
    // validate Email/password field if not empty
    if (this.ls.validateEmail(this.user.email)) {
      const apiUrl = this.cs.apiUrl + 'recoverpassword';
      this.http.post(apiUrl, this.user).subscribe(
        (res: any) => {
          console.log(res);

          if (res.message === 'Password Sent to your email') {
            this.toastr.success(res.message, '');
            setTimeout(() => {
              this.toastr.info('Redirecting to login page..', '', {
                progressBar: true,
              });
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
            }, 1000);
            return;
          } else {
            this.toastr.warning(res.message);
          } // this.ls.loginUser = res.token ? res : null;
        },
        (err) => {
          console.log(err);
        }
      );
    } else this.toastr.error('Invalid Email Id/Password');
  }
}
