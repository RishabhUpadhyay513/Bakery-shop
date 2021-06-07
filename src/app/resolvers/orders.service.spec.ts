import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';

import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        HttpClientModule,
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-top-left',
          preventDuplicates: true,
          enableHtml: true,
        }),
      ],
    });
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
