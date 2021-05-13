import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css'],
})
export class AddproductsComponent implements OnInit {
  cake: any = { ingredients: [], owner: {} };
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private cs: UserListService
  ) {}

  ngOnInit(): void {}
  addcake() {
    if (this.cs.validateCakeDetails(this.cake)) {
      this.cake.ingredients = this.cake.ingredients.filter(
        (e: any) => e || e.trim()
      );

      console.log(this.cake);
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
    this.cake.ingredients.splice(i, 1);
  }
  addIng(e: any) {
    this.cake.ingredients.push('');
  }
}
