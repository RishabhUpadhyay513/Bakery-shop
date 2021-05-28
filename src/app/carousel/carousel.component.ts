import { Component, OnInit } from '@angular/core';
// import common services for accessing common data for all component
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  // carousel image array
  carouselImgs: any = this.cs.carouselImgs;

  constructor(public cs: CommonService) {}

  ngOnInit(): void {}
}
