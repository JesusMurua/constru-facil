import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadComponent: () =>
      import('./components/landing/landing.component').then(
        (c) => c.LandingComponent
      ),
  },
  {
    path: 'crear-cotizacion',
    loadComponent: () =>
      import('./components/cotizacion/cotizacion.component').then(
        (c) => c.CotizacionComponent
      ),
  },
  {
    path: 'avance',
    loadComponent: () =>  import('./components/avance/avance.component').then(
      (c) => c.AvanceComponent
    ),
  }
];
