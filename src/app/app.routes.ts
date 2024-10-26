import { Routes } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HeroListComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: '**', component: NotFoundComponent },

];
