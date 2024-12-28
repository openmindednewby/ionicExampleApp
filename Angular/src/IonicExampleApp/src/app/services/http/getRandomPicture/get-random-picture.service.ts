import { Injectable, signal, Signal } from '@angular/core';
import { HttpService } from '../http.service';
import { Endpoints } from 'src/environments/endpoints';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetRandomPictureService {
  private pictureSubject = new BehaviorSubject<Blob | undefined>(undefined);
  public picture$ = this.pictureSubject.asObservable();

  constructor(private httpService: HttpService) { }

  public getPicture(width: number = 500, height: number = 500): void {
    try {
      const urlIDs = [width.toString(), height.toString()];
      this.httpService.httpGet<undefined, Blob>(Endpoints.GetPicsumRandomPhoto, urlIDs).pipe(
        map(response => {
          this.pictureSubject.next(response);
          return response;
        }));

    } catch (error) {
      console.log('Failed to get random image: ' + error);
    }
  }
}
