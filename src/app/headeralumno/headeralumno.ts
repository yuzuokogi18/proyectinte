import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Route } from 'lucide';

@Component({
  selector: 'app-headeralumno',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './headeralumno.html',
  styleUrl: './headeralumno.css',
})
export class Headeralumno {
 @Input() vistaActual!: string;
  @Output() onCambiarVista = new EventEmitter<string>();
  @Output() onCerrarSesion = new EventEmitter<void>();

  cambiarVista(vista: string) {
    this.onCambiarVista.emit(vista);
  }

  confirmarCerrarSesion() {
    this.onCerrarSesion.emit();
  }
}
