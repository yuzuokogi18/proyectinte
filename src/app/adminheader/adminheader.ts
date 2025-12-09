import { Component } from '@angular/core';
import { RouterLink, Router ,RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-adminheader',
  imports: [RouterLink, CommonModule,RouterLinkActive],
  templateUrl: './adminheader.html',
  styleUrls: ['./adminheader.css'],
})
export class Adminheader {

  constructor(private router: Router) {}
irUsuarios() {
  this.router.navigate(['/usuarios']);
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
        this.router.navigate(['/']);
      }
    });
  }
}
