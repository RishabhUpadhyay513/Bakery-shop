import { TestBed } from '@angular/core/testing';

import { ItemsresolverService } from './itemsresolver.service';

describe('ItemsresolverService', () => {
  let service: ItemsresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
