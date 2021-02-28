import { TestBed } from '@angular/core/testing';

import { GuessTheWordService } from './guess-the-word.service';

describe('GuessTheWordService', () => {
  let service: GuessTheWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuessTheWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
