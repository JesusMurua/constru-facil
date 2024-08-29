import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

export interface Actividad {
  nombre: string;
  precioPorMetro: number;
  metrosTotales: number;
  totalCosto: number;
}

interface Material {
  nombre: string;
  cantidad: number;
  unidad: string;
  costoUnitario: number;
  costoTotal: number;
}

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css',
})
export class CotizacionComponent {
  nombreProyecto = signal<string>('');
  ubicacion = signal<string>('');
  fechaInicio = signal<string>('');
  fechaFin = signal<string>('');
  descripcion = signal<string>('');

  nombreCliente = signal<string>('');
  contactoCliente = signal<string>('');

  manoObra = signal<string>('');
  actividades = signal<Actividad[]>([
    {
      nombre: 'Limpieza de Terreno',
      precioPorMetro: 50,
      metrosTotales: 100,
      totalCosto: 5000,
    },
    {
      nombre: 'Cimientos',
      precioPorMetro: 200,
      metrosTotales: 150,
      totalCosto: 30000,
    },
  ]);
  totalManoObra = signal<number>(0);

  materiales = signal<Material[]>([
    {
      nombre: 'Cemento',
      cantidad: 12,
      unidad: 'saco',
      costoUnitario: 100,
      costoTotal: 1200,
    },
  ]);
  totalMateriales = signal<number>(0);

  isModalOpen = false;
  nuevaActividad = { nombre: '', precioMetro: 0, totalMetros: 0 };

  constructor() {}

  updateField(field: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    switch (field) {
      case 'nombreProyecto':
        this.nombreProyecto.set(inputElement.value);
        break;
      case 'ubicacion':
        this.ubicacion.set(inputElement.value);
        break;
      case 'nombreCliente':
        this.nombreCliente.set(inputElement.value);
        break;
      case 'contactoCliente':
        this.contactoCliente.set(inputElement.value);
        break;
      default:
        break;
    }
  }

  guardarCotizacion() {
    const cotizacion = {
      nombreProyecto: this.nombreProyecto(),
      ubicacion: this.ubicacion(),
      fechaInicio: this.fechaInicio(),
      fechaFin: this.fechaFin(),
      descripcion: this.descripcion(),
    };
    console.log('Cotización guardada:', cotizacion);
    // Aquí iría la lógica para enviar los datos al servidor o hacer algo con ellos
  }

  cancelar() {
    // Lógica para cancelar o resetear el formulario
    this.nombreProyecto.set('');
    this.ubicacion.set('');
    this.fechaInicio.set('');
    this.fechaFin.set('');
    this.descripcion.set('');
  }

  openModal() {
    this.isModalOpen = true;
  }

  openMaterialModal(): void {
    // Implementa la lógica para abrir el modal de materiales aquí
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // agregarActividad() {
  //   this.actividades.push({
  //     ...this.nuevaActividad,
  //     precioPorMetro: 0,
  //     metrosTotales: 0,
  //     totalCosto: 0,
  //   });
  //   this.closeModal();
  //   this.nuevaActividad = { nombre: '', precioMetro: 0, totalMetros: 0 };
  // }

  calculateTotalManoObra(): void {
    const total = this.actividades().reduce(
      (sum, actividad) => sum + actividad.totalCosto,
      0
    );
    this.totalManoObra.set(total);
  }

  calcularTotal(actividad: Actividad): number {
    return actividad.precioPorMetro * actividad.metrosTotales;
  }

  calculateTotalMateriales(): void {
    const total = this.materiales().reduce(
      (sum, material) => sum + material.costoTotal,
      0
    );
    this.totalMateriales.set(total);
  }
}
