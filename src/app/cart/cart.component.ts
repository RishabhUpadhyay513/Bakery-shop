import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  qty: any = 1;

  deliveryCharge: any = 0;
  public cartItems: any = [];
  loading: any = true;
  totalPrice: any = 0;
  constructor(
    private toastr: ToastrService,
    private cs: CommonService,
    private http: HttpClient,
    private routes: ActivatedRoute
  ) {
    // fetch data from the route
    this.routes.data.subscribe((data) => {
      this.cartItems = data[0].data;
      this.loading = false;
      console.log(this.cartItems);
    });
    // this.getCartItems();
  }

  // method to get cart items
  getCartItems() {
    // set loading status the false
    this.loading = false;
    // hit post request to get user cart items
    this.http.post(this.cs.apiUrl + 'cakecart', {}).subscribe(
      (res: any) => {
        // check whether the item updated successful or not
        if (res.data) {
          return (this.cartItems = res.data);
        }

        this.toastr.warning(res.message);
      },
      (err: any) => {
        // display the error message
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }
  ngDoCheck() {
    // set the total price
    this.totalPrice = this.cartItems.reduce(
      (acc: any, item: any) => item.price * item.quantity + acc,
      0
    );

    // check is total price is greater then minimum cart total price or not
    if (this.totalPrice > this.cs.mincartvalue) this.deliveryCharge = 0;
    else this.deliveryCharge = this.cs.deliveryCharge;
  }

  ngOnInit(): void {}

  // method to remove item from cart
  remove(id: any) {
    // hit post request to remove item from cart
    this.http
      .post(this.cs.apiUrl + 'removecakefromcart', { cakeid: id })
      .subscribe(
        (res: any) => {
          // check whether the item removed successful or not
          if (res.message === 'Removed  item from cart') {
            this.toastr.success(res.message);
            this.loading = 'upldating';
            this.getCartItems();
            return;
          }
          this.toastr.warning(res.message);
        },
        (err: any) => {
          // display the error message
          console.log(err);
          this.toastr.error(err.message);
        }
      );
  }
}
