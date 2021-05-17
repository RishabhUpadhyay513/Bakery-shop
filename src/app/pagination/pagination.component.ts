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
  @Input() adminUser: any = false;
  start: any;
  end: any;
  resultPerPage: any = 12;
  constructor(
    private cs: UserListService,
    private admin: AdminService,
    private router: Router
  ) {}
  showPage(page: any) {
    this.currentp = page;
  }
  pagination() {
    this.noOfpages = Math.ceil(
      this.cs.paginationArr.length / this.resultPerPage
    );
    this.start = (this.currentp - 1) * this.resultPerPage;
    this.end = this.currentp * this.resultPerPage;
    this.paginationArr = Array(this.noOfpages);
    this.paginationArr = Array.from(this.paginationArr, (e, i) => i + 1);
    return this.cs.paginationArr.slice(this.start, this.end);
  }

  ngDoCheck() {
    !this.adminUser
      ? (this.cs.cakeSearch = this.pagination())
      : (this.admin.cakeSearch = this.pagination());
  }
  ngOnInit(): void {
    // this.pagination();
  }
}
