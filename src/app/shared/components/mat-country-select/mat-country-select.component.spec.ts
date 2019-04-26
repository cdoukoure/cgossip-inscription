import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCountrySelectComponent } from './mat-country-select.component';

describe('MatCountrySelectComponent', () => {
  let component: MatCountrySelectComponent;
  let fixture: ComponentFixture<MatCountrySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatCountrySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCountrySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
