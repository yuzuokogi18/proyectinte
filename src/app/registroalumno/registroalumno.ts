import { Component } from '@angular/core';
import { RegistroalumnoService } from '../services/registroalumno';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registroalumno',
  imports: [CommonModule, FormsModule],
  templateUrl: './registroalumno.html',
  styleUrl: './registroalumno.css',
})
export class Registroalumno {
  showPassword = false;

  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  password: string = '';

  constructor(
    private registroService: RegistroalumnoService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  registrar() {
    const data = {
      nombre: this.nombre + ' ' + this.apellido,
      correo: this.correo,
      password: this.password,
      rol: 'Alumno'
    };

    this.registroService.registrarAlumno(data).subscribe({
      next: (resp) => {
        console.log('Registro exitoso', resp);

        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El alumno fue registrado correctamente.',
          confirmButtonColor: '#f97316'
        }).then(() => {
          this.router.navigate(['/loginalumno']); 
        });

        this.nombre = '';
        this.apellido = '';
        this.correo = '';
        this.password = '';
      },
      error: (err) => {
        console.error('Error al registrar', err);

        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'Hubo un problema al registrar al alumno.',
          confirmButtonColor: '#dc2626'
        });
      }
    });
  }
}
