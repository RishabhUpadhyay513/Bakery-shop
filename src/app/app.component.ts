import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cakeHouse';
  constructor(private cs: CommonService) {
    // call To validate login token
    cs.validatelogin();
  }
}
