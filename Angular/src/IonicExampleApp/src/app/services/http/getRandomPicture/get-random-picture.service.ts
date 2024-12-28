import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Endpoints } from 'src/environments/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetRandomPictureService {
  constructor(private httpService: HttpService) { }

  public getPicture(width: number = 500, height: number = 500): Observable<Blob> {
    try {
      const urlIDs = [width.toString(), height.toString()];
      console.log('Getting random image with width: ' + width + ' and height: ' + height, urlIDs);
      return this.httpService.httpGetBlob<undefined>(Endpoints.GetPicsumRandomPhoto, urlIDs);

    } catch (error) {
      console.log('Failed to get random image: ' + error);
      throw new Error("Failed to get random image: " + error);

    }
  }
}
