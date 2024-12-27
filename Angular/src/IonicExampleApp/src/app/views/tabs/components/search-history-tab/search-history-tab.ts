import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import appSignalStore from 'src/app/store/appSignalStore';

@Component({
  selector: 'appSearchHistoryTab',
  templateUrl: 'search-history-tab.html',
  styleUrls: ['search-history-tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [appSignalStore],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class SearchHistoryTab {
  private readonly store = inject(appSignalStore);
  public isInvertedColor = computed(() => this.store.isInvertedColor());
  public titleColor = signal('color: black');

  constructor() { }
// Method to update the header color
  setHeaderColor(color: string): void {
    this.titleColor.set(color);
  }
}
