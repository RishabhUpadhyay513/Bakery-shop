import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addcake',
  templateUrl: './addcake.component.html',
  styleUrls: ['./addcake.component.css'],
})
export class AddcakeComponent implements OnInit {
  // store the cake details
  cake: any = { type: '' };
  // store the cake ingrediants
  ingrediant: any = {};
  ingredients: any = [];
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private admin: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  // method to add cake to the server
  addcake() {
    // check whether image is uploaded
    if (!this.cake.image) {
      this.toastr.warning('Please Upload the cake image first.');
      return;
    }

    // validate the cake input fields
    if (this.admin.validateCakeDetails(this.cake)) {
      // store the ingrediants
      this.ingredients = Object.values(this.ingrediant);
      // filter out the valid ingrediant valuess
      this.ingredients = [...this.ingredients].filter(
        (e: any) => e || e.trim()
      );
      // store the ingredients array in the cake object
      this.cake.ingredients = [...this.ingredients];

      // hit post request to get the cake details
      this.http.post(environment.apiUrl + 'addcake', this.cake).subscribe(
        (res: any) => {
          // check if the cake added successful
          if (res.message === 'Success') {
            this.toastr.success(`${this.cake.name} Added Successfully.`);
            this.router.navigate(['/admin']);
            return;
          }
          // display the waring message if any error comes
          this.toastr.warning(res.errorMessage.message, '', {
            positionClass: 'toast-top-full-width',
          });
        },
        (err) => {
          // display this server error
          this.toastr.error(err.message);
          console.log(err);
        }
      );

      return;
    }
    this.toastr.info('Please fill all fields correctly.');
  }

  // image upload method
  upload(e: any) {
    // select the parent form tag
    e = e.target.parentElement.parentElement;
    // select the file input tag
    const file: any = e.querySelector('#image'),
      // select the image tag to preview image
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

    // hit post request to uplaod image
    this.http.post(environment.apiUrl + 'upload', formData).subscribe(
      (res: any) => {
        // check if image upload is successful
        if (res.imageUrl) {
          this.toastr.success('Image Uploaded Successfuly');

          this.cake.image = res.imageUrl;
        } else {
          this.toastr.info('Please Upload a valid Image File');
          this.toastr.warning('Image Upload failed!!');
        }
      },
      (err) => {
        // display the error message
        console.log(err);
        this.toastr.error('Image Upload failed!!');
      }
    );
  }

  // preview the image before uploading
  imgPreview(imgEl: any) {
    // select the file input tag
    const file: any = imgEl.target,
      // select the image tag to preview the image
      imgOutput: any = document.querySelector('.preview-img img');
    // create the url to preview image
    imgOutput.src = URL.createObjectURL(file.files[0]);
  }

  // method to delete ingrediant
  deleteIng(i: any) {
    delete this.ingrediant[i];
    this.ingredients = Object.values(this.ingrediant);
  }
  // method to add ingrediant
  addIng(e: any) {
    this.ingredients = Object.values(this.ingrediant);
    this.ingredients.push('');
  }
}
