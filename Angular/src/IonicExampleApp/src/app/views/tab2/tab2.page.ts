import { Component, computed, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFab, IonIcon, IonImg } from '@ionic/angular/standalone';
import { IndexedDbService, ObjectStoreNames } from 'src/app/services/indexed-db/indexed-db.service';
import { CommonModule } from '@angular/common';
import { isValueDefined } from 'src/app/utils/tools/isValueDefined';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [CommonModule, IonButton, IonFab, IonImg, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab2Page {
  private currentPhoto = signal<Blob | undefined>(undefined);
  public photoURL = computed(() => {
    const photo = this.currentPhoto();
    if (isValueDefined(photo)) return URL.createObjectURL(photo!);
    return;
  });

  constructor(
    private indexedDbService: IndexedDbService,
  ) { }

  public async getImage(id: number): Promise<void> {
    const photo = await this.indexedDbService.getItem<Blob>(id, ObjectStoreNames.Pictures);
    this.currentPhoto.set(photo);
  }
}
