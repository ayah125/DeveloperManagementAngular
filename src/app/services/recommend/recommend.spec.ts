import { TestBed } from '@angular/core/testing';

import { Recommend } from './recommend';

describe('Recommend', () => {
  let service: Recommend;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recommend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
