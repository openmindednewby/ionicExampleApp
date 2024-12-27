import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonFab, IonIcon, IonCard, IonList, IonItem, IonInput
} from '@ionic/angular/standalone';
import { IndexedDbService, ObjectStoreNames } from 'src/app/services/indexed-db/indexed-db.service';
import { CommonModule } from '@angular/common';
import { isValueDefined } from 'src/app/utils/tools/isValueDefined';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'appSearchPicturesTab',
  templateUrl: 'search-pictures-tab.html',
  styleUrls: ['search-pictures-tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, IonList, IonItem, IonInput, IonCard, CommonModule, IonButton, IonFab, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class SearchPicturesTab {
  public pictureId = signal<number | undefined>(undefined);
  private currentPhoto = signal<Blob | undefined>(undefined);
  public photoURL = computed(() => this.generatePhotoURL());
  public showCard = computed(() => isValueDefined(this.photoURL()));
  public isGetImageDisabled = computed(() => !isValueDefined(this.pictureId()));


  constructor(
    private indexedDbService: IndexedDbService,
  ) { }

  public onInputIdChange(value: number): void {
    this.pictureId.set(value);
  }

  public downloadPicture(): void {
    const link = document.createElement('a');
    link.href = this.photoURL()!;
    link.download = 'picture.jpg';
    link.click();
  }

  public async getImage(): Promise<void> {
    const photo = await this.indexedDbService.getItem<Blob>(this.pictureId()!, ObjectStoreNames.Pictures);
    this.currentPhoto.set(photo);
  }

  private generatePhotoURL(): string | undefined {
    const photo = this.currentPhoto();
    if (isValueDefined(photo)) return URL.createObjectURL(photo!);
    return undefined;
  }
}
