import { Injectable, signal, Signal } from '@angular/core';
import { HttpService } from '../http.service';
import { Endpoints } from 'src/environments/endpoints';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class GetRandomImageService {

  constructor(private http: HttpService) { }

  public getPicture(width: number = 500, height: number = 500): Signal<Blob | undefined> {
    try {
      const urlIDs = [width.toString(), height.toString()];
      const picture$ = this.http.httpGet<undefined, Blob>(Endpoints.GetPicsumRandomPhoto, urlIDs)

      return toSignal<Blob>(picture$);
    } catch (error) {
      console.log('Failed to get random image: ' + error);
      return signal<Blob | undefined>(undefined);
    }
  }
}
