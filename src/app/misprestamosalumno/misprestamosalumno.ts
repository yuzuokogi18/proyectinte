import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Headeralumno } from '../headeralumno/headeralumno';
import { Request } from '../services/request';

@Component({
  selector: 'app-misprestamosalumno',
  standalone: true,
  imports: [FormsModule, CommonModule, Headeralumno],
  templateUrl: './misprestamosalumno.html',
  styleUrl: './misprestamosalumno.css',
})
export class Misprestamosalumno implements OnInit {

  solicitudes: any[] = [];

  constructor(private request: Request) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId || userId === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró el usuario logueado'
      });
      return;
    }
    this.getSolicitudes(userId);
  }

  getSolicitudes(userId: number) {
    this.request.getRequestsByUser(userId).subscribe({
      next: (data: any[]) => {
        if (!data || data.length === 0) return;

        this.solicitudes = data.map((r: any) => ({
          id: r.id,
          nombre: r.itemName || "Equipo sin nombre",
          categoria: r.categoria || "", 
          imagen: "assets/proyector.png",
          estado: r.estado,
          mensaje:
            r.estado === "Aprobado"
              ? "Tu solicitud fue aprobada ✅"
              : r.estado === "Pendiente"
              ? "Tu solicitud está en revisión."
              : "", 
          fechaSolicitud: r.fechaSolicitud
            ? new Date(r.fechaSolicitud).toLocaleString()
            : "No registrada",
          fechaRespuesta: r.fechaRespuesta
            ? new Date(r.fechaRespuesta).toLocaleString()
            : null
        }));
      },
      error: (err) => {
        console.error("❌ ERROR al obtener solicitudes:", err);
      }
    });
  }

  cancelarSolicitud(solicitud: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cancelar tu solicitud de préstamo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Solicitud cancelada',
          text: 'Tu solicitud de préstamo ha sido cancelada.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
