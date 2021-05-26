import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
})
export class AdditemComponent implements OnInit {
  // @Input() weight: any;
  cake: any = {};

  constructor() {}

  ngOnInit(): void {}
  addItem() {
    console.log(this.cake);
  }
  // ngOnChanges(changes: any) {
  //   console.log(changes);
  // }
}
