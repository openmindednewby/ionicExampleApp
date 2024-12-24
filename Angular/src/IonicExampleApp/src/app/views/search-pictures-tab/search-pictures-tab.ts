import { Component, computed, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFab, IonIcon, IonCard } from '@ionic/angular/standalone';
import { IndexedDbService, ObjectStoreNames } from 'src/app/services/indexed-db/indexed-db.service';
import { CommonModule } from '@angular/common';
import { isValueDefined } from 'src/app/utils/tools/isValueDefined';

@Component({
  selector: 'appSearchPicturesTab',
  templateUrl: 'search-pictures-tab.html',
  styleUrls: ['search-pictures-tab.scss'],
  imports: [IonCard, CommonModule, IonButton, IonFab, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class SearchPicturesTab {
  private currentPhoto = signal<Blob | undefined>(undefined);
  public photoURL = computed(() => {
    const photo = this.currentPhoto();
    if (isValueDefined(photo)) return URL.createObjectURL(photo!);
    return;
  });
  public showCard = computed(() => isValueDefined(this.photoURL()));

  constructor(
    private indexedDbService: IndexedDbService,
  ) { }

  public downloadPicture(): void {
    const link = document.createElement('a');
    link.href = this.photoURL()!;
    link.download = 'picture.jpg';
    link.click();
  }

  public async getImage(id: number): Promise<void> {
    const photo = await this.indexedDbService.getItem<Blob>(id, ObjectStoreNames.Pictures);
    this.currentPhoto.set(photo);
  }
}
