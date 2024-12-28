import { GetRandomPictureService } from './get-random-picture.service';
import { HttpService } from '../http.service';
import { Endpoints } from 'src/environments/endpoints';
import { of, throwError } from 'rxjs';

describe('GetRandomPictureService', () => {
  let service: GetRandomPictureService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['httpGetBlob']);
    service = new GetRandomPictureService(httpServiceSpy);
  });

  it('should call httpGetBlob with correct parameters and return an Observable<Blob>', (done) => {
    // Arrange
    const mockBlob = new Blob(['image data'], { type: 'image/jpeg' });
    const width = 500;
    const height = 500;
    const expectedUrlIDs = [width.toString(), height.toString()];
    httpServiceSpy.httpGetBlob.and.returnValue(of(mockBlob));

    // Act
    const result$ = service.getPicture(width, height);

    // Assert
    result$.subscribe((blob) => {
      expect(blob).toEqual(mockBlob);
      expect(httpServiceSpy.httpGetBlob).toHaveBeenCalledWith(
        Endpoints.GetPicsumRandomPhoto,
        expectedUrlIDs
      );
      done();
    });
  });

  it('should throw an error if httpGetBlob fails', (done) => {
    // Arrange
    const mockError = new Error('Network error');
    const width = 500;
    const height = 500;
    const expectedUrlIDs = [width.toString(), height.toString()];
    httpServiceSpy.httpGetBlob.and.returnValue(throwError(() => mockError));

    // Act
    const result$ = service.getPicture(width, height);

    // Assert
    result$.subscribe({
      next: () => {
        fail('Expected an error, but got a value.');
      },
      error: (error) => {
        // Check if the error message contains the expected parts
        expect(error.message).toContain(mockError.message); // Ensure the original error is included
        expect(httpServiceSpy.httpGetBlob).toHaveBeenCalledWith(
          Endpoints.GetPicsumRandomPhoto,
          expectedUrlIDs
        );
        done();
      },
    });
  });

  it('should use default width and height if none are provided', (done) => {
    // Arrange
    const mockBlob = new Blob(['image data'], { type: 'image/jpeg' });
    const defaultWidth = 500;
    const defaultHeight = 500;
    const expectedUrlIDs = [defaultWidth.toString(), defaultHeight.toString()];
    httpServiceSpy.httpGetBlob.and.returnValue(of(mockBlob));

    // Act
    const result$ = service.getPicture();

    // Assert
    result$.subscribe((blob) => {
      expect(blob).toEqual(mockBlob);
      expect(httpServiceSpy.httpGetBlob).toHaveBeenCalledWith(
        Endpoints.GetPicsumRandomPhoto,
        expectedUrlIDs
      );
      done();
    });
  });
});
