import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { sliderImgs, cakeList, users } from './data';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  users: any = [];
  sliderImgs: any = sliderImgs;
  cakeList: any = [];
  cakeSearch: any = [];
  deliveryCharge: any = 45;
  userData: any = users;
  apiUrl: any = 'https://apifromashu.herokuapp.com/api/';

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.http.get(this.apiUrl + 'allcakes').subscribe(
      (res: any) => {
        if (res.data) this.cakeList = res.data;
        this.cakeSearch = [...this.cakeList];
        // console.log(res.data);
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.message, 'Error in loading Cakes', {
          positionClass: 'toast-top-full-width',
          timeOut: 10000,
        });
      }
    );
  }
  phonenumber(number: any) {
    const phoneno = /^\d{10}$/;
    if (number.match(phoneno)) return true;
    else return false;
  }
  pincode(code: any) {
    return /^(\d{4}|\d{6})$/.test(code);
  }
  getCakeDetails(id: any) {
    let cake: any = {};
    this.http.get(this.apiUrl + 'cake/' + id).subscribe(
      (res: any) => {
        // console.log(res.data);
        cake = res.data;
      },
      (req) => {}
    );
    return cake;
  }

  validateEmail(email: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
