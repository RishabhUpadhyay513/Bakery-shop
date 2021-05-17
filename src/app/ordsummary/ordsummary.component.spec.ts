import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdsummaryComponent } from './ordsummary.component';

describe('OrdsummaryComponent', () => {
  let component: OrdsummaryComponent;
  let fixture: ComponentFixture<OrdsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdsummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
