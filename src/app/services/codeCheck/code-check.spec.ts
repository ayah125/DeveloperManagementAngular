import { TestBed } from '@angular/core/testing';

import { CodeCheck } from './code-check';

describe('CodeCheck', () => {
  let service: CodeCheck;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeCheck);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
