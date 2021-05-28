import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCakesComponent } from './shop-cakes.component';

describe('ShopCakesComponent', () => {
  let component: ShopCakesComponent;
  let fixture: ComponentFixture<ShopCakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCakesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
