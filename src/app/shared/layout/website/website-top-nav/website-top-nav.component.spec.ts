import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTopNavComponent } from './website-top-nav.component';

describe('WebsiteTopNavComponent', () => {
  let component: WebsiteTopNavComponent;
  let fixture: ComponentFixture<WebsiteTopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteTopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
