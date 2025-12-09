import { Component, Output, EventEmitter } from '@angular/core';
import { Item } from '../services/item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-createart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './createart.html',
  styleUrl: './createart.css',
})
export class Createart {
  @Output() close = new EventEmitter<void>();
  @Output() articuloCreado = new EventEmitter<any>();

  form = {
    nombre: '',
    categoriaId: 1,   // Ahora inicia en Electrónico
    descripcion: '',
    imagen: '',
    estado: 'Disponible',
    stock: 1,
  };

  constructor(private item: Item) {}

  closeModal() {
    this.close.emit();
  }

  agregarArticulo() {
    console.log("Enviando datos:", this.form);

    this.item.crearItem(this.form).subscribe({
      next: (res) => {
        console.log("✅ Artículo creado:", res);
        this.articuloCreado.emit(res);
        this.closeModal();
      },
      error: (err) => {
        console.error("❌ Error al crear artículo", err);
      }
    });
  }
}
