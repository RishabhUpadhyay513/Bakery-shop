import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    public cs: CommonService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    // check if the order object exists or not
    if (!cs.order.name) {
      this.router.navigate(['/checkout']);
    }
  }

  ngOnInit(): void {}

  // method to place order
  payment() {
    // hit post request to place order
    this.http.post(environment.apiUrl + 'addcakeorder', this.cs.order).subscribe(
      (res: any) => {
        // check if order placed successful
        if (res.messageg === 'order placed') {
          this.toastr.success('Your Order Placed!!');
          this.router.navigate(['/myorders']);
          return;
        }
        this.toastr.warning(res.messageg);
      },
      (err) => {
        // display error message
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }
}
