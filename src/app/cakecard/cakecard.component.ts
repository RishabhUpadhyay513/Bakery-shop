import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cakecard',
  templateUrl: './cakecard.component.html',
  styleUrls: ['./cakecard.component.css'],
})
export class CakecardComponent implements OnInit {
  //input for cake data
  @Input() cake: any;
  constructor() {}

  ngOnInit(): void {}
}
