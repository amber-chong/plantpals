import { TestBed } from '@angular/core/testing';

import { ReminderServeService } from './reminder-serve.service';

describe('ReminderServeService', () => {
  let service: ReminderServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReminderServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
