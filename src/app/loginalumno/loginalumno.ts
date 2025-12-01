import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginalumnoService } from '../services/loginalumno';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginalumno',
  imports: [NgIf, RouterLink, FormsModule],
  templateUrl: './loginalumno.html',
  styleUrl: './loginalumno.css',
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

  // 📌 Método login actualizado con validación de roles
  login() {
    const data = {
      correo: this.correo,
      password: this.password
    };

    this.loginService.login(data).subscribe({
      next: (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido!',
          text: 'Login exitoso',
          confirmButtonColor: '#f97316'
        });

        // 🔥 Validamos el rol que devuelve el backend
        if (resp.rol === 'Alumno') {
          this.router.navigate(['/homealumno']);
        } else if (resp.rol === 'Administrador') {
          this.router.navigate(['/administradorhome']);
        } else {
          this.router.navigate(['/home']);
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
