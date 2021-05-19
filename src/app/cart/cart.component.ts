import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';
import { T } from '../confirmation-gaurd.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
// import {bootbox} from 'bootbox';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements T {
  qty: any = 1;

  deliveryCharge: any = 0;
  cartItems: any = [];
  loading: any = true;
  totalPrice: any = 0;
  constructor(
    private toastr: ToastrService,
    private cs: UserListService,
    private http: HttpClient,
    private confirmationDialogService: ConfirmationDialogService
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
  confirm() {
    // console.log(this.openConfirmationDialog());
    // bootbox.alert('Hello world!', function () {
    //   console.log('Alert Callback');
    // });
    return true;
  }

  public openConfirmationDialog() {
    return this.confirmationDialogService
      .confirm('Please confirm..', 'Do you really want to checkOut?')
      .then((confirmed) => confirmed)
      .catch(() =>
        console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
  }
}
