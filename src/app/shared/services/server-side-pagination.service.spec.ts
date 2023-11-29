import { TestBed } from '@angular/core/testing';

import { ServerSidePaginationService } from './server-side-pagination.service';

describe('ServerSidePaginationService', () => {
  let service: ServerSidePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerSidePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
