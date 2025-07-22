import { TestBed } from '@angular/core/testing';

import { Createworkspace } from './createWorkSpace/createworkspace';

describe('Createworkspace', () => {
  let service: Createworkspace;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Createworkspace);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
