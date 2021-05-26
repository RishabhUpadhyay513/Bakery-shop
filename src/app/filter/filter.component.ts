import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor(public cs: UserListService) {}

  ngOnInit(): void {}
  filter(q: any) {
    if (q === 'htl')
      this.cs.cakeSearch = this.cs.cakeSearch.sort(
        (cake1: any, cake2: any) => cake2.price - cake1.price
      );

    if (q === 'lth')
      this.cs.cakeSearch = this.cs.cakeSearch.sort(
        (cake1: any, cake2: any) => cake1.price - cake2.price
      );

    if (q === 'res') this.cs.cakeSearch = this.cs.cakeList;
  }
}
