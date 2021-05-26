import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css'],
})
export class EditformComponent implements OnInit {
  cake: any;
  loading: any = true;
  cakeIngs: any = [];

  constructor(
    private http: HttpClient,
    private cs: UserListService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.params.cakeId;
    this.http.get(this.cs.apiUrl + 'cake/' + id).subscribe(
      (res: any) => {
        if (res.data) {
          this.cake = res.data;
          this.updateIngs();
          this.loading = false;
          return;
        }
        this.toastr.error(res.message);
      },
      (req) => {}
    );
  }

  ngOnInit(): void {}

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
  saveChanges() {
    if (this.cs.validateCakeDetails(this.cake)) {
      this.cake.ingredients = this.cake.ingredients.filter((e: any) => e);
      this.updateIngs();

      console.log(this.cake);
      return;
    }
    this.toastr.info('Please fill all fields correctly.');
  }

  deleteIng(i: any) {
    this.cake.ingredients.splice(i, 1);
    this.updateIngs();
  }
  addIng(e: any) {
    e.preventDefault();
    this.cake.ingredients.push('');
    this.updateIngs();
  }

  updateIngs() {
    this.cakeIngs = [];
    this.cakeIngs = this.cake.ingredients.map((e: any) => e);
  }

  
}
