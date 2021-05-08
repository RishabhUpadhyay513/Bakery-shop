import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  adminItems: any = [];
  loading: any = true;
  constructor(
    private toastr: ToastrService,
    public cs: UserListService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}
  ngDoCheck() {
    this.loading = this.cs.cakeList.length > 0 ? false : true;
  }
  edit(id: any) {
    console.log(id);
    this.http.get(this.cs.apiUrl + 'cake/' + id).subscribe(
      (res: any) => {
        console.log(res.data);
        //  = res.data;
        //  this.dataloaded = true;
      },
      (req) => {}
    );
  }
}
