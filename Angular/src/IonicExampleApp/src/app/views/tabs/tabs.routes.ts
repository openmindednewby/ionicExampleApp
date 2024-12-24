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
          import('../take-picture-tab/take-picture-tab').then((m) => m.TakePictureTab),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../search-pictures-tab/search-pictures-tab').then((m) => m.SearchPicturesTab),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../search-history-tab/search-history-tab').then((m) => m.SearchHistoryTab),
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
