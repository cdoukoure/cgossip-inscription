import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativetimFooterComponent } from './creativetim-footer.component';

describe('CreativetimFooterComponent', () => {
  let component: CreativetimFooterComponent;
  let fixture: ComponentFixture<CreativetimFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreativetimFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreativetimFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
