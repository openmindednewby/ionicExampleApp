import { toSignal } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, computed, OnDestroy, Signal, signal } from '@angular/core';
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
  public randomPicture: Signal<Photo | undefined>;
  public devicePicture = signal<Photo | undefined>(undefined);

  public currentPicture = computed(() => {
    return this.devicePicture() || this.randomPicture();
  });
  public isStorePictureDisabled = computed(() => !isValueDefined(this.devicePicture()?.dataUrl));

  constructor(
    private cameraServiceService: CameraServiceService,
    private indexedDbService: IndexedDbService,
    private getRandomPictureService: GetRandomPictureService
  ) {
    const picture = toSignal(this.getRandomPictureService.picture$);//toSignal manges subscription and un-subscription
    this.randomPicture = computed(() => {
      if (isValueDefined(picture())) return { dataUrl: URL.createObjectURL(picture()!) } as Photo;
      return;
    });
  }

  public getRandomPicture(): void {
    try {
      //this.devicePicture.set(undefined);

      this.getRandomPictureService.getPicture();

    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  public async takePicture(): Promise<void> {
    try {
      const photo = await this.cameraServiceService.takePhoto();
      this.devicePicture.set(photo);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  public async storePicture(): Promise<void> {
    if (!isValueDefined(this.devicePicture()!.dataUrl)) return;

    try {
      const blob = dataUrlToBlob(this.devicePicture()!.dataUrl!);
      await this.indexedDbService.addItem(blob, ObjectStoreNames.Pictures);
    } catch (error) {
      console.error('Error storing photo:', error);
    }
  }
}
