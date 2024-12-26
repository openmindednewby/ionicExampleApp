import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import appSignalStore from 'src/app/store/appSignalStore';

@Component({
  selector: 'appSearchHistoryTab',
  templateUrl: 'search-history-tab.html',
  styleUrls: ['search-history-tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class SearchHistoryTab {
  public tasks = appSignalStore;
  //public isInvertedColor = computed(() => appSignalStore..getThemeSlice().isInvertedColor);

  // Assuming `tasks` is a state property
  constructor() {
    console.log('isInvertedColor', this.isInvertedColor);
  }
}
