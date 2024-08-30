import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';

// interface Actividad {
//   id: number;
//   nombre: string;
//   meta: number;
//   avance: number;
// }

interface Actividad {
  id: number;
  nombre: string;
  metrosTotales: number;
  metrosAvanzados: number;
  expanded: boolean
}

interface Obra {
  nombre: string;
  actividades: Actividad[];
}

@Component({
  selector: 'app-avance',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './avance.component.html',
  styleUrl: './avance.component.css',
})
export class AvanceComponent {
  nombreObra: WritableSignal<string> = signal('Nombre de la Obra');
  actividades: WritableSignal<Actividad[]> = signal([
    { id: 1, nombre: 'Levantar Barda', metrosTotales: 100, metrosAvanzados: 0, expanded: true },
    { id: 2, nombre: 'Cimentación', metrosTotales: 50, metrosAvanzados: 0, expanded: true },
    // Más actividades
  ]);

  obra: WritableSignal<Obra> = signal({
    nombre: 'Remodelacion',
    actividades: [
      {
        id: 1,
        nombre: 'Levantar Barda',
        metrosTotales: 100,
        metrosAvanzados: 50,
        expanded: true
      },
      { id: 2, nombre: 'Cimentación', metrosTotales: 50, metrosAvanzados: 0, expanded: true },
    ],
  });

  updateAvance(actividadId: number, event: Event) {
    const nuevoAvance = +(event.target as HTMLInputElement).value;
    this.actividades.update((actividades) =>
      actividades.map((actividad) =>
        actividad.id === actividadId
          ? { ...actividad, avance: nuevoAvance }
          : actividad
      )
    );
  }

  calcularPorcentaje(actividadId: number): number {
    const actividad = this.actividades().find((act) => act.id === actividadId);
    return actividad
      ? (actividad.metrosAvanzados / actividad.metrosTotales) * 100
      : 0;
  }

  actualizarAvance(actividadIndex: number, metros: number): void {
    const actividad = this.obra().actividades[actividadIndex];
    if (
      actividad.metrosAvanzados + metros <= actividad.metrosTotales &&
      actividad.metrosAvanzados + metros >= 0
    ) {
      actividad.metrosAvanzados += metros;
      this.obra.update((currentObra) => ({
        ...currentObra,
        actividades: currentObra.actividades.map((act, i) =>
          i === actividadIndex ? actividad : act
        ),
      }));
    }
  }

  expanded: WritableSignal<boolean[]> = signal([false, false]);

  toggleActividad(index: number): void {
    this.expanded.update((currentExpanded) => {
      const newExpanded = [...currentExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  }

  calcularPorcentajeTotal(): number {
    let totalMetros = 0;
    let totalAvanzado = 0;

    // Obtén el valor actual de la señal
    const actividadesActuales = this.actividades();

    actividadesActuales.forEach(actividad => {
      totalMetros += actividad.metrosTotales;
      totalAvanzado += actividad.metrosAvanzados;
    });

    return 75//totalMetros === 0 ? 0 : Math.round((totalAvanzado / totalMetros) * 100);
  }

  getStrokeDasharray(): string {
    const porcentaje = this.calcularPorcentajeTotal();
    return `${porcentaje} ${100 - porcentaje}`;
  }
}
