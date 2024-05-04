import { TestBed } from '@angular/core/testing';

import { BranchDetailsService } from './branch-details.service';

describe('BranchDetailsService', () => {
  let service: BranchDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
