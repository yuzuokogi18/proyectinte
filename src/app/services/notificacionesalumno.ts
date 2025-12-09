import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notificacion {
  id: number;
  userId: number;
  requestId?: number;
  mensaje: string;
  leida: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class Notificacionesalumno {

  private baseUrl = 'http://44.209.19.27:8080/api/notifications';


  constructor(private http: HttpClient) {}

  // Obtener todas las notificaciones del usuario
  getByUser(userId: number): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.baseUrl}/user/${userId}`);
  }

  // Marcar notificación como leída
  marcarComoLeida(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/read`, {});
  }
}
