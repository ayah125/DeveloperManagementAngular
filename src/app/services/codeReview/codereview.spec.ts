import { TestBed } from '@angular/core/testing';

import { CodeReviewService } from './codereview';

describe('Codereview', () => {
  let service: CodeReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
