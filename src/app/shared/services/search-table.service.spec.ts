import { TestBed } from '@angular/core/testing';

import { SearchTableService } from './search-table.service';

describe('SearchTableService', () => {
  let service: SearchTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
