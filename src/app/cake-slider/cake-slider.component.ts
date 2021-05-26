import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-cake-slider',
  templateUrl: './cake-slider.component.html',
  styleUrls: ['./cake-slider.component.css'],
})
export class CakeSliderComponent implements OnInit {
  // Slider images
  sliderImg: any = this.cs.sliderImgs;

  constructor(public cs: UserListService) {}

  ngOnInit(): void {}
}
