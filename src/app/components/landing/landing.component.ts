import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  obras = signal([
    { id: 1, nombre: 'Casa en Col. Roma', avance: 75 },
    { id: 2, nombre: 'Departamento en Polanco', avance: 40 },
    { id: 3, nombre: 'Oficina en Reforma', avance: 90 },
  ]);

  tieneObras = computed(() => this.obras().length > 0);

  constructor(private router: Router) {}

  seleccionarObra(id: number) {
    // Aquí redirigirías a la vista de detalles de la obra seleccionada.
    console.log(`Seleccionar obra con id: ${id}`);
  }

  crearNuevaCotizacion() {
    this.router.navigate(['/crear-cotizacion']);
  }

}
