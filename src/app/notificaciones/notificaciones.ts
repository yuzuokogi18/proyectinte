import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Notificacionesalumno, Notificacion } from '../services/notificacionesalumno';
import { forkJoin } from 'rxjs';
import { Headeralumno } from '../headeralumno/headeralumno';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, Headeralumno],
  templateUrl: './notificaciones.html',
  styleUrls: ['./notificaciones.css'],
})
export class Notificaciones implements OnInit {

  notificaciones: Notificacion[] = [];
  userId = 1; 

  constructor(private notiService: Notificacionesalumno) {}

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  cargarNotificaciones() {
    this.notiService.getByUser(this.userId).subscribe({
      next: (data) => {
        this.notificaciones = data;
      },
      error: (err) => {
        console.error('Error al cargar notificaciones', err);
      }
    });
  }

  get notificacionesSinLeer(): number {
    return this.notificaciones.filter(n => !n.leida).length;
  }

  marcarComoLeida(n: Notificacion) {
    this.notiService.marcarComoLeida(n.id).subscribe({
      next: () => n.leida = true,
      error: (err) => console.error('Error al marcar notificación como leída', err)
    });
  }


  marcarTodasComoLeidas() {
    const observables = this.notificaciones
      .filter(n => !n.leida)
      .map(n => this.notiService.marcarComoLeida(n.id));

    if (observables.length === 0) return;

    forkJoin(observables).subscribe({
      next: () => {
        this.notificaciones.forEach(n => n.leida = true);
      },
      error: (err) => console.error('Error al marcar todas las notificaciones como leídas', err)
    });
  }
}
