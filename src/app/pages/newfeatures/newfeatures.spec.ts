import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newfeatures } from './newfeatures';

describe('Newfeatures', () => {
  let component: Newfeatures;
  let fixture: ComponentFixture<Newfeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newfeatures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newfeatures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
