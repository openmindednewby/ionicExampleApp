import { TestBed } from '@angular/core/testing';

import { GetRandomPictureService } from './getRandomPicture/get-random-picture.service';

describe('GetRandomPictureService', () => {
  let service: GetRandomPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRandomPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
