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
import { Subscription } from 'rxjs';

@Component({
  selector: 'appTakePictureTab',
  templateUrl: 'take-picture-tab.html',
  styleUrls: ['take-picture-tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonImg, IonButton, IonFab, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, Header],
})
export class TakePictureTab {
  public randomPicture: Signal<Photo | undefined>;
  public takenPicture = signal<Photo | undefined>(undefined);
  public currentPicture = computed(() => {
    return this.takenPicture() || this.randomPicture();
  });
  public isStorePictureDisabled = computed(() => !isValueDefined(this.takenPicture()?.dataUrl));

  constructor(
    private cameraServiceService: CameraServiceService,
    private indexedDbService: IndexedDbService,
    private getRandomPictureService: GetRandomPictureService
  ) {
      const picture$ = this.getRandomPictureService.picture$;
      const picture = toSignal(picture$);//manges subscription and un-subscription
      this.randomPicture = computed(() => {
        if (isValueDefined(picture())) return { dataUrl: URL.createObjectURL(picture()!) } as Photo;
        return;
      });
   }

  public getRandomPicture(): void {
    try {
      this.getRandomPictureService.getPicture();

    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  public async takePicture(): Promise<void> {
    try {
      const photo = await this.cameraServiceService.takePhoto();
      this.takenPicture.set(photo);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  public async storePicture(): Promise<void> {
    if (isValueDefined(this.takenPicture()!.dataUrl)) {
      try {
        const blob = dataUrlToBlob(this.takenPicture()!.dataUrl!);
        await this.indexedDbService.addItem(blob, ObjectStoreNames.Pictures);
      } catch (error) {
        console.error('Error storing photo:', error);
      }
    }
  }


}
