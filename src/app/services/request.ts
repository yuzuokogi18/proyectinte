import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequestModel {
  id?: number;
  userId: number;
  itemId: number;
  estado: string;
  userName?: string; 
  itemName?: string;   
  fechaSolicitud?: string;
  fechaRespuesta?: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class Request {

 private apiUrl = 'http://44.209.19.27:8080/api/requests';


  constructor(private http: HttpClient) { }

  crearRequest(request: RequestModel): Observable<RequestModel> {
    return this.http.post<RequestModel>(this.apiUrl, request);
  }

  getRequests(): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(this.apiUrl);
  }

  getRequestsByUser(userId: number): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(`${this.apiUrl}/user/${userId}`);
  }

  actualizarRequest(id: number, request: RequestModel): Observable<RequestModel> {
    return this.http.put<RequestModel>(`${this.apiUrl}/${id}`, request);
  }

  eliminarRequest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
