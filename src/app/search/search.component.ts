import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { PaginationComponent } from '../pagination/pagination.component';

import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() cakeArr: any = [];
  @Input() adminUser: any = false;
  searchQuery: any;
  constructor(private cs: UserListService, private admin: AdminService) {}
  filter(q: any) {
    if (!this.adminUser) {
      if (q === 'htl')
        this.cs.cakeSearch = this.cakeArr.sort(
          (cake1: any, cake2: any) => cake2.price - cake1.price
        );

      if (q === 'lth')
        this.cs.cakeSearch = this.cakeArr.sort(
          (cake1: any, cake2: any) => cake1.price - cake2.price
        );
      // this.cs.getcakes();
      if (q === 'res') this.cs.getCakeList();
    } else {
      if (q === 'htl')
        this.admin.cakeSearch = this.cakeArr.sort(
          (cake1: any, cake2: any) => cake2.price - cake1.price
        );

      if (q === 'lth')
        this.admin.cakeSearch = this.cakeArr.sort(
          (cake1: any, cake2: any) => cake1.price - cake2.price
        );

      if (q === 'res') this.admin.getCakeList();
    }
  }
  ngOnInit(): void {}
}
