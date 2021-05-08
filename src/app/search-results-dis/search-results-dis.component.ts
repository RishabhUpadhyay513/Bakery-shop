import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-search-results-dis',
  templateUrl: './search-results-dis.component.html',
  styleUrls: ['./search-results-dis.component.css'],
})
export class SearchResultsDisComponent implements OnInit {
  // searchQuery: any = 'r';
  minPrice: any;
  maxPrice: any;

  cakesList: any = [];
  cakefilter: any = [];
  constructor(
    public cs: UserListService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe((q: any) => {
      this.http.get(this.cs.apiUrl + 'searchcakes?q=' + q.q).subscribe(
        (res: any) => {
          this.cakefilter = res.data;
          this.cakesList = this.cakefilter;
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
    if (this.minPrice || this.maxPrice) {
      this.cakesList = this.cakefilter.filter(
        (e: any) =>
          (this.minPrice ? e.price >= this.minPrice : true) &&
          (this.maxPrice ? e.price <= this.maxPrice : true)
      );
      return;
    }

    this.cakesList = [...this.cakefilter];
  }
}
