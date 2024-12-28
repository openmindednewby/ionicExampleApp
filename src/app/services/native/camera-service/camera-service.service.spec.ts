import { TestBed } from '@angular/core/testing';

import { CameraServiceService } from './camera-service.service';

describe('CameraServiceService', () => {
  let service: CameraServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
