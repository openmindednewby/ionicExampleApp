import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('./components/take-picture-tab/take-picture-tab').then((m) => m.TakePictureTab),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('./components/search-pictures-tab/search-pictures-tab').then((m) => m.SearchPicturesTab),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('./components/settings-tab/settings-tab').then((m) => m.SettingsTab),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
