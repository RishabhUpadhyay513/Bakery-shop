import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  loading: any = true;
  searchKey: any;
  constructor(
    private toastr: ToastrService,
    public admin: AdminService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}
  ngDoCheck() {
    this.loading = this.admin.cakeList.length > 0 ? false : true;
  }
}
