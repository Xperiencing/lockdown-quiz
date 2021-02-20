import { TestBed } from '@angular/core/testing';

import { TabooService } from './taboo.service';

describe('TabooService', () => {
  let service: TabooService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabooService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
