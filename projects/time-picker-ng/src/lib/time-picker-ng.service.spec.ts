import { TestBed } from '@angular/core/testing';

import { TimePickerNgService } from './time-picker-ng.service';

describe('TimePickerNgService', () => {
  let service: TimePickerNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimePickerNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
