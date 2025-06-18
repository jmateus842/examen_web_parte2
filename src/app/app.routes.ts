import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Galaxies } from './pages/galaxies/galaxies';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'galaxies', component: Galaxies },
  { path: '**', redirectTo: '' }
];
