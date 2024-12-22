import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonIcon, IonButton, IonImg } from '@ionic/angular/standalone';
import { CameraServiceService } from '../services/native/camera-service/camera-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cameraRecordingTab',
  templateUrl: 'camera-recording-tab.page.html',
  styleUrls: ['camera-recording-tab.page.scss'],
  imports: [CommonModule, IonImg, IonButton, IonFab, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {
  public currentPhotoWebviewPath: string | undefined;

  constructor(private cameraServiceService: CameraServiceService) { }

  public async takePicture(): Promise<void> {
    const currentPhoto = await this.cameraServiceService.takePhoto();
    this.currentPhotoWebviewPath = currentPhoto.webPath;
  }


}
