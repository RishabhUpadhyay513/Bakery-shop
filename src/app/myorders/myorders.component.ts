import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  qty: any = 1;

  deliveryCharge: any = 0;
  cartItems: any = [];
  loading: any = true;
  totalPrice: any = 0;
  constructor(
    private toastr: ToastrService,
    public cs: UserListService,
    private http: HttpClient
  ) {
    this.getCartItems();
  }
  showOrderDetails(ordid: any) {
    // console.log(ordid);
    const el = document.getElementById(ordid);
    el?.classList.toggle('hidden');
  }

  getCartItems() {
    this.http.post(this.cs.apiUrl + 'cakeorders', {}).subscribe(
      (res: any) => {
        // console.log(res);
        this.loading = false;
        if (res.cakeorders) {
          console.log(res.cakeorders);
          this.cartItems = res.cakeorders;
          this.cartItems.forEach((e: any) => {
            const orddate = new Date(e.orderdate);
            e.orderdate = `${orddate
              .getDate()
              .toString(10)
              .padStart(2, '0')}/${(orddate.getMonth() + 1)
              .toString(10)
              .padStart(2, '0')}/${orddate.getFullYear()}`;

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

          return;
        }
        // console.log(res.message);
        // this.toastr.warning(res.message);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }
  ngDoCheck() {
    this.totalPrice = this.cartItems.reduce(
      (acc: any, item: any) => item.price + acc,
      0
    );

    if (this.totalPrice > 500) this.deliveryCharge = 0;
    else this.deliveryCharge = this.cs.deliveryCharge;
  }

  qtyValidation(e: any) {
    e = e.target;
    if (e.value <= 0) e.value = 1;
  }

  ngOnInit(): void {}
}
