import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css'],
})
export class AddproductsComponent implements OnInit {
  cake: any = { type: '' };
  ingrediant: any = {};
  ingredients: any = [];
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private cs: UserListService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  addcake() {
    console.log(this.cake);
    if (!this.cake.image) {
      this.toastr.warning('Please Upload the cake image first.');
      return;
    }

    if (this.cs.validateCakeDetails(this.cake)) {
      this.ingredients = Object.values(this.ingrediant);
      this.ingredients = [...this.ingredients].filter(
        (e: any) => e || e.trim()
      );
      this.cake.ingredients = [...this.ingredients];
      // console.log(this.cake);

      this.http.post(this.cs.apiUrl + 'addcake', this.cake).subscribe(
        (res: any) => {
          // console.log(res);
          if (res.message === 'Success') {
            this.toastr.success(`${this.cake.name} Added Successfully.`);
            this.router.navigate(['/admin']);
            return;
          }
          this.toastr.warning(res.errorMessage.message, '', {
            positionClass: 'toast-top-full-width',
          });
        },
        (err) => {
          this.toastr.error(err.message);
          console.log(err);
        }
      );

      return;
    }
    this.toastr.info('Please fill all fields correctly.');
  }

  upload(e: any) {
    e = e.target.parentElement.parentElement;
    const file: any = e.querySelector('#image'),
      img: any = document.querySelector('.preview-img img'),
      // create formData object from FromData Class
      formData: any = new FormData();

    // check if user has uploaded image or not
    if (!file.files[0]) {
      this.toastr.info('Then click on upload');
      this.toastr.info('First Choose the image File!!');
      return;
    }

    // show uploading message
    this.toastr.info('Image Uploading..... ', '', {
      progressBar: true,
      timeOut: 2000,
      progressAnimation: 'increasing',
    });

    // append uploaded file to formData
    formData.append('file', file.files[0]);

    let user = JSON.parse(localStorage.loginUser);

    // generating http post request
    this.http.post(this.cs.apiUrl + 'upload', formData).subscribe(
      (res: any) => {
        if (res.imageUrl) {
          this.toastr.success('Image Uploaded Successfuly');

          this.cake.image = res.imageUrl;
        } else {
          this.toastr.info('Please Upload a valid Image File');
          this.toastr.warning('Image Upload failed!!');
        }
      },
      (err) => {
        console.log(err);
        this.toastr.error('Image Upload failed!!');
      }
    );
  }

  imgPreview(imgEl: any) {
    const file: any = imgEl.target,
      imgOutput: any = document.querySelector('.preview-img img');

    imgOutput.src = URL.createObjectURL(file.files[0]);
  }

  deleteIng(i: any) {
    delete this.ingrediant[i];
    this.ingredients = Object.values(this.ingrediant);
  }
  addIng(e: any) {
    this.ingredients = Object.values(this.ingrediant);
    this.ingredients.push('');
  }
}
