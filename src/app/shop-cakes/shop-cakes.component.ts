import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-shop-cakes',
  templateUrl: './shop-cakes.component.html',
  styleUrls: ['./shop-cakes.component.css'],
})
export class ShopCakesComponent {
  // cake list to sort list of cakes
  cakeList: any;
  loading: any = true;

  constructor(public cs: CommonService, private http: HttpClient) {
    this.cs.getCakeList();
  }

  filter(q: any) {
    if (q === 'htl') {
      this.cs.cakeSearch = this.cs.cakeList.sort(
        (cake1: any, cake2: any) => cake2.price - cake1.price
      );
    }

    if (q === 'lth') {
      this.cs.cakeSearch = this.cs.cakeList.sort(
        (cake1: any, cake2: any) => cake1.price - cake2.price
      );
    }
    // this.cs.getcakes();
    if (q === 'res') { this.cs.reset(); }

    this.cs.currentp = 1;
  }
}
