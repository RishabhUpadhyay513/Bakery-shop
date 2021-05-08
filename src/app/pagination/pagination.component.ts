import { Component, Input, OnInit } from '@angular/core';
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
  start: any;
  end: any;
  resultPerPage: any = 12;
  constructor(private cs: UserListService) {}
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

    this.cs.cakeSearch = this.cakesArr.slice(this.start, this.end);
  }

  ngOnInit(): void {
    this.pagination();
  }
}
