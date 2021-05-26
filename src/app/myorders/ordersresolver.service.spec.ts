import { TestBed } from '@angular/core/testing';

import { OrdersresolverService } from './ordersresolver.service';

describe('OrdersresolverService', () => {
  let service: OrdersresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
