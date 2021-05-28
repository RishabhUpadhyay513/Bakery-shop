import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
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
    });
  }

  ngDoCheck() {
    // set the total price
    this.totalPrice = this.cartItems.reduce(
      (acc: any, item: any) => item.price * item.quantity + acc,
      0
    );

    // check is total price is greater then minimum cart total price or not
    if (this.totalPrice > this.cs.mincartvalue) { this.deliveryCharge = 0; }
    else { this.deliveryCharge = this.cs.deliveryCharge; }
  }

  ngOnInit(): void {}

  // method to remove item from cart
  remove(id: any) {
    // updating the cart items
    this.loading = 'upldating';

    // hit post request to remove item from cart
    this.http
      .post(environment.apiUrl + 'removecakefromcart', { cakeid: id })
      .subscribe(
        (res: any) => {
          // check whether the item removed successful or not
          if (res.message === 'Removed  item from cart') {
            // find the index of the removed cake item
            const index = this.cartItems.findIndex(
              (cake: any) => cake.cakeid === id
            );
            // show success message
            this.toastr.success(
              `Removed ${this.cartItems[index].name} from cart.`
            );

            // removing cart item for cart items array
            this.cartItems.splice(index, 1);
            // data is loading
            this.loading = false;
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
