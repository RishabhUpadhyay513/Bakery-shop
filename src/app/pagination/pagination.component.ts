import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  currentp: any = 1;
  noOfpages: any;
  paginationArr: any;
  @Input() cakesArr: any = [];
  @Input() cakeList: any = [];
  @Input() adminUser: any = false;
  start: any;
  end: any;
  resultPerPage: any = 12;
  constructor(
    private cs: UserListService,
    private admin: AdminService,
    private router: Router
  ) {
    this.pagination();
  }
  showPage(page: any) {
    this.currentp = page;
  }
  pagination() {
    this.noOfpages = Math.ceil(this.cakesArr.length / this.resultPerPage);
    this.start = (this.currentp - 1) * this.resultPerPage;
    this.end = this.currentp * this.resultPerPage;
    // this.paginationArr = Array(this.noOfpages);
    // this.paginationArr = Array.from(this.paginationArr, (e, i) => i + 1);
    if (!this.adminUser) {
      this.cs.cakeSearch = [...this.cakesArr].slice(this.start, this.end);
      return;
    }
    this.admin.cakeSearch = this.cakesArr.slice(this.start, this.end);
  }

  ngDoCheck() {
    // this.pagination();
    setTimeout(() => {
      this.pagination();
    }, 10);
  }
  ngOnInit(): void {
    // this.pagination();
  }
}
