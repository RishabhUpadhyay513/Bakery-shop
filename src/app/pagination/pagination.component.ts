import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  // to store the data about page
  start: any;
  end: any;
  noOfpages: any;
  resultPerPage: any = 12;
  // To take the array of cakes
  @Input() cakesArr: any = [];

  constructor(
    public cs: CommonService,
    private admin: AdminService,
    private router: Router
  ) {}

  // method to change current page value
  openPage(page: any) {
    this.cs.currentp = page;
  }

  // funtion the genrate data for each page
  pagination() {
    // find total number of pages
    this.noOfpages = Math.ceil(this.cakesArr.length / this.resultPerPage);
    // starting index of the cake array
    this.start = (this.cs.currentp - 1) * this.resultPerPage;
    // ending index of the cake array
    this.end = this.cs.currentp * this.resultPerPage;
    // display array
    this.cs.cakeSearch = [...this.cakesArr].slice(this.start, this.end);
    return;
  }

  ngDoCheck() {
    // pagination method call whenever any changes happens
    setTimeout(() => {
      this.pagination();
    }, 10);
  }
}
