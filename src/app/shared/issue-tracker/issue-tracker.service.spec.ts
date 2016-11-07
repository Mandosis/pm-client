/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IssueTrackerService } from './issue-tracker.service';

describe('Service: IssueTracker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssueTrackerService]
    });
  });

  it('should ...', inject([IssueTrackerService], (service: IssueTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
