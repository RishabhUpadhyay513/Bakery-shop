import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  // store the user data
  user: any = { price: 0 };
  // store the cart items in the array
  cartItems: any = [];

  constructor(
    private http: HttpClient,
    private cs: CommonService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // check that order details are filled or not
    if (this.cs.order.name) this.user = this.cs.order;

    // check that user clicked confirm button in order summary component or not
    if (!cs.orderconfirm) {
      this.router.navigate(['/checkout']);
    }
    // loading cart items
    this.getCartItems();
  }

  ngOnInit(): void {}

  // method to get cart items array
  getCartItems() {
    // hit post request to get the cart items
    this.http.post(this.cs.apiUrl + 'cakecart', {}).subscribe(
      (res: any) => {
        if (res.data) {
          // calculating the total price of the cart
          this.user.price = 0;
          this.user.price += res.data.reduce(
            (acc: any, item: any) => item.price * item.quantity + acc,
            0
          );
          // check  if the total price is equal to zero
          if (this.user.price <= 0) this.router.navigate(['/']);
          // add delivery charges if total price is less then minimum cart value
          if (this.user.price < this.cs.mincartvalue)
            this.user.price += this.cs.deliveryCharge;

          return (this.cartItems = res.data);
        }

        this.toastr.warning(res.message);
      },
      (err: any) => {
        // display the error
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }
  // method to validate form details
  placeOrder() {
    // check if any field is empty
    if (
      !this.user.name ||
      !this.user.name.trim() ||
      !this.user.address ||
      !this.user.address.trim() ||
      !this.user.city ||
      !this.user.city.trim() ||
      !this.user.pincode ||
      !this.user.pincode.trim() ||
      !this.user.phone ||
      !this.user.phone.trim()
    ) {
      this.toastr.warning('Input Fields should not be empty');
      return;
    }

    // validate phone number
    if (!this.cs.validatephonenumber(this.user.phone)) {
      this.toastr.warning('Please Enter the vaild phone number');
      return;
    }
    // validate pincode
    if (!this.cs.validatepincode(this.user.pincode)) {
      this.toastr.warning('Please Enter the vaild Pincode');
      return;
    }

    // store the user details
    this.cs.order = { ...this.user, cakes: this.cartItems };

    // navigate to confirmation page
    this.router.navigate(['/checkout/confirm']);
  }

  // candeactivate confirm method
  confirm(next: any) {
    // check the next route is payment or not
    if (next.url === '/checkout/confirm') {
      // confirmation from user that he/she enter filled the fields corrctly
      if (
        confirm('Please check your details. If You Already checked Click Ok.')
      ) {
        this.cs.payment = true;

        const index = this.cs.ullist.findIndex((e: any) =>
          e.className.includes('active')
        );

        this.cs.ullist[1].classList.remove('active');
        this.cs.ullist[2].classList.add('active');
        return true;
      } else return false;
    }
    return true;
  }
}
