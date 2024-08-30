import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
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
