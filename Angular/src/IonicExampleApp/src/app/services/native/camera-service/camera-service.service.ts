import { Injectable } from '@angular/core';
import { Camera, Photo } from '@capacitor/camera';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CameraServiceService {

  constructor() { }

  public async takePhoto(): Promise<Photo> {
    // Take a photo
    return await Camera.getPhoto({
      resultType: environment.nativeServices.camera.resultType,
      source: environment.nativeServices.camera.source,
      quality: environment.nativeServices.camera.quality
    });
  }
}
