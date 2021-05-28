import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css'],
})
export class SearchresultsComponent implements OnInit {
  minPrice: any;
  maxPrice: any;
  loading: any = true;
  cakesList: any = [];
  cakefilter: any = [];
  constructor(
    public cs: CommonService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    // fetch query string from the route
    this.route.queryParams.subscribe((query: any) => {
      this.loading = true;
      // hit get request to fetch search results
      this.http.get(environment.apiUrl + 'searchcakes?q=' + query.q).subscribe(
        (res: any) => {
          this.cakefilter = res.data;
          // for sortByPrice method
          this.cakesList = [...this.cakefilter];
          this.loading = false;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  ngOnInit(): void {}

  filterByPrice() {
    //  validate maxprice and minprice
    if (this.maxPrice <= this.minPrice) {
      this.toastr.info('Min-Price Should be smaller then Max-Price');
      return;
    }

    if (this.minPrice || this.maxPrice) {
      // filter cake list
      this.cakesList = this.cakefilter.filter(
        (e: any) =>
          (this.minPrice ? e.price >= this.minPrice : true) &&
          (this.maxPrice ? e.price <= this.maxPrice : true)
      );
      if (this.cakesList.length > 0) { return; }
      else {
        this.toastr.info(
          `No Cake found of price  ${
            this.minPrice && this.maxPrice
              ? `between ₹${this.minPrice}-₹${this.maxPrice}`
              : `₹${this.minPrice ? this.minPrice : this.maxPrice}`
          }`
        );
      }
    }

    this.cakesList = [...this.cakefilter];
  }
}
