/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CloudServiceService } from './cloud-service.service';

describe('CloudServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CloudServiceService]
    });
  });

  it('should ...', inject([CloudServiceService], (service: CloudServiceService) => {
    expect(service).toBeTruthy();
  }));
});
