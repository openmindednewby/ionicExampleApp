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
import { BehaviorSubject, filter, switchMap } from 'rxjs';

@Component({
  selector: 'appTakePictureTab',
  templateUrl: 'take-picture-tab.html',
  styleUrls: ['take-picture-tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonImg, IonButton, IonFab, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, Header],
})
export class TakePictureTab {
  private randomPictureSubject = new BehaviorSubject<boolean>(false);
  private randomPicture$ = this.randomPictureSubject.pipe(
    filter((shouldGetPicture) => shouldGetPicture),
    switchMap(() => this.getRandomPictureService.getPicture()));

    public randomPictureBlob!: Signal<Blob | undefined>;
    public randomPicture!: Signal<Photo | undefined>;
    public devicePicture = signal<Photo | undefined>(undefined);

  public currentPicture = computed(() => {
    return this.devicePicture() || this.randomPicture();
  });
  public isStorePictureDisabled = computed(() =>
    !isValueDefined(this.devicePicture()?.dataUrl) &&
    !isValueDefined(this.randomPicture()?.dataUrl)
  );

  constructor(
    private cameraServiceService: CameraServiceService,
    private indexedDbService: IndexedDbService,
    private getRandomPictureService: GetRandomPictureService
  ) {
    this.initializeRandomPictureSignal();
  }

  public getRandomPicture(): void {
    this.devicePicture.set(undefined);
    this.randomPictureSubject.next(true);
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
    const dataURL = this.devicePicture()?.dataUrl;
    if(isValueDefined(dataURL)) {
      await this.storeDataURLPicture(dataURL!);
      return;
    }

    const blob = this.randomPictureBlob();
    if(isValueDefined(blob)) await this.storeBlobPicture(blob!);
  }

  private async storeDataURLPicture(dataURL: string): Promise<void> {
    try {
      const blob = dataUrlToBlob(dataURL);
      await this.indexedDbService.addItem(blob, ObjectStoreNames.Pictures);
    } catch (error) {
      console.error('Error storing photo:', error);
    }
  }

  private async storeBlobPicture(blob: Blob): Promise<void> {
    try {
      await this.indexedDbService.addItem(blob, ObjectStoreNames.Pictures);
    } catch (error) {
      console.error('Error storing photo:', error);
    }
  }


  private initializeRandomPictureSignal(): void {
    this.randomPictureBlob = toSignal(this.randomPicture$); //toSignal manges subscription and un-subscription
    this.randomPicture = computed(() => {
      if (isValueDefined(this.randomPictureBlob())) return { dataUrl: URL.createObjectURL(this.randomPictureBlob()!) } as Photo;
      return;
    });
  }
}
