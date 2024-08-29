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
        path: 'crear-cotizacion',
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
    ],
  },
];
