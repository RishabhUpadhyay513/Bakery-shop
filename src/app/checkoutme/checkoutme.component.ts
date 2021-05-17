import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-checkoutme',
  templateUrl: './checkoutme.component.html',
  styleUrls: ['./checkoutme.component.css'],
})
export class CheckoutmeComponent implements OnInit {
  constructor(public cs: UserListService) {
    
  }

  
  ngOnInit(): void {}
}
