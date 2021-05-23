import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  // store cart item of the order
  cartItems: any = [];

  constructor(
    private toastr: ToastrService,
    public cs: CommonService,
    private http: HttpClient,
    private router: ActivatedRoute
  ) {
    // fetch the orders data from the route
    router.data.subscribe((res: any) => {
      this.cartItems = res[0].cakeorders;
      this.getOrders();
    });
  }
  // methods to show and hide order details
  showOrderDetails(ordid: any) {
    const el = document.getElementById(ordid);
    el?.classList.toggle('hidden');
  }

  getOrders() {
    this.cartItems.forEach((e: any) => {
      const orddate = new Date(e.orderdate);
      e.orderdate = `${orddate.getDate().toString(10).padStart(2, '0')}/${(
        orddate.getMonth() + 1
      )
        .toString(10)
        .padStart(2, '0')}/${orddate.getFullYear()}`;
      e.timeS = orddate.getTime();
      let totalPrice = 0;
      e.cakes.forEach((e: any) => {
        totalPrice += e.price * e.quantity;
      });
      if (totalPrice >= 500) {
        e.freeDelivery = true;
        e.subtotal = e.price;
      } else {
        e.freeDelivery = false;
        e.subtotal = e.price - this.cs.deliveryCharge;
      }
    });
    this.cartItems.sort((a: any, b: any) => b.timeS - a.timeS);
  }
}
