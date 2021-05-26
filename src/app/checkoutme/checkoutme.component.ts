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

  activate(e: any) {
    if (!this.cs.payment) {
      const el = e.target.closest('a');

      if (el.className.includes('a-disabled'))
        return el.parentElement.classList.remove('active');
    }
    if (this.cs.orderconfirm) {
      const allul = e.target.closest('ul').querySelectorAll('li');
      allul.forEach((e: any) => {
        e.classList.remove('active');
      });
      e.target.closest('li').classList.add('active');
    }
  }
  ngOnInit(): void {
    const ul = Array.from(document.querySelectorAll('li'));
    this.cs.ullist = ul;
  }
}
