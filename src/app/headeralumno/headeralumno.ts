import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';


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

  constructor(private router: Router) {} // ← NECESARIO para navegar

  cambiarVista(vista: string) {
    this.onCambiarVista.emit(vista);
  }

  cerrarSesion() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Se cerrará la sesión actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.onCerrarSesion.emit();   // ← emite al padre (opcional)
        this.router.navigate(['/']);  // ← vuelve al login
      }
    });
  }
}