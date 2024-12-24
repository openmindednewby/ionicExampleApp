import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'appSearchHistoryTab',
  templateUrl: 'search-history-tab.html',
  styleUrls: ['search-history-tab.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class SearchHistoryTab {
  constructor() { }
}
