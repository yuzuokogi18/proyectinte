import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Request } from '../services/request';
import { Prestamos } from '../services/prestamos';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Adminheader } from "../adminheader/adminheader";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgFor,
    NgIf,
    RouterLink,
    Adminheader,
    DatePipe
  ],
  templateUrl: './solicitudes.html',
  styleUrls: ['./solicitudes.css']
})
export class Solicitudes implements OnInit {

  solicitudes: any[] = [];
  pendientes: any[] = [];
  historial: any[] = [];
  cargando: boolean = true;

  indiceInicioPendientes: number = 0;
  indiceInicioHistorial: number = 0;
  readonly ITEMS_POR_PAGINA: number = 5; 

  constructor(
    private requestService: Request,
    private prestamosService: Prestamos,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes(); 
  }

  
  get totalPaginasPendientes(): number {
    return Math.ceil(this.pendientes.length / this.ITEMS_POR_PAGINA);
  }

  get totalPaginasHistorial(): number {
    return Math.ceil(this.historial.length / this.ITEMS_POR_PAGINA);
  }


  siguientePendientes() {
    if (this.indiceInicioPendientes + this.ITEMS_POR_PAGINA < this.pendientes.length) {
      this.indiceInicioPendientes += this.ITEMS_POR_PAGINA;
    }
  }

  anteriorPendientes() {
    if (this.indiceInicioPendientes > 0) {
      this.indiceInicioPendientes -= this.ITEMS_POR_PAGINA;
    }
  }

  siguienteHistorial() {
    if (this.indiceInicioHistorial + this.ITEMS_POR_PAGINA < this.historial.length) {
      this.indiceInicioHistorial += this.ITEMS_POR_PAGINA;
    }
  }

  anteriorHistorial() {
    if (this.indiceInicioHistorial > 0) {
      this.indiceInicioHistorial -= this.ITEMS_POR_PAGINA;
    }
  }

  cargarSolicitudes() {
    this.cargando = true;
 
    this.indiceInicioPendientes = 0;
    this.indiceInicioHistorial = 0;


    this.requestService.getRequests().subscribe({
      next: (data: any[]) => {

        this.solicitudes = data.map(s => ({
          ...s,
          userName: s.userName || `Usuario ID: ${s.userId}`,
          itemName: s.itemName || `Ítem ID: ${s.itemId}`
        }));

        this.pendientes = this.solicitudes.filter(
          s => s.estado?.trim().toLowerCase() === 'pendiente'
        );

        this.historial = this.solicitudes.filter(
          s => s.estado?.trim().toLowerCase() !== 'pendiente'
        );

        this.cargando = false;
        this.cd.detectChanges(); 
      },
      error: err => {
        Swal.fire('Error', 'No se pudieron cargar las solicitudes.', 'error');
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }

  aprobar(s: any) {
    Swal.fire({
      title: '¿Aprobar este préstamo?',
      
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (!res.isConfirmed) return;

      const solicitudActualizada = {
        id: s.id,
        userId: s.userId,
        itemId: s.itemId,
        estado: "Aprobada",
        fechaSolicitud: s.fechaSolicitud,
        fechaRespuesta: new Date().toISOString()
      };

      this.requestService.actualizarRequest(s.id, solicitudActualizada)
        .subscribe({
          next: () => {
            const nuevoPrestamo = {
              requestId: s.id,
              fechaEntrega: new Date().toISOString().split('T')[0],
              fechaDevolucion: null,
              estadoPrestamo: "En posesión",
              observaciones: "Ninguna"
            };

            this.prestamosService.crearPrestamo(nuevoPrestamo)
              .subscribe({
                next: () => {
                  Swal.fire(
                    'Aprobado',
                    `La solicitud #${s.id} fue aprobada y se creó el préstamo.`,
                    'success'
                  );
                  this.cargarSolicitudes(); 
                },
                error: () => {
                  Swal.fire(
                    'Error',
                    'La solicitud se aprobó, pero no se pudo crear el préstamo.',
                    'error'
                  );
                }
              });

          },
          error: () => {
            Swal.fire('Error', 'No se pudo aprobar la solicitud.', 'error');
          }
        });
    });
  }

  rechazar(s: any) {
    Swal.fire({
      title: '¿Rechazar esta solicitud?',
      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (!res.isConfirmed) return;

      const solicitudActualizada = {
        id: s.id,
        userId: s.userId,
        itemId: s.itemId,
        estado: 'Rechazada',
        fechaSolicitud: s.fechaSolicitud,
        fechaRespuesta: new Date().toISOString()
      };

      this.requestService.actualizarRequest(s.id, solicitudActualizada)
        .subscribe({
          next: () => {
            Swal.fire(
              'Rechazada',
              `La solicitud #${s.id} fue rechazada.`,
              'info'
            );
            this.cargarSolicitudes(); 
          },
          error: () => {
            Swal.fire('Error', 'No se pudo rechazar la solicitud.', 'error');
          }
        });
    });
  }
}