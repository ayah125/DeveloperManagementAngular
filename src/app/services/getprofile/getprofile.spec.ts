import { TestBed } from '@angular/core/testing';

import { Getprofile } from './getprofile';

describe('Getprofile', () => {
  let service: Getprofile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Getprofile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
