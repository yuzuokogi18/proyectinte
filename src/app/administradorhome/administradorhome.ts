import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Createart } from '../createart/createart';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../services/item';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Adminheader } from '../adminheader/adminheader';
import { Editart } from "../editart/editart";

@Component({
    selector: 'app-administradorhome',
    standalone: true,
    imports: [
        NgFor,
        CommonModule,
        Createart,
        FormsModule,
        RouterLink,
        RouterOutlet,
        Adminheader,
        Editart
    ],
    templateUrl: './administradorhome.html',
    styleUrls: ['./administradorhome.css'],
})
export class Administradorhome implements OnInit {

    vista: 'cards' | 'tabla' = 'cards';

    showModal = false;
    showEditModal = false;

    busqueda: string = '';
    categoriaSeleccionada: string = '';

    articulos: any[] = [];

    articuloSeleccionado: any = null;

    page = 1;
    pageSize = 8;

    pageTabla = 1;
    pageSizeTabla = 10;

    constructor(
        private item: Item,
        private cd: ChangeDetectorRef,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cargarArticulos();
    }

    // ------------------------------------------------------------
    // 🔵 CARGAR ARTÍCULOS
    // ------------------------------------------------------------
    cargarArticulos() {
        this.item.getItems().subscribe({
            next: (data: any) => {
                if (Array.isArray(data)) this.articulos = data;
                else if (data?.items) this.articulos = data.items;
                else this.articulos = [];

                this.cd.detectChanges();
            },
            error: (err) => console.error('Error al cargar artículos:', err),
        });
    }

    // ------------------------------------------------------------
    // 🟢 CREAR ARTÍCULO
    // ------------------------------------------------------------
    agregarArticuloALista(nuevo: any) {
        this.articulos.push({
            id: nuevo.id,
            nombre: nuevo.nombre,
            categoriaId: nuevo.categoriaId,
            descripcion: nuevo.descripcion,
            estado: nuevo.estado,
            imagen: nuevo.imagen || 'assets/default.png',
            stock: nuevo.stock,
        });

        this.cd.detectChanges();
    }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    // ------------------------------------------------------------
    // ✏️ EDITAR ARTÍCULO (ABRIR MODAL)
    // ------------------------------------------------------------
    abrirEditModal(articulo: any) {
        this.articuloSeleccionado = { ...articulo };
        this.showEditModal = true;
    }

    cerrarEditModal() {
        this.showEditModal = false;
        this.articuloSeleccionado = null;
    }

    // ------------------------------------------------------------
    // 🟠 ACTUALIZAR ARTÍCULO
    // ------------------------------------------------------------
    actualizarArticulo(articuloActualizado: any) {

        if (!articuloActualizado.id) {
            console.error("ERROR: el artículo no tiene ID");
            return;
        }

        this.item.updateItem(articuloActualizado.id, articuloActualizado).subscribe({
            next: (res) => {
                console.log("Artículo actualizado:", res);

                this.cargarArticulos();

                this.showEditModal = false;
                this.articuloSeleccionado = null;
            },
            error: (err) => {
                console.error("Error al actualizar:", err);
            }
        });
    }

    // ------------------------------------------------------------
    // 🗑️ ELIMINAR ARTÍCULO CON ALERTA
    // ------------------------------------------------------------
    confirmarEliminar(item: any) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Eliminarás el artículo "${item.nombre}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {

            if (result.isConfirmed) {
                this.item.deleteItem(item.id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Eliminado',
                            text: 'El artículo se eliminó correctamente',
                            icon: 'success',
                            confirmButtonColor: '#000'
                        });

                        // quitar de la lista sin recargar
                        this.articulos = this.articulos.filter(x => x.id !== item.id);
                        this.cd.detectChanges();
                    },
                    error: (err) => {
                        console.error("Error al eliminar:", err);
                    }
                });
            }

        });
    }

    // ------------------------------------------------------------
    // 🔍 BUSCADOR Y FILTROS
    // ------------------------------------------------------------
    onBusquedaChange() { this.cd.detectChanges(); }

    onCategoriaChange() { this.cd.detectChanges(); }

    get articulosFiltrados() {
        const texto = this.busqueda.toLowerCase();
        const categoria = this.categoriaSeleccionada;

        return this.articulos.filter(item =>
            (!categoria || item.categoriaId == categoria) &&
            (
                item.nombre?.toLowerCase().includes(texto) ||
                item.descripcion?.toLowerCase().includes(texto) ||
                item.stock?.toString().includes(texto)
            )
        );
    }

    // ------------------------------------------------------------
    // 📌 PAGINACIÓN CARDS
    // ------------------------------------------------------------
    get articulosFiltradosPaginados() {
        const start = (this.page - 1) * this.pageSize;
        return this.articulosFiltrados.slice(start, start + this.pageSize);
    }

    get totalPaginas() {
        return Math.ceil(this.articulosFiltrados.length / this.pageSize);
    }

    cambiarPagina(nueva: number) {
        if (nueva < 1 || nueva > this.totalPaginas) return;
        this.page = nueva;
    }

    // ------------------------------------------------------------
    // 📌 PAGINACIÓN TABLA
    // ------------------------------------------------------------
    get articulosPaginadosTabla() {
        const start = (this.pageTabla - 1) * this.pageSizeTabla;
        return this.articulosFiltrados.slice(start, start + this.pageSizeTabla);
    }

    get totalPaginasTabla() {
        return Math.ceil(this.articulosFiltrados.length / this.pageSizeTabla);
    }

    cambiarPaginaTabla(nueva: number) {
        if (nueva < 1 || nueva > this.totalPaginasTabla) return;
        this.pageTabla = nueva;
    }

    // ------------------------------------------------------------
    // 🚪 CERRAR SESIÓN
    // ------------------------------------------------------------
    confirmarCerrarSesion() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, cerrar',
            cancelButtonText: 'No, cancelar',
        }).then((result) => {
            if (result.isConfirmed) this.router.navigate(['/']);
        });
    }
}