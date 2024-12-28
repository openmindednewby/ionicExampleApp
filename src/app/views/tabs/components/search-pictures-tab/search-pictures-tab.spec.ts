import { SearchPicturesTab } from './search-pictures-tab';
import { IndexedDbService, ObjectStoreNames } from 'src/app/services/indexed-db/indexed-db.service';
import { signal } from '@angular/core';

describe('SearchPicturesTab Component', () => {
  let component: SearchPicturesTab;
  let indexedDbServiceSpy: jasmine.SpyObj<IndexedDbService>;

  beforeEach(() => {
    // Mock IndexedDbService
    indexedDbServiceSpy = jasmine.createSpyObj('IndexedDbService', ['getItem']);
    indexedDbServiceSpy.getItem.and.returnValue(Promise.resolve(new Blob(['image data'], { type: 'image/jpeg' })));

    // Manually instantiate the component
    component = new SearchPicturesTab(indexedDbServiceSpy);

    // Mock the signals
    component.pictureId = signal<number | undefined>(undefined);
    (component as any).currentPhoto = signal<Blob | undefined>(undefined);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute photoURL correctly', () => {
    // Set a current photo
    const mockBlob = new Blob(['image data'], { type: 'image/jpeg' });
    (component as any).currentPhoto.set(mockBlob);

    // Call the computed property
    const photoURL = component.photoURL();

    // Assert that the photo URL is created correctly
    expect(photoURL).toBeDefined();
    expect(photoURL).toContain('blob:');
  });

  it('should compute showCard correctly when photoURL is defined', () => {
    // Set a current photo
    const mockBlob = new Blob(['image data'], { type: 'image/jpeg' });
    (component as any).currentPhoto.set(mockBlob);

    // Call the computed property
    const showCard = component.showCard();

    // Assert that the showCard is true because photoURL is defined
    expect(showCard).toBeTrue();
  });

  it('should compute isGetImageDisabled correctly when pictureId is not defined', () => {
    // Initially, pictureId is undefined
    const isDisabled = component.isGetImageDisabled();

    // Assert that the button is disabled because pictureId is not defined
    expect(isDisabled).toBeTrue();
  });

  it('should compute isGetImageDisabled correctly when pictureId is defined', () => {
    // Set pictureId to a valid number
    component.pictureId.set(123);

    // Call the computed property
    const isDisabled = component.isGetImageDisabled();

    // Assert that the button is not disabled because pictureId is defined
    expect(isDisabled).toBeFalse();
  });

  it('should call getItem and set currentPhoto when getImage is called', async () => {
    // Set a pictureId value
    component.pictureId.set(1);

    // Call the getImage method
    await component.getImage();

    // Assert that the getItem method was called with the correct arguments
    expect(indexedDbServiceSpy.getItem).toHaveBeenCalledWith(1, ObjectStoreNames.Pictures);

    // Assert that currentPhoto was set with the returned Blob
    expect((component as any).currentPhoto()).toBeInstanceOf(Blob);
  });

  it('should generate a photo URL when currentPhoto is set', () => {
    const mockBlob = new Blob(['image data'], { type: 'image/jpeg' });
    (component as any).currentPhoto.set(mockBlob);

    const photoURL = (component as any).generatePhotoURL();

    // Assert that the generated photo URL is valid
    expect(photoURL).toContain('blob:');
  });

  it('should trigger downloadPicture and create a download link', () => {
    // Create a mock photoURL
    const photoURL = 'https://example.com/photo.jpg';
    (component as any).currentPhoto.set(new Blob(['image data'], { type: 'image/jpeg' }));

    // Set the computed photoURL to a valid URL
    spyOn(document, 'createElement').and.returnValue({ click: jasmine.createSpy() } as any);

    // Trigger downloadPicture
    component.downloadPicture();

    // Assert that the download link was clicked
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect((document as any).createElement().click).toHaveBeenCalled();
  });

  it('should set pictureId when onInputIdChange is called', () => {
    // Set initial value for pictureId
    component.pictureId.set(undefined);

    // Call onInputIdChange
    component.onInputIdChange(42);

    // Assert that pictureId has been updated
    expect(component.pictureId()).toBe(42);
  });
});
