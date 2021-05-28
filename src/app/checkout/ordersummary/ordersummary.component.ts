import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css'],
})
export class OrdersummaryComponent implements OnInit {
  // store the delivery charges
  deliveryCharge: any = 0;
  // store the user cart items
  cartItems: any = [];
  // store the status of the item loaded or not
  loading: any = true;
  // store the value of the cart items
  totalPrice: any = 0;
  constructor(
    private toastr: ToastrService,
    private cs: CommonService,
    private http: HttpClient,
    private router: Router
  ) {
    // get the cart items
    this.getCartItems();
  }

  // method to load the cart items
  getCartItems() {
    // hit post request to fetch the cart items
    this.http.post(environment.apiUrl + 'cakecart', {}).subscribe(
      (res: any) => {
        // check if the data is loaded or not
        if (res.data) {
          // change the loading states to false after data get loaded
          this.loading = false;

          return (this.cartItems = res.data);
        }

        this.toastr.warning(res.message);
      },
      (err: any) => {
        // display error message
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }
  ngDoCheck() {
    // calculate the totalprice of the cart items
    this.totalPrice = this.cartItems.reduce(
      (acc: any, item: any) => item.price * item.quantity + acc,
      0
    );

    // check to change the delivery charge
    if (this.totalPrice > this.cs.mincartvalue) { this.deliveryCharge = 0; }
    else { this.deliveryCharge = this.cs.deliveryCharge; }

    // check for empty cart
    if (!this.loading && !this.totalPrice) {
      this.toastr.info('Your Cart is empty.');
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  // method to redirect user to the next route
  next() {
    // enable the place order component
    this.cs.orderconfirm = true;

    // find the index of current activated li tag
    const index = this.cs.ullist.findIndex((e: any) =>
      e.className.includes('active')
    );

    // remove the active class from the current activated li tag
    this.cs.ullist[index].classList.remove('active');

    // add active class to the next li tag
    this.cs.ullist[index + 1].classList.add('active');

    this.router.navigate(['/checkout/details']);
  }
}
