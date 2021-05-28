import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  // store the search query
  searchquery: any;
  // store the default sort status
  sort: any = 'lth';

  constructor(
    private toastr: ToastrService,
    public admin: AdminService,
    private router: Router
  ) {
    // check whether the user is admin or not
    if (
      !(
        JSON.parse(localStorage.loginUser).email === 'harshit199dubey@gmail.com'
      )
    ) {
      toastr.info('Only Admin User Can Access Admin Panel');
      router.navigate(['/']);
    }

    // method call to get cake lists
    this.admin.getCakeList();
  }

  ngOnInit(): void {}
  ngDoCheck() {}
  // method to perform search
  search() {
    // filter the cake list according the search query
    if (this.searchquery) {
      this.admin.cakeList = [...this.admin.cakes].filter((cake: any) =>
        cake.name.toLowerCase().includes(this.searchquery.toLowerCase())
      );
    } else {
      this.admin.cakeList = [...this.admin.cakes];
    }
    // Set current page to one
    this.admin.currentp = 1;
  }

  // method to sort cake list according to price
  sortcake() {
    // sort cake array from high to low price
    if (this.sort === 'htl') {
      this.admin.cakeSearch = this.admin.cakeList.sort(
        (cake1: any, cake2: any) => cake2.price - cake1.price
      );
      this.sort = 'lth';
      return;
    }
    // sort cake array from low to high  price
    if (this.sort === 'lth') {
      this.admin.cakeSearch = this.admin.cakeList.sort(
        (cake1: any, cake2: any) => cake1.price - cake2.price
      );
      this.sort = 'htl';
      return;
    }
  }
}
