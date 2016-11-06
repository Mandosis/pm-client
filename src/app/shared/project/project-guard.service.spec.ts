/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectGuard } from './project-guard.service';

describe('Service: ProjectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectGuard]
    });
  });

  it('should ...', inject([ProjectGuard], (service: ProjectGuard) => {
    expect(service).toBeTruthy();
  }));
});
