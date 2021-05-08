import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminsearch',
  templateUrl: './adminsearch.component.html',
  styleUrls: ['./adminsearch.component.css'],
})
export class AdminsearchComponent implements OnInit {
  @Input() cakearr: any;
  searchQuery: any;
  constructor() {}

  ngOnInit(): void {}
  filter(e: any) {
    alert(e);
  }
  search() {
    console.log(this.searchQuery, this.cakearr);
  }
}
