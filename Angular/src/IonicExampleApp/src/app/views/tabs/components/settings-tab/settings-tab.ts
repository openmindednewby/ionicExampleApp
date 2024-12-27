import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import appSignalStore from 'src/app/store/appSignalStore';

@Component({
  selector: 'appSettingsTab',
  templateUrl: 'settings-tab.html',
  styleUrls: ['settings-tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [appSignalStore],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class SettingsTab {
  private readonly store = inject(appSignalStore);
  public titleColor = computed(() => this.store.titleColor());

  constructor() { }

  public setHeaderColor(color: string): void {
    this.store.updateTitleColor(color);
  }
}
