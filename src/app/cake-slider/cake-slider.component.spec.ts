import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeSliderComponent } from './cake-slider.component';

describe('CakeSliderComponent', () => {
  let component: CakeSliderComponent;
  let fixture: ComponentFixture<CakeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CakeSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
