import { ChangeDetectionStrategy, Component, computed, Signal, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonIcon, IonButton, IonImg } from '@ionic/angular/standalone';
import { CameraServiceService } from '../../../../services/native/camera-service/camera-service.service';
import { CommonModule } from '@angular/common';
import { IndexedDbService, ObjectStoreNames } from 'src/app/services/indexed-db/indexed-db.service';
import { Photo } from '@capacitor/camera';
import { isValueDefined } from 'src/app/utils/tools/isValueDefined';
import dataUrlToBlob from 'src/app/utils/mappers/dataUrlToBlob';
import { Header } from "../header/header";
import { GetRandomPictureService } from 'src/app/services/http/getRandomPicture/get-random-picture.service';

@Component({
  selector: 'appTakePictureTab',
  templateUrl: 'take-picture-tab.html',
  styleUrls: ['take-picture-tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonImg, IonButton, IonFab, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, Header],
})
export class TakePictureTab {
  public currentPicture = signal<Photo | undefined>(undefined);
  public isStorePictureDisabled = computed(() => !isValueDefined(this.currentPicture()?.dataUrl));

  constructor(
    private cameraServiceService: CameraServiceService,
    private indexedDbService: IndexedDbService,
    private getRandomPictureService: GetRandomPictureService
  ) { }

  public getRandomPicture(): void {
    try {
      const pictureSignal = this.getRandomPictureService.getPicture();
      const picture = pictureSignal();
      console.log('picture', picture);
      if(!isValueDefined(picture)) throw new Error('Failed to get random image');

      this.currentPicture.set({ dataUrl: URL.createObjectURL(picture!) } as Photo);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  public async takePicture(): Promise<void> {
    try {
      const photo = await this.cameraServiceService.takePhoto();
      this.currentPicture.set(photo);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  // Store the current photo in IndexedDB
  public async storePicture(): Promise<void> {
    if (isValueDefined(this.currentPicture()!.dataUrl)) {
      try {
        const blob = dataUrlToBlob(this.currentPicture()!.dataUrl!);
        await this.indexedDbService.addItem(blob, ObjectStoreNames.Pictures);
      } catch (error) {
        console.error('Error storing photo:', error);
      }
    }
  }


}
