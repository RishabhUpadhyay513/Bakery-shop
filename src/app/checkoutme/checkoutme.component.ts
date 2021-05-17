import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-checkoutme',
  templateUrl: './checkoutme.component.html',
  styleUrls: ['./checkoutme.component.css'],
})
export class CheckoutmeComponent implements OnInit {
  constructor(public cs: UserListService) {}
  ngDoCheck() {
    if (!this.cs.order.name) {
      this.cs.payment = false;
    }
  }

  ngOnInit(): void {}
}
