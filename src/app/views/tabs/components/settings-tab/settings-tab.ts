import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import appSignalStore from 'src/app/store/appSignalStore';
import { Header } from "../header/header";

@Component({
  selector: 'appSettingsTab',
  templateUrl: 'settings-tab.html',
  styleUrls: ['settings-tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, Header],
})
export class SettingsTab {
  private readonly store;
  public titleColor = computed(() => this.store.titleColor());

  constructor() {
    this.store = inject(appSignalStore);
  }

  public setHeaderColor(color: string): void {
    this.store.updateTitleColor(color);
  }
}
