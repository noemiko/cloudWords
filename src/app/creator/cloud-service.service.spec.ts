/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CloudService } from './cloud-service.service';

describe('CloudServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CloudService]
    });
  });

  it('should ...', inject([CloudService], (service: CloudService) => {
    expect(service).toBeTruthy();
  }));
});
