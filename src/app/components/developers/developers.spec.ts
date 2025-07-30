import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersComponent } from './developers';

describe('Developers', () => {
  let component: DevelopersComponent;
  let fixture: ComponentFixture<DevelopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevelopersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
