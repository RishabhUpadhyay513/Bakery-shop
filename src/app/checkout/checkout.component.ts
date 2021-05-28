import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(public cs: CommonService) {}
  ngDoCheck() {
    // check if the user entered name input field or not
    if (!this.cs.order.name) {
      // disable this payment option
      this.cs.payment = false;
    }
  }

  activate(e: any) {
    // check if payment option is disable
    if (!this.cs.payment) {
      // select the closest a tag to the target
      const el = e.target.closest('a');

      // check if the a tag is disable
      if (el.className.includes('a-disabled')) {
        return el.parentElement.classList.remove('active');
      }
    }
    // check if order form is enable
    if (this.cs.orderconfirm) {
      // select the all li tag inside the navigation menu
      const allli = e.target.closest('ul').querySelectorAll('li');

      // remove the active class from all the li tags
      allli.forEach((e: any) => {
        e.classList.remove('active');
      });
      //  add the active class the clicked li tag
      e.target.closest('li').classList.add('active');
    }
  }
  ngOnInit(): void {
    // select the all li tags and store it as a array
    this.cs.ullist = Array.from(document.querySelectorAll('li'));
  }
}
