import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsDisComponent } from './search-results-dis.component';

describe('SearchResultsDisComponent', () => {
  let component: SearchResultsDisComponent;
  let fixture: ComponentFixture<SearchResultsDisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsDisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsDisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
