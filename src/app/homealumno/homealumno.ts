import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { Item } from '../services/item';
import { Prestamos } from '../services/prestamos';
import { Request } from '../services/request';
import { Misprestamosalumno } from "../misprestamosalumno/misprestamosalumno";
import { Headeralumno } from '../headeralumno/headeralumno';

@Component({
  selector: 'app-homealumno',
  standalone: true,
  imports: [CommonModule, FormsModule, Misprestamosalumno, Headeralumno],
  templateUrl: './homealumno.html',
  styleUrls: ['./homealumno.css'],
})
export class Homealumno implements OnInit {

  vistaActual: 'articulos' | 'prestamos' = 'articulos';

  busqueda: string = '';
  categoriaSeleccionada: string = '';

  articulos: any[] = [];


  articulosPorPagina: number = 8; 
  paginaActual: number = 1;

  userId: number | null = null;
  userName: string = '';
  userRole: string = '';

  constructor(
    private itemService: Item,
    private prestamos: Prestamos,
    private request: Request,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.validarSesion();
    this.obtenerArticulos();
  }

  validarSesion() {
    const id = localStorage.getItem('userId');
    const nombre = localStorage.getItem('userName');
    const rol = localStorage.getItem('userRole');

    if (!id || !rol) {
      Swal.fire({
        icon: 'error',
        title: 'Error de sesión',
        text: 'No se encontró tu información de usuario',
        confirmButtonColor: '#ef4444'
      }).then(() => {
        window.location.href = '/loginalumno';
      });
      return;
    }

    this.userId = Number(id);
    this.userName = nombre || '';
    this.userRole = rol;
  }

  cambiarVista(vista: 'articulos' | 'prestamos') {
    this.vistaActual = vista;
    if (vista === 'articulos') {
      this.obtenerArticulos();
    }
  }

  obtenerArticulos() {
    this.itemService.getItems().subscribe({
      next: (data) => {
        console.log('Artículos desde backend:', data);
        this.articulos = data;
        this.paginaActual = 1; 
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar artículos:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los artículos'
        });
      }
    });
  }

  get articulosBaseFiltrados() {
    return this.articulos.filter(item => {
      const texto = this.busqueda.toLowerCase();

      const coincideNombre =
        item.nombre?.toLowerCase().includes(texto) ||
        item.descripcion?.toLowerCase().includes(texto);

      const coincideCategoria =
        !this.categoriaSeleccionada ||
        item.categoriaId == Number(this.categoriaSeleccionada);

      return coincideNombre && coincideCategoria;
    });
  }


  get articulosFiltrados() {
    const articulosBase = this.articulosBaseFiltrados;
    const inicio = (this.paginaActual - 1) * this.articulosPorPagina;
    const fin = inicio + this.articulosPorPagina;
    return articulosBase.slice(inicio, fin);
  }
  get totalPaginas(): number {
    return Math.ceil(this.articulosBaseFiltrados.length / this.articulosPorPagina);
  }

  cambiarPagina(delta: number) {
    const nuevaPagina = this.paginaActual + delta;
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  confirmarCerrarSesion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cerrar tu sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = '/';
      }
    });
  }

  solicitar(item: any) {
    if (!this.userId) {
      Swal.fire({
        icon: 'error',
        title: 'Error de sesión',
        text: 'No se encontró tu información de usuario'
      });
      return;
    }

    const nuevaRequest = {
      userId: this.userId,
      itemId: item.id,
      estado: 'Pendiente'
    };

    this.request.crearRequest(nuevaRequest).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Solicitud enviada',
          text: `Solicitud creada con ID: ${res.id}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => {
        console.error("Error al crear solicitud:", err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar la solicitud',
          icon: 'error'
        });
      }
    });
  }

  verDetalles(item: any) {
    Swal.fire({
      title: item.nombre,
      html: `
      <div class="text-left space-y-3">

        <div style="display:flex; justify-content:center;">
          <img 
            src="${item.imagen ? item.imagen : 'assets/proyector.png'}"
            style="width:200px; height:120px; object-fit:contain; margin-bottom:10px;"
          />
        </div>

        <p><strong>Categoría:</strong> ${
          item.categoriaId == 1 ? 'Electrónica' :
          item.categoriaId == 2 ? 'Laboratorio' :
          item.categoriaId == 3 ? 'Uso escolar' : 'Sin categoría'
        }</p>

        <p><strong>Descripción:</strong> ${item.descripcion}</p>

        <p><strong>Estado:</strong> 
          <span style="
            padding: 4px 10px;
            border-radius: 20px;
            background-color: ${
              item.estado === 'Disponible' ? '#4ade80' :
              item.estado === 'Prestado' ? '#d1d5db' :
              item.estado === 'Mantenimiento' ? '#fde047' : '#fca5a5'
            };
            color: black;
            font-weight: 600;
          ">
            ${item.estado}
          </span>
        </p>

      </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Solicitar',
      cancelButtonText: 'Cerrar'
    }).then(res => {
      if (res.isConfirmed) {
        this.solicitar(item);
      }
    });
  }

}