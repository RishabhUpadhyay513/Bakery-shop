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

  q: any = 'lth';
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

  filter() {
    if (this.q === 'htl') {
      this.admin.cakeSearch = this.admin.cakeSearch.sort(
        (cake1: any, cake2: any) => cake2.price - cake1.price
      );
      this.q = 'lth';
      return;
    }
    if (this.q === 'lth') {
      this.admin.cakeSearch = this.admin.cakeSearch.sort(
        (cake1: any, cake2: any) => cake1.price - cake2.price
      );
      this.q = 'htl';
      return;
    }
    // if (this.q === 'res') this.admin.cakeSearch = this.admin.cakeSearch;
  }
}
