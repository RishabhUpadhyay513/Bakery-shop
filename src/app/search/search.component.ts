import { Component, OnInit } from '@angular/core';

import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery: any;
  constructor(private cs: UserListService) {}
  filter(q: any) {
    if (q === 'htl')
      this.cs.cakeSearch = this.cs.cakeSearch.sort(
        (cake1: any, cake2: any) => cake2.price - cake1.price
      );

    if (q === 'lth')
      this.cs.cakeSearch = this.cs.cakeSearch.sort(
        (cake1: any, cake2: any) => cake1.price - cake2.price
      );

    if (q === 'res') this.cs.cakeSearch = [...this.cs.cakeList];
  }
  ngOnInit(): void {}
}
