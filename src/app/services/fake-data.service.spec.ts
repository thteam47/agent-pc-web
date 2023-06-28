import { TestBed } from '@angular/core/testing';

import { FakeDataService } from './fake-data.service';

describe('CustomerService', () => {
  let service: FakeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
