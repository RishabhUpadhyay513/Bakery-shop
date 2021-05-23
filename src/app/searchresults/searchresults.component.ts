import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    this.route.queryParams.subscribe((q: any) => {
      this.loading = true;
      this.http.get(this.cs.apiUrl + 'searchcakes?q=' + q.q).subscribe(
        (res: any) => {
          this.cakefilter = res.data;
          this.cakesList = this.cakefilter;
          this.loading = false;
          // console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  ngOnInit(): void {}
  search(query: any) {
    // trim the white sapces from search query
    const searchQuery = query.trim();

    // check if search Query is empty space
    if (!searchQuery || searchQuery === '')
      return (this.cakesList = this.cakefilter);

    // filter out the matched data
    this.cakesList = this.cakefilter.filter((e: any) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  sortByPrice() {
    if (this.maxPrice <= this.minPrice) {
      this.toastr.info('Min-Price Should be smaller then Max-Price');
      return;
    }

    if (this.minPrice || this.maxPrice) {
      this.cakesList = this.cakefilter.filter(
        (e: any) =>
          (this.minPrice ? e.price >= this.minPrice : true) &&
          (this.maxPrice ? e.price <= this.maxPrice : true)
      );
      if (this.cakesList.length > 0) return;
      else
        this.toastr.info(
          `No Cake found of price  ${
            this.minPrice && this.maxPrice
              ? `between ₹${this.minPrice}-₹${this.maxPrice}`
              : `₹${this.minPrice ? this.minPrice : this.maxPrice}`
          }`
        );
    }

    this.cakesList = [...this.cakefilter];
  }
}
