import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { User } from '../services/user';
import { UserRoles } from '../services/user-roles';
import { Adminheader } from '../adminheader/adminheader';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, Adminheader],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css'],
})
export class Usuarios implements OnInit {

  usuarios: any[] = [];
  usuariosPaginados: any[] = [];

  paginaActual = 1;
  usuariosPorPagina = 10;
  totalPaginas = 1;

  constructor(
    private userService: User,
    private userRolesService: UserRoles
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        console.log('Usuarios cargados:', data);

        this.usuarios = data.map(u => ({
          ...u,
          rol: this.normalizarRol(u.rol)
        }));

        this.totalPaginas = Math.ceil(this.usuarios.length / this.usuariosPorPagina);
        this.actualizarPaginacion();
      },
      error: (err) => console.error(err),
    });
  }

  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
    this.usuariosPaginados = this.usuarios.slice(inicio, inicio + this.usuariosPorPagina);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }

  normalizarRol(rol: string): string {
    if (!rol) return 'USER';
    const r = rol.toLowerCase();
    if (r.includes('admin')) return 'ADMIN';
    return 'USER';
  }

  confirmarCambioRol(usuario: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas convertir a ${usuario.nombre} en administrador?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, convertir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cambiarRol(usuario.id, 1);
      }
    });
  }

  cambiarRol(idUsuario: number, rolId: number) {
    this.userRolesService.assignRole(idUsuario, rolId).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Rol actualizado',
          text: 'El usuario ahora es ADMIN',
          timer: 1500,
          showConfirmButton: false
        });

        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error al actualizar rol', err);
        Swal.fire('Error', 'No se pudo actualizar el rol', 'error');
      },
    });
  }
}
