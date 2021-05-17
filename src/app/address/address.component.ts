import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  user: any = { price: 0 };
  cartItems: any = [];

  constructor(
    private http: HttpClient,
    private cs: UserListService,
    private toastr: ToastrService,
    private router: Router
  ) {
    if (!cs.orderconfirm) {
      this.router.navigate(['/checkout']);
    }
    this.getCartItems();
  }

  ngOnInit(): void {}
  getCartItems() {
    this.http.post(this.cs.apiUrl + 'cakecart', {}).subscribe(
      (res: any) => {
        if (res.data) {
          this.user.price += res.data.reduce(
            (acc: any, item: any) => item.price * item.quantity + acc,
            0
          );

          if (this.user.price <= 0) this.router.navigate(['/']);
          if (this.user.price < 500) this.user.price += this.cs.deliveryCharge;

          return (this.cartItems = res.data);
        }
        console.log(res.message);
        this.toastr.warning(res.message);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }

  placeOrder() {
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

    if (!this.cs.phonenumber(this.user.phone)) {
      this.toastr.warning('Please Enter the vaild phone number');
      return;
    }
    if (!this.cs.pincode(this.user.pincode)) {
      this.toastr.warning('Please Enter the vaild Pincode');
      return;
    }

    this.cs.order = { ...this.user, cakes: this.cartItems };
    this.cs.payment = true;
    this.router.navigate(['/checkout/payment']);
  }
}
