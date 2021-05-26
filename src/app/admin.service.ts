import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl: any = 'https://apifromashu.herokuapp.com/api/';
  cakeSearch: any = [];
  cakeList: any = [];
  adminPagination: any = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.getCakeList();
  }
  getCakeList() {
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
}
