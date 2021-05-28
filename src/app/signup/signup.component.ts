import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // object to store the user data using ngModel
  user: any = {};

  constructor(
    private ls: CommonService,
    private http: HttpClient,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  signUp() {
    // validate email id
    if (!this.ls.validateEmail(this.user.email)) {
      this.toastr.warning('PLease Enter the Correct Email Id.');
      return;
    }

    // validate all input fileds
    if (
      !this.user.name ||
      !this.user.name.trim() ||
      !this.user.password ||
      !this.user.password.trim()
    ) {
      this.toastr.warning('Please Fill the all input Fields.');
      return;
    }

    // validate name & password input field
    if (this.user.name.startsWith(' ') || this.user.password.startsWith(' ')) {
      this.toastr.warning('User name/password should not start with space.');
      return;
    }

    // hit post request to signup user
    this.http.post(environment.apiUrl + 'register', this.user).subscribe(
      (res: any) => {
        // check whether user already exists or not
        if (res.message === 'User Already Exists') {
          this.toastr.info(`${res.message}. Redirecting to Login Page.`);
        } else {
          this.toastr.success(res.message);
        }

        setTimeout(() => {
          this.toastr.info('Verification mail is sended to you mail ID.');
          this.toastr.info('Please verify your email Id to login.');
          // redirecting user to the login page
          this.route.navigate(['/login'], {
            queryParams: { q: this.user.email },
          });
        }, 2000);
      },
      (err: any) => {
        // display error message
        console.log(err);

        this.toastr.error(err.message);
      }
    );
  }
}
