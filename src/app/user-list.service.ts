import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { sliderImgs, cakeList, users } from './data';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  users: any = [];
  paginationArr: any = [];
  sliderImgs: any = sliderImgs;
  cakeList: any = [];
  cakeSearch: any = [];
  deliveryCharge: any = 45;
  orderconfirm: any = false;
  order: any = {};
  loading: any = true;
  payment: any = false;
  userData: any = users;
  ullist: any = [];
  apiUrl: any = 'https://apifromashu.herokuapp.com/api/';

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.validatelogin();
  }

  validatelogin() {
    this.http.get(this.apiUrl + 'getuserdetails').subscribe(
      (res: any) => {
        if (res.ok === false) localStorage.removeItem('loginUser');
      },
      (err: any) => {
        if (err.ok === false) localStorage.removeItem('loginUser');
      }
    );
  }
  getcakes() {
    this.cakeSearch = [...this.cakeList];
  }
  reset() {
    this.cakeList = [...this.paginationArr];
  }
  getCakeList() {
    // this.loading = true;
    this.http.get(this.apiUrl + 'allcakes').subscribe(
      (res: any) => {
        this.loading = false;
        if (res.data) this.cakeList = res.data;
        this.cakeSearch = [...this.cakeList];
        this.paginationArr = [...this.cakeList];
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
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateCakeDetails(cake: any) {
    if (!cake.name || !cake.name.trim()) {
      this.toastr.warning('Cake name should not be empty');
      return false;
    }
    if (!+cake.price || cake.price < 1) {
      this.toastr.warning('Price should be in rupees & greater than ₹1');
      return false;
    }
    if (!+cake.weight) {
      this.toastr.warning(
        'Weight should be in Kg & greater than or equal to 1'
      );
      return false;
    }
    if (!cake.type || !cake.type.trim()) {
      this.toastr.warning('Type field should not be empty');
      return false;
    }
    if (!cake.flavour || !cake.flavour.trim()) {
      this.toastr.warning('Flavour field should not be empty');
      return false;
    }

    return true;
  }
}
