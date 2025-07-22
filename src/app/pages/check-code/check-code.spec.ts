import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCode } from './check-code';

describe('CheckCode', () => {
  let component: CheckCode;
  let fixture: ComponentFixture<CheckCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
