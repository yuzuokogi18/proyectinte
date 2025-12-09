import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Prestamos {

private apiUrl = 'http://44.209.19.27:8080/api/prestamos';


  constructor(private http: HttpClient) {}
  crearPrestamo(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }

  getPrestamos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getPrestamo(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarPrestamo(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datos);
  }
  eliminarPrestamo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
