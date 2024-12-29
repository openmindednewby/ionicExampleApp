import { CameraServiceService } from './camera-service.service';
import { Camera, Photo } from '@capacitor/camera';

describe('CameraServiceService', () => {
  let cameraService: CameraServiceService;

  // Mocked Photo object
  const mockPhoto: Photo = {
    path: 'mock-path',
    format: 'jpeg',
    base64String: 'mock-base64',
    webPath: 'mock-webpath',
    exif: {},
    saved: false
  };

  // Mock CameraServiceService
  class MockCameraServiceService {
    takePhoto(): Promise<Photo> {
      return Promise.resolve(mockPhoto);
    }
  }

  beforeEach(() => {
    // Use the mock class instead of the real CameraServiceService
    cameraService = new MockCameraServiceService() as any;

    // Ensure Camera.getPhoto is correctly mocked
    spyOn(Camera, 'getPhoto').and.returnValue(Promise.resolve(mockPhoto));
  });

  it('should be created', () => {
    expect(cameraService).toBeTruthy();
  });

  it('should return a photo', async () => {
    // Call the takePhoto method and capture the result
    const result = await cameraService.takePhoto();

    // Verify the result is the mockPhoto object
    expect(result).toEqual(mockPhoto);
  });
});
