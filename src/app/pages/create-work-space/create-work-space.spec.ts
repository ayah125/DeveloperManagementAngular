import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Createworkspace } from './create-work-space';

describe('CreateWorkSpace', () => {
  let component: Createworkspace;
  let fixture: ComponentFixture<Createworkspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createworkspace],
    }).compileComponents();

    fixture = TestBed.createComponent(Createworkspace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
