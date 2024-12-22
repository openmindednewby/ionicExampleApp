import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonIcon, IonButton } from '@ionic/angular/standalone';
import { CameraServiceService } from '../services/native/camera-service/camera-service.service';

@Component({
  selector: 'app-cameraRecordingTab',
  templateUrl: 'camera-recording-tab.page.html',
  styleUrls: ['camera-recording-tab.page.scss'],
  imports: [IonButton, IonFab, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {

  constructor(private cameraServiceService: CameraServiceService) {}

  public takePicture(): void {
    this.cameraServiceService.takePhoto();
  }
}
