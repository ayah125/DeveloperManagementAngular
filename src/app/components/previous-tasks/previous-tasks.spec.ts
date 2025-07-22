import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousTasks } from './previous-tasks';

describe('PreviousTasks', () => {
  let component: PreviousTasks;
  let fixture: ComponentFixture<PreviousTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousTasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
