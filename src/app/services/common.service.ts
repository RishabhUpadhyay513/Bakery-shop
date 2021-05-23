import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  // carousel Image array
  carouselImgs: any = [
    {
      img: 'https://nepaleasyshopping.com/public/images/advertise/1598374548_cake%204.jpg',
      cakeid: '',
    },
    {
      img: 'https://i1.wp.com/www.frugalfeeds.com.au/wp-content/uploads/2016/06/Lindt-Lava-Cake.png',
      cakeid: 1621337480751,
    },
    {
      img: 'https://www.frugalfeeds.nz/wp-content/uploads/2018/09/Burger-King-Molten-Lava-Cake.png',
      cakeid: 1621761236684,
    },
  ];

  // Store api url
  apiUrl: any = 'https://apifromashu.herokuapp.com/api/';

  //store Data loading status
  loading: any = true;
  // To store the array of cakes
  cakeList: any = [];
  // to store the array of the search result
  cakeSearch: any = [];
  // to store the cake data.
  cakes: any = [];
  // to store the current page number
  currentp: any = 1;
  // set default deliveryCharge
  deliveryCharge: any = 45;
  // minmum cart value for free delivery
  mincartvalue: any = 500;
  // to store the user details for place order
  order: any = {};
  // store the status of the payment window is open or not
  payment: any = false;
  // store the status of the order form
  orderconfirm: any = false;
  // store the navigation side bar menu
  ullist: any = [];
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  // method to get the cake data
  getCakeList() {
    // api hit the get cakes data
    this.http.get(this.apiUrl + 'allcakes').subscribe(
      // handle response
      (res: any) => {
        // to hide welcome loader
        this.loading = false;
        // check if data res data is there or not
        if (res.data) {
          // storing res data to the variable
          this.cakeList = res.data;
          this.cakeSearch = [...this.cakeList];
          this.cakes = [...this.cakeList];
        }
      },
      // handle error
      (err) => {
        // show error message
        console.log(err);
        this.toastr.error(err.message, 'Error in loading Cakes', {
          positionClass: 'toast-top-full-width',
          timeOut: 10000,
        });
      }
    );
  }
  // method to clear the sorting
  reset() {
    this.cakeList = [...this.cakes];
  }
  // method to validate email id
  validateEmail(email: any) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  // method to validate login session
  validatelogin() {
    // hit get request to validate login token
    this.http.get(this.apiUrl + 'getuserdetails').subscribe(
      (res: any) => {
        if (res.ok === false) localStorage.removeItem('loginUser');
      },
      (err: any) => {
        if (err.ok === false) localStorage.removeItem('loginUser');
      }
    );
  }

  // validate 10 digit phone number
  validatephonenumber(number: any) {
    const phoneno = /^\d{10}$/;
    if (number.match(phoneno)) return true;
    else return false;
  }
  // validate pincode
  validatepincode(code: any) {
    return /^(\d{4}|\d{6})$/.test(code);
  }
}
