import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIntlTelInput } from './mat-intl-tel-input.component';

describe('MatIntlTelInput', () => {
  let component: MatIntlTelInput;
  let fixture: ComponentFixture<MatIntlTelInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatIntlTelInput ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatIntlTelInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
