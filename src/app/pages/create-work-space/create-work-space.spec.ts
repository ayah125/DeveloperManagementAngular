import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkSpace } from './create-work-space';

describe('CreateWorkSpace', () => {
  let component: CreateWorkSpace;
  let fixture: ComponentFixture<CreateWorkSpace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWorkSpace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWorkSpace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
