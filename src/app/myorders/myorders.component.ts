import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  user: any = {};
  showImg: any = true;
  constructor(
    private http: HttpClient,
    private cs: UserListService,
    private toastr: ToastrService
  ) {}

  upload(e: any) {
    e = e.target;
    const file: any = e.querySelector('#image'),
      img: any = e.querySelector('.preview-img img'),
      // create formData object from FromData Class
      formData: any = new FormData();

    // check if user has uploaded image or not
    if (!file.files[0]) {
      this.toastr.info('First Choose the image File!!');
      this.toastr.info('Then click on upload');
      return;
    }

    // show uploading message
    this.toastr.info('Uploading.....', '', {
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
          console.log(res);
          this.toastr.success('Image Uploaded Successfuly');
          img.src = res.imageUrl;
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

  ngOnInit(): void {}
}
