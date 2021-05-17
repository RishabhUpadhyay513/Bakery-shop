import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
})
export class PayComponent implements OnInit {
  constructor(
    public cs: UserListService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    if (!cs.order.name) {
      this.router.navigate(['/checkout']);
    }
    console.log(cs.order);
  }

  ngOnInit(): void {}

  payment() {
    this.http.post(this.cs.apiUrl + 'addcakeorder', this.cs.order).subscribe(
      (res: any) => {
        console.log(res);
        if (res.messageg === 'order placed') {
          this.toastr.success('Your Order Placed!!');
          this.router.navigate(['/myorders']);
          return;
        }
        this.toastr.warning(res.messageg);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
