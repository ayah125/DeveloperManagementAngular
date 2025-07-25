import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCheck } from './code-check';

describe('CodeCheck', () => {
  let component: CodeCheck;
  let fixture: ComponentFixture<CodeCheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeCheck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeCheck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
