import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css'],
})
export class ForgetpassComponent implements OnInit {
  // object to store the user email id
  user: any = {};
  constructor(
    private ls: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    // check for the query params
    if (this.route.snapshot.queryParams.q) {
      this.user.email = this.route.snapshot.queryParams.q;
    }
  }

  ngOnInit(): void {}
  // method to send password to the user
  getPass() {
    // check for empty email/password field
    if (!this.user.email || this.user.email === ' ') {
      this.toastr.warning('Email field should not be empty!!');
      return;
    }
    // validate Email/password field if not empty
    if (this.ls.validateEmail(this.user.email)) {
      // hit post request to send the user password to the user email id
      this.http.post(this.ls.apiUrl + 'recoverpassword', this.user).subscribe(
        (res: any) => {
          // check whether the password send successful or not
          if (res.message === 'Password Sent to your email') {
            this.toastr.success(res.message, '');
            // redirecting user back to the login page
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
          // display the error message
          console.log(err);
          this.toastr.error(err.message);
        }
      );
    } else this.toastr.error('Invalid Email Id/Password');
  }
}
