import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-cake-details',
  templateUrl: './cake-details.component.html',
  styleUrls: ['./cake-details.component.css'],
})
export class CakeDetailsComponent implements OnInit {
  cake: any = {};
  dataloaded: any = false;

  constructor(
    private route: ActivatedRoute,
    private cs: UserListService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    const id = +this.route.snapshot.params.cakeId;
    this.http.get(this.cs.apiUrl + 'cake/' + id).subscribe(
      (res: any) => {
        this.cake = res.data;
        this.dataloaded = true;
      },
      (req) => {}
    );
  }
  addToCart() {
    if (!localStorage.loginUser) {
      this.toastr.warning('Login To use Add To Cart');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
    if (localStorage.loginUser) {
      let user = JSON.parse(localStorage.loginUser),
        cakeObj = {
          cakeid: this.cake.cakeid,
          name: this.cake.name,
          image: this.cake.image,
          weight: this.cake.weight,
          price: this.cake.price,
        };

      // generating http post request
      this.http.post(this.cs.apiUrl + 'addcaketocart', cakeObj).subscribe(
        (res: any) => {
          if (res.data) this.toastr.success(res.message);
          else this.toastr.warning(res.message);
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.message);
        }
      );
    }
  }
  ngOnInit(): void {}
}
