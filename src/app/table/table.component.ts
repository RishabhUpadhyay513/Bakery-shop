import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  loading: any = true;
  searchKey: any;
  displayedColumns: string[] = ['price', 'name', 'weight', 'image'];
  dataSource = new MatTableDataSource<[]>(this.admin.cakeList);
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  // constructor(private paginator: MatPaginator) {}
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  constructor(
    private toastr: ToastrService,
    public admin: AdminService,
    private http: HttpClient,
    private router: Router
  ) {
    this.http.get(this.admin.apiUrl + 'allcakes').subscribe(
      (res: any) => {
        if (res.data) this.admin.cakeList = [...res.data];
        // console.log(res.data);
        this.dataSource = new MatTableDataSource<[]>(this.admin.cakeList);
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.message, 'Error in loading Cakes', {
          positionClass: 'toast-top-full-width',
          timeOut: 10000,
        });
      }
    );
    if (
      !(
        JSON.parse(localStorage.loginUser).email === 'harshit199dubey@gmail.com'
      )
    ) {
      toastr.info('Only Admin User Can Access Admin Panel');
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {}
  ngDoCheck() {
    this.loading = this.admin.cakeList.length > 0 ? false : true;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
