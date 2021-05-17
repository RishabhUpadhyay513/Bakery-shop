import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutmeComponent } from './checkoutme.component';

describe('CheckoutmeComponent', () => {
  let component: CheckoutmeComponent;
  let fixture: ComponentFixture<CheckoutmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
