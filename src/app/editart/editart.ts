import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 

@Component({
    selector: 'app-editart',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './editart.html',
    styleUrls: ['./editart.css']
})
export class Editart {

    @Input() articulo: any = {};
    @Output() close = new EventEmitter<void>();
    @Output() articuloEditado = new EventEmitter<any>();

    guardarCambios() {

        this.articulo.stock = Number(this.articulo.stock);
        Swal.fire({
            title: '¿Estás seguro de editar este artículo?',
            text: `Se actualizarán los datos de "${this.articulo.nombre}".`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, editar',
            cancelButtonText: 'No, cancelar',
            confirmButtonColor: '#FFD9AB',
            cancelButtonColor: '#6b7280',
            customClass: {
                confirmButton: 'text-gray-800' 
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.articuloEditado.emit(this.articulo);
            }
        });
    }

    cerrar() {
        this.close.emit();
    }
}