import { TestBed } from '@angular/core/testing';

import { Workspaceservice } from './workspaceservice';

describe('Workspaceservice', () => {
  let service: Workspaceservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Workspaceservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
