import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonIcon, IonButton, IonImg } from '@ionic/angular/standalone';
import { CameraServiceService } from '../../services/native/camera-service/camera-service.service';
import { CommonModule } from '@angular/common';
import { IndexedDbService, ObjectStoreNames } from 'src/app/services/indexed-db/indexed-db.service';
import { Photo } from '@capacitor/camera';
import { isValueDefined } from 'src/app/utils/tools/isValueDefined';
import dataUrlToBlob from 'src/app/utils/mappers/dataUrlToBlob';

@Component({
  selector: 'appTakePictureTab',
  templateUrl: 'take-picture-tab.html',
  styleUrls: ['take-picture-tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonImg, IonButton, IonFab, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class TakePictureTab {
  public currentPhoto = signal<Photo | undefined>(undefined);
  public isStorePictureDisabled = computed(() => !isValueDefined(this.currentPhoto()?.dataUrl));

  constructor(
    private cameraServiceService: CameraServiceService,
    private indexedDbService: IndexedDbService,
  ) { }

  public async takePicture(): Promise<void> {
    try {
      const photo = await this.cameraServiceService.takePhoto();
      this.currentPhoto.set(photo);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  // Store the current photo in IndexedDB
  public async storePicture(): Promise<void> {
    if (isValueDefined(this.currentPhoto()!.dataUrl)) {
      try {
        const blob = dataUrlToBlob(this.currentPhoto()!.dataUrl!);
        await this.indexedDbService.addItem(blob, ObjectStoreNames.Pictures);
        console.log('Photo stored successfully!');
      } catch (error) {
        console.error('Error storing photo:', error);
      }
    } else {
      console.error('No photo to store.');
    }
  }


}
