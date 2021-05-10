import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private cs: UserListService, private admin: AdminService) {}
  showPage(page: any) {
    this.currentp = page;
    this.pagination();
    console.log(this.currentp);
  }
  pagination() {
    this.noOfpages = Math.ceil(this.cakesArr.length / this.resultPerPage);
    this.start = (this.currentp - 1) * this.resultPerPage;
    this.end = this.currentp * this.resultPerPage;
    this.paginationArr = Array(this.noOfpages);
    this.paginationArr = Array.from(this.paginationArr, (e, i) => i + 1);
    const resArr = this.cakesArr.slice(this.start, this.end);

    !this.adminUser
      ? (this.cs.cakeSearch = resArr)
      : (this.admin.cakeSearch = resArr);
  }

  ngDoCheck() {
    this.pagination();
  }
  ngOnInit(): void {
    // this.pagination();
  }
}
