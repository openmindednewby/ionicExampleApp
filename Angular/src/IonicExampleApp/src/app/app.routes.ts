import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/tabs/tabs.routes').then((m) => m.routes),
  },
];
