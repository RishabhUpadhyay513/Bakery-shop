import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-pagination-admin',
  templateUrl: './pagination-admin.component.html',
  styleUrls: ['./pagination-admin.component.css'],
})
export class PaginationAdminComponent {
  // to store the data about page
  start: any;
  end: any;
  noOfpages: any;
  resultPerPage: any = 12;
  // To take the array of cakes
  @Input() cakesArr: any = [];

  constructor(public admin: AdminService, private router: Router) {}

  // method to change current page value
  openPage(page: any) {
    this.admin.currentp = page;
  }

  // funtion the genrate data for each page
  pagination() {
    // find total number of pages
    this.noOfpages = Math.ceil(this.cakesArr.length / this.resultPerPage);
    // starting index of the cake array
    this.start = (this.admin.currentp - 1) * this.resultPerPage;
    // ending index of the cake array
    this.end = this.admin.currentp * this.resultPerPage;
    // display array
    this.admin.cakeSearch = [...this.cakesArr].slice(this.start, this.end);
    return;
  }

  ngDoCheck() {
    // pagination method call whenever any changes happens
    setTimeout(() => {
      this.pagination();
    }, 10);
  }
}
