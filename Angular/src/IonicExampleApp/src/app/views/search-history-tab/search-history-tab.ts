import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import appSignalStore from 'src/app/store/appSignalStore';

@Component({
  selector: 'appSearchHistoryTab',
  templateUrl: 'search-history-tab.html',
  styleUrls: ['search-history-tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [appSignalStore],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class SearchHistoryTab {
  //public isInvertedColor = computed(() => appSignalStore.getThemeSlice().isInvertedColor);
  private readonly store = inject(appSignalStore);
  public isInvertedColor = computed(() => this.store.isInvertedColor());
  // Assuming `tasks` is a state property
  constructor() {

  }
}
