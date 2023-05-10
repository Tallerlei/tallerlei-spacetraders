import { TestBed } from '@angular/core/testing';

import { SpacetradersApiService } from './spacetraders-api.service';

describe('SpacetradersApiService', () => {
  let service: SpacetradersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpacetradersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
