import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperProfile } from './developer-profile';

describe('DeveloperProfile', () => {
  let component: DeveloperProfile;
  let fixture: ComponentFixture<DeveloperProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
