import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent, // Landing page en la raíz
  },
  {
    path: 'app',
    component: HomeComponent, // El componente que maneja la estructura principal después de la landing
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
        pathMatch: 'full'  // Asegura que se muestre DashboardComponent por defecto
      },
      {
        path: 'cotizaciones',
        loadComponent: () =>
          import('./components/cotizacion-list/cotizacion-list.component').then(
            (c) => c.CotizacionListComponent
          ),
      },
      {
        path: 'cotizacion',
        loadComponent: () =>
          import('./components/cotizacion/cotizacion.component').then(
            (c) => c.CotizacionComponent
          ),
      },
      {
        path: 'cotizacion/:id',
        loadComponent: () =>
          import('./components/cotizacion/cotizacion.component').then(
            (c) => c.CotizacionComponent
          ),
      },
      {
        path: 'avance',
        loadComponent: () =>
          import('./components/avance/avance.component').then(
            (c) => c.AvanceComponent
          ),
      },
      {
        path: 'avance/:id',
        loadComponent: () =>
          import('./components/avance/avance.component').then(
            (c) => c.AvanceComponent
          ),
      },
    ],
  },
];
