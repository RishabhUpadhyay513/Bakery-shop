import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-cake-details',
  templateUrl: './cake-details.component.html',
  styleUrls: ['./cake-details.component.css'],
})
export class CakeDetailsComponent {
  // object to store the details of the cake
  cake: any = {};
  // to store the status of whether the cake details loaded or not
  dataloaded: any = false;

  constructor(
    private route: ActivatedRoute,
    private cs: CommonService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    // fetch the cakeid from the url using ActivatedRoute class
    const id = +this.route.snapshot.params.id;
    // hit api to get the cake details
    this.http.get(environment.apiUrl + 'cake/' + id).subscribe(
      (res: any) => {
        // store the cake details object to the cake property
        this.cake = res.data;
        //  set data loading to true
        this.dataloaded = true;
      },
      (err) => {
        // display the error message
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }

  // method the add cake to cart
  addToCart() {
    // check whether the user is loging or not
    if (!localStorage.loginUser) {
      this.toastr.warning('Login To use Add To Cart');
      // redirecting user to login page
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
    if (localStorage.loginUser) {
      // creating cake object to send in post request
      const cakeObj = {
        cakeid: this.cake.cakeid,
        name: this.cake.name,
        image: this.cake.image,
        weight: this.cake.weight,
        price: this.cake.price,
      };

      // hit post request to add cake to cart
      this.http.post(environment.apiUrl + 'addcaketocart', cakeObj).subscribe(
        (res: any) => {
          // check whether the cake addded to cart or not
          if (res.data) { this.toastr.success(res.message); }
          else { this.toastr.warning(res.message); }
        },
        (err) => {
          // display the error message
          console.log(err);
          this.toastr.error(err.message);
        }
      );
    }
  }
}
