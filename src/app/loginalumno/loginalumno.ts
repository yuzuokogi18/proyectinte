import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginalumnoService } from '../services/loginalumno';

@Component({
  selector: 'app-loginalumno',
  imports: [NgIf, RouterLink, FormsModule],
  templateUrl: './loginalumno.html',
  styleUrls: ['./loginalumno.css'],
})
export class Loginalumno {

  showPassword = false;
  correo: string = '';
  password: string = '';

  constructor(
    private loginService: LoginalumnoService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const data = { correo: this.correo, password: this.password };

    this.loginService.login(data).subscribe({
      next: (resp: any) => {

        console.log('RESPUESTA LOGIN:', resp); 

        const userId = resp.userId;
        const nombre = resp.nombre;
        const rol = resp.rol;

        if (!userId) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró el ID del usuario',
            confirmButtonColor: '#ef4444'
          });
          return;
        }
        localStorage.setItem('userId', userId.toString());
        localStorage.setItem('userName', nombre);
        localStorage.setItem('userRole', rol);
        localStorage.setItem('token', resp.token);

        Swal.fire({
          icon: 'success',
          title: 'Bienvenido!',
          text: `Hola ${nombre}`,
          confirmButtonColor: '#f97316'
        });
        if (rol === 'Alumno') {
          this.router.navigate(['/homealumno']);
        } else if (rol === 'Administrador') {
          this.router.navigate(['/administradorhome']);
        } else {
          this.router.navigate(['/landing']);
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error?.error || 'Credenciales incorrectas',
          confirmButtonColor: '#ef4444'
        });
      }
    });
  }
}
