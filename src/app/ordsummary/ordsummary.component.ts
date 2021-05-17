import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-ordsummary',
  templateUrl: './ordsummary.component.html',
  styleUrls: ['./ordsummary.component.css'],
})
export class OrdsummaryComponent implements OnInit {
  qty: any = 1;

  deliveryCharge: any = 0;
  cartItems: any = [];
  loading: any = true;
  totalPrice: any = 0;
  constructor(
    private toastr: ToastrService,
    private cs: UserListService,
    private http: HttpClient,
    private router: Router
  ) {
    this.getCartItems();
  }

  getCartItems() {
    this.http.post(this.cs.apiUrl + 'cakecart', {}).subscribe(
      (res: any) => {
        if (res.data) {
          this.loading = false;
          return (this.cartItems = res.data);
        }
        // console.log(res.message);
        this.toastr.warning(res.message);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }
  ngDoCheck() {
    this.totalPrice = this.cartItems.reduce(
      (acc: any, item: any) => item.price * item.quantity + acc,
      0
    );

    if (this.totalPrice > 500) this.deliveryCharge = 0;
    else this.deliveryCharge = this.cs.deliveryCharge;
    if (!this.loading && !this.totalPrice) {
      this.toastr.info('Your Cart is empty.');
      this.router.navigate(['/']);
    }
  }

  qtyValidation(e: any) {
    e = e.target;
    if (e.value <= 0) e.value = 1;
  }

  ngOnInit(): void {}
  remove(id: any) {
    this.http
      .post(this.cs.apiUrl + 'removecakefromcart', { cakeid: id })
      .subscribe(
        (res: any) => {
          // console.log(res);
          if (res.message === 'Removed  item from cart') {
            this.toastr.success(res.message);
            this.loading = 'upldating';
            this.getCartItems();
            return;
          }
          this.toastr.warning(res.message);
        },
        (err: any) => {
          console.log(err);
          this.toastr.error(err.message);
        }
      );
  }
  next() {
    this.cs.orderconfirm = true;
    this.router.navigate(['/checkout/address']);
  }
}
