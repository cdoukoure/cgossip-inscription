import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativetimNavbarComponent } from './creativetim-navbar.component';

describe('CreativetimNavbarComponent', () => {
  let component: CreativetimNavbarComponent;
  let fixture: ComponentFixture<CreativetimNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreativetimNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreativetimNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
