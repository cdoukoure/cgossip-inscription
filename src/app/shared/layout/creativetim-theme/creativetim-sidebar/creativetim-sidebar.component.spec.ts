import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativetimSidebarComponent } from './creativetim-sidebar.component';

describe('CreativetimSidebarComponent', () => {
  let component: CreativetimSidebarComponent;
  let fixture: ComponentFixture<CreativetimSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreativetimSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreativetimSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
