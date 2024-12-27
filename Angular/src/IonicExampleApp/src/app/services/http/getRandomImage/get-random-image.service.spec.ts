import { TestBed } from '@angular/core/testing';

import { GetRandomImageService } from './get-random-image.service';

describe('GetRandomImageService', () => {
  let service: GetRandomImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRandomImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
