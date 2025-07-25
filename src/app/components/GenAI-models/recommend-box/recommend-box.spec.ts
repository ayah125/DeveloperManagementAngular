import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendBox } from './recommend-box';

describe('RecommendBox', () => {
  let component: RecommendBox;
  let fixture: ComponentFixture<RecommendBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
