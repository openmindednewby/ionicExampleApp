import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import appSignalStore from 'src/app/store/appSignalStore';

@Component({
  selector: 'appHeader',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule, IonHeader, IonToolbar, IonTitle],
})
export class Header {
  public title = input<string>('');

  private readonly store = inject(appSignalStore);
  public titleColor = computed(() => {
    const color =  this.store.titleColor();
    console.log('color: ', color);
    return color;
  });

  ngOnChanges(changes: any): void {
    console.log('Changes detected:', changes);
    console.log('titleColor:', this.titleColor());
  }
}
