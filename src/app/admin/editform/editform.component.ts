import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css'],
})
export class EditformComponent implements OnInit {
  // store the cake details data
  cake: any;
  // store the loading status of cake details
  loading: any = true;
  // store the ingredients of the cake
  cakeIngs: any = [];

  constructor(
    private http: HttpClient,
    private cs: CommonService,
    private admin: AdminService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    // fetch the cake id from the params
    const id = this.route.snapshot.params.cakeId;

    // hit get request to fetch the cake details
    this.http.get(environment.apiUrl + 'cake/' + id).subscribe(
      (res: any) => {
        if (res.data) {
          // store the cake details
          this.cake = res.data;
          // call the method to update ingredients array
          this.updateIngs();

          this.loading = false;
          return;
        }
        this.toastr.error(res.message);
      },
      (err) => {
        // display the error message
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }

  ngOnInit(): void {}

  // method to upload image to the server
  upload(e: any) {
    // select the parent form tag
    e = e.target.parentElement.parentElement;
    // select the file input tag
    const file: any = e.querySelector('#image'),
      // select the img tag to preview image
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

    const user = JSON.parse(localStorage.loginUser);

    // generating http post request to upload image
    this.http.post(environment.apiUrl + 'upload', formData).subscribe(
      (res: any) => {
        // check if image upload successful
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
  // method to preview image before uploading
  imgPreview(imgEl: any) {
    // select the input file tag
    const file: any = imgEl.target,
      // select img tag to preview image
      imgOutput: any = document.querySelector('.preview-img img');

    // create the url to preview image
    imgOutput.src = URL.createObjectURL(file.files[0]);
  }

  // method to save edits
  saveChanges() {
    // check to validate cake details
    if (this.admin.validateCakeDetails(this.cake)) {
      // filter out the vaild ingredients fields
      this.cake.ingredients = this.cake.ingredients.filter((e: any) => e);
      this.updateIngs();

      console.log(this.cake);
      return;
    }
    this.toastr.info('Please fill all fields correctly.');
  }

  // method to delete ingredient
  deleteIng(i: any) {
    this.cake.ingredients.splice(i, 1);
    this.updateIngs();
  }
  // method to add ingredients
  addIng(e: any) {
    e.preventDefault();
    this.cake.ingredients.push('');
    this.updateIngs();
  }

  // method to update the ingredients array
  updateIngs() {
    this.cakeIngs = [];
    this.cakeIngs = this.cake.ingredients.map((e: any) => e);
  }
}
