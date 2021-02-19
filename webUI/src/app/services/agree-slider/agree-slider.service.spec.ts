import { TestBed } from '@angular/core/testing';

import { AgreeSliderService } from './agree-slider.service';

describe('AgreeSliderService', () => {
  let service: AgreeSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgreeSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
