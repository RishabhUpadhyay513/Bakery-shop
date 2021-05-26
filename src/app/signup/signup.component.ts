import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from '../login-service.service';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: any = {};
  message: any;
  constructor(
    private ls: LoginServiceService,
    private http: HttpClient,
    private route: Router,
    private toastr: ToastrService,
    private cs: UserListService
  ) {}

  ngOnInit(): void {}
  signUp() {
    if (!this.ls.validateEmail(this.user.email)) {
      this.toastr.warning('PLease Enter the Correct Email Id.');
      return;
    }

    if (
      !this.user.name ||
      !this.user.name.trim() ||
      !this.user.password ||
      !this.user.password.trim()
    ) {
      this.toastr.warning('Please Fill the all input Fields.');
      return;
    }

    if (this.user.name.startsWith(' ') || this.user.password.startsWith(' ')) {
      this.toastr.warning('User name/password should not start with space.');
      return;
    }

    const apiUrl = this.cs.apiUrl + 'register';
    this.http.post(apiUrl, this.user).subscribe(
      (res: any) => {
        this.message = res.message;
        if (this.message === 'User Already Exists') {
          this.toastr.success(`${this.message}. Redirecting to Login Page.`);
          setTimeout(() => {
            this.route.navigate(['/login'], {
              queryParams: { q: this.user.email },
            });
          }, 2000);
        }
      },
      (err: any) => {
        console.log(err);
        this.message = err.message;
        this.toastr.error(this.message);
      }
    );
  }
}
