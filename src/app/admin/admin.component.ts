import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  loading: any = true;
  searchKey: any;
  constructor(
    private toastr: ToastrService,
    public admin: AdminService,
    private http: HttpClient,
    private router: Router
  ) {
    if (
      !(
        JSON.parse(localStorage.loginUser).email === 'harshit199dubey@gmail.com'
      )
    ) {
      toastr.info('Only Admin User Can Access Admin Panel');
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {}
  ngDoCheck() {
    this.loading = this.admin.cakeList.length > 0 ? false : true;
  }
}
