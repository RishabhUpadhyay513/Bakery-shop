import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // store the cake list search results
  cakeSearch: any = [];
  // store the cake list array
  cakeList: any = [];
  cakes: any = [];
  // store the current page
  currentp: any = 1;

  // loading data status
  loading: any = true;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
  // method to get cake details
  getCakeList() {
    this.loading = true;
    this.http.get(environment.apiUrl + 'allcakes').subscribe(
      (res: any) => {
        this.loading = false;
        if (res.data) {
          this.cakeList = res.data;
          this.cakeSearch = [...this.cakeList];
          this.cakes = [...this.cakeList];
          return;
        }
        this.toastr.warning(res.message);
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
  // method to vaildate cake details
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
